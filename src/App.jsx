import { Route, Routes } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './pages/Home'
import Topic from './pages/Topic'
import NotFound from './pages/NotFound'
import NewsPage from './pages/NewsPage'
import NewsDetail from './pages/NewsDetail'
import { topicPaths } from './seo/site-meta'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tin-tuc" element={<NewsPage />} />
        <Route path="tin-tuc/:articleId" element={<NewsDetail />} />
        {topicPaths.map((p) => (
          <Route key={p} path={p} element={<Topic />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
