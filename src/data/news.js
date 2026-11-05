import { registerCms } from '../cms/content'

// Dữ liệu cho carousel, trang danh sách và trang chi tiết Tin tức. 10 ô bài viết sửa được trên CMS
// (tiêu đề, chuyên mục, tóm tắt, nội dung, ảnh). Ô nào còn chữ mẫu thì tự động noindex và không vào sitemap.
// body: các đoạn văn cách nhau bằng một dòng trống.
export const newsItems = [
  {
    id: 'sample-01',
    category: 'Tin tức',
    title: 'Tiêu đề bài viết mẫu 01',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae sem vel quam feugiat posuere.',
    image: '',
    body: '',
  },
  {
    id: 'sample-02',
    category: 'Sự kiện',
    title: 'Tiêu đề bài viết mẫu 02',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at neque sed justo consequat luctus.',
    image: '',
    body: '',
  },
  {
    id: 'sample-03',
    category: 'Tin tức',
    title: 'Tiêu đề bài viết mẫu 03',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat, erat at posuere facilisis, urna.',
    image: '',
    body: '',
  },
  {
    id: 'sample-04',
    category: 'Thông báo',
    title: 'Tiêu đề bài viết mẫu 04',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam risus vel dui tincidunt, id.',
    image: '',
    body: '',
  },
  {
    id: 'sample-05',
    category: 'Sự kiện',
    title: 'Tiêu đề bài viết mẫu 05',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eget ante blandit varius.',
    image: '',
    body: '',
  },
  {
    id: 'sample-06',
    category: 'Tin tức',
    title: 'Tiêu đề bài viết mẫu 06',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci.',
    image: '',
    body: '',
  },
  {
    id: 'sample-07',
    category: 'Thông báo',
    title: 'Tiêu đề bài viết mẫu 07',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet nibh vel magna interdum.',
    image: '',
    body: '',
  },
  {
    id: 'sample-08',
    category: 'Sự kiện',
    title: 'Tiêu đề bài viết mẫu 08',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor, sem quis malesuada porttitor, nulla.',
    image: '',
    body: '',
  },
  {
    id: 'sample-09',
    category: 'Tin tức',
    title: 'Tiêu đề bài viết mẫu 09',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat justo sed sem blandit, in.',
    image: '',
    body: '',
  },
  {
    id: 'sample-10',
    category: 'Thông báo',
    title: 'Tiêu đề bài viết mẫu 10',
    excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget tortor at orci luctus consectetur.',
    image: '',
    body: '',
  },
]

registerCms('newsItems', newsItems)

export const getNewsHref = (id) => `/tin-tuc/${id}`

/** Bài mẫu/lorem ipsum: không index, không vào sitemap (checklist 5.3). Bài thật từ CMS có `sample: false`. */
export const isSampleNews = (item) => item.sample === true || (item.sample !== false && /lorem ipsum|bài viết mẫu/i.test(`${item.title} ${item.excerpt}`))
export const hasRealNews = () => newsItems.some((item) => !isSampleNews(item))
