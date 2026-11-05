import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
const Topic = lazy(() => import('./pages/Topic'))
const NotFound = lazy(() => import('./pages/NotFound'))
const NewsPage = lazy(() => import('./pages/NewsPage'))
const NewsDetail = lazy(() => import('./pages/NewsDetail'))
import { topicPaths } from './seo/site-meta'

export default function App() {
  return (
    <Suspense fallback={<main className="section-screen" aria-busy="true" />}><Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tin-tuc" element={<NewsPage />} />
        <Route path="tin-tuc/:articleId" element={<NewsDetail />} />
        {topicPaths.map((p) => (
          <Route key={p} path={p} element={<Topic />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes></Suspense>
  )
}
