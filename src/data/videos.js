/* Video YouTube của dự án (layout căn hộ, tiện ích, tiến độ…).
   Thêm video: đưa lên YouTube trước, rồi thêm một dòng:
     { id: 'YOUTUBE_ID', title: 'Layout căn AMA Studio – QTOPIA Phước Hải', description: '…', uploadDate: '2026-11-10', pages: ['/hinh-anh-video', '/can-ho/studio-ama'] }
   - id: phần sau "v=" trong link YouTube.
   - pages: các trang hiển thị video (luôn hiện trên /hinh-anh-video).
   Video chỉ tải iframe khi người dùng bấm (facade) để không ảnh hưởng PageSpeed; JSON-LD VideoObject sinh tự động.
   Danh sách rỗng → khối video không hiển thị. */
export const videos = []

export const videosFor = (path) =>
  videos.filter((v) => path === '/hinh-anh-video' || (v.pages || []).includes(path))

export const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
export const ytEmbed = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
export const ytWatch = (id) => `https://www.youtube.com/watch?v=${id}`
