import { Suspense } from 'react'
import { preloadable } from './components/DeferredSection'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
const Topic = preloadable(() => import('./pages/Topic'))
const NotFound = preloadable(() => import('./pages/NotFound'))
const NewsPage = preloadable(() => import('./pages/NewsPage'))
const NewsDetail = preloadable(() => import('./pages/NewsDetail'))
const ThankYou = preloadable(() => import('./pages/ThankYou'))
import { topicPaths } from './seo/site-meta'

export default function App() {
  return (
    <Suspense fallback={<main className="section-screen" aria-busy="true" />}><Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tin-tuc" element={<NewsPage />} />
        <Route path="tin-tuc/:articleId" element={<NewsDetail />} />
        <Route path="cam-on" element={<ThankYou />} />
        {topicPaths.map((p) => (
          <Route key={p} path={p} element={<Topic />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes></Suspense>
  )
}
