import { timingSafeEqual } from 'node:crypto';
import { spawn } from 'node:child_process';
import { createServer } from 'node:http';

const PORT = Number(process.env.PORT || 8790);
const HOST = process.env.HOST || '127.0.0.1';
const NPM_BIN = process.env.NPM_BIN || 'npm';
/*
 * Each project builds a fixed directory with a fixed npm script — nothing in a request can change them.
 * script: 'build'         → `npm run build` in place (Palm River, unchanged behaviour).
 * script: 'build:release' → the project builds into a fresh release directory and atomically swaps its
 *                           `current` symlink itself, so nginx never serves a half-written site (QTOPIA).
 * Every project is optional: it is enabled only when its token env var is set, so one service file works on
 * any VPS (Palm River only, QTOPIA only, or both). The service refuses to start if no project is enabled.
 */
const ALL_PROJECTS = {
  'palm-river-mkt': {
    directory: '/var/www/html/canho-palmriver/source',
    script: 'build',
    token: process.env.DEPLOY_HOOK_TOKEN_PALM_RIVER_MKT || '',
    optional: true,
  },
  'palm-river-no-rever': {
    directory: '/var/www/html/canho-palmriver-com-vn/source',
    script: 'build',
    token: process.env.DEPLOY_HOOK_TOKEN_PALM_RIVER_NO_REVER || '',
    optional: true,
  },
  qtopia: {
    directory: process.env.QTOPIA_DIR || '/var/www/qtopia/src',
    script: 'build:release',
    token: process.env.DEPLOY_HOOK_TOKEN_QTOPIA || '',
    optional: true,
  },
};

const PROJECTS = Object.fromEntries(
  Object.entries(ALL_PROJECTS).filter(([, config]) => !(config.optional && !config.token)),
);

if (Object.keys(PROJECTS).length === 0) {
  throw new Error('No project enabled: set at least one DEPLOY_HOOK_TOKEN_<PROJECT> env var.');
}

for (const [project, config] of Object.entries(PROJECTS)) {
  if (config.token.length < 32) {
    throw new Error(`DEPLOY_HOOK_TOKEN for ${project} must be at least 32 characters.`);
  }
}

const jobs = new Map(Object.keys(PROJECTS).map((project) => [project, {
  state: 'IDLE',
  started_at: null,
  finished_at: null,
  error: '',
  log: '',
  running: false,
  rerun: false,
}]));

function authorized(request, project) {
  const expected = Buffer.from(PROJECTS[project].token);
  const actual = Buffer.from((request.headers.authorization || '').replace(/^Bearer\s+/i, ''));
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function respond(response, status, body) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(body));
}

function runBuild(project) {
  const job = jobs.get(project);
  if (job.running) {
    job.rerun = true;
    job.state = 'QUEUED';
    return;
  }

  job.running = true;
  void (async () => {
    do {
      job.rerun = false;
      job.state = 'BUILDING';
      job.started_at = new Date().toISOString();
      job.finished_at = null;
      job.error = '';
      job.log = '';
      const { directory, script } = PROJECTS[project];

      const code = await new Promise((resolve) => {
        const child = spawn(NPM_BIN, ['run', script], { cwd: directory, shell: false });
        child.stdout.setEncoding('utf8');
        child.stderr.setEncoding('utf8');
        const append = (chunk) => { job.log = (job.log + chunk).slice(-8000); };
        child.stdout.on('data', append);
        child.stderr.on('data', append);
        child.on('error', (error) => {
          job.error = error.message;
          resolve(1);
        });
        child.on('close', (exitCode) => resolve(exitCode ?? 1));
      });

      job.finished_at = new Date().toISOString();
      job.state = code === 0 ? 'READY' : 'ERROR';
      if (code !== 0 && !job.error) job.error = `npm run ${PROJECTS[project].script} exited with code ${code}`;
    } while (job.rerun);
    job.running = false;
  })();
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || '/', 'http://localhost');
  if (url.pathname !== '/deploy' || !['GET', 'POST'].includes(request.method)) {
    respond(response, 404, { error: 'Not found.' });
    return;
  }

  if (request.method === 'GET') {
    const project = url.searchParams.get('project');
    if (!project || !Object.hasOwn(PROJECTS, project)) {
      respond(response, 400, { error: 'Invalid project.' });
      return;
    }
    if (!authorized(request, project)) {
      respond(response, 401, { error: 'Unauthorized.' });
      return;
    }
    const { state, started_at, finished_at, error, log } = jobs.get(project);
    respond(response, 200, { state, started_at, finished_at, error, log });
    return;
  }

  let size = 0;
  let body = '';
  request.setEncoding('utf8');
  request.on('data', (chunk) => {
    size += Buffer.byteLength(chunk);
    if (size <= 2048) body += chunk;
  });
  request.on('end', () => {
    if (size > 2048) {
      respond(response, 413, { accepted: false, error: 'Request too large.' });
      return;
    }
    let project;
    try {
      project = JSON.parse(body).project;
    } catch {
      respond(response, 400, { accepted: false, error: 'Invalid JSON.' });
      return;
    }
    if (typeof project !== 'string' || !Object.hasOwn(PROJECTS, project)) {
      respond(response, 400, { accepted: false, error: 'Invalid project.' });
      return;
    }
    if (!authorized(request, project)) {
      respond(response, 401, { accepted: false, error: 'Unauthorized.' });
      return;
    }
    runBuild(project);
    respond(response, 202, { accepted: true, state: jobs.get(project).state });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`CMS deploy hook listening on http://${HOST}:${PORT} (projects: ${Object.keys(PROJECTS).join(', ')})`);
});
