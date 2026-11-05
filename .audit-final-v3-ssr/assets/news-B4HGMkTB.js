// src/data/news.js
var newsItems = [
	{
		id: "sample-01",
		category: "Tin tức",
		title: "Tiêu đề bài viết mẫu 01",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vitae sem vel quam feugiat posuere.",
		image: ""
	},
	{
		id: "sample-02",
		category: "Sự kiện",
		title: "Tiêu đề bài viết mẫu 02",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at neque sed justo consequat luctus.",
		image: ""
	},
	{
		id: "sample-03",
		category: "Tin tức",
		title: "Tiêu đề bài viết mẫu 03",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat, erat at posuere facilisis, urna.",
		image: ""
	},
	{
		id: "sample-04",
		category: "Thông báo",
		title: "Tiêu đề bài viết mẫu 04",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur aliquam risus vel dui tincidunt, id.",
		image: ""
	},
	{
		id: "sample-05",
		category: "Sự kiện",
		title: "Tiêu đề bài viết mẫu 05",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae mauris eget ante blandit varius.",
		image: ""
	},
	{
		id: "sample-06",
		category: "Tin tức",
		title: "Tiêu đề bài viết mẫu 06",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci.",
		image: ""
	},
	{
		id: "sample-07",
		category: "Thông báo",
		title: "Tiêu đề bài viết mẫu 07",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet nibh vel magna interdum.",
		image: ""
	},
	{
		id: "sample-08",
		category: "Sự kiện",
		title: "Tiêu đề bài viết mẫu 08",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tempor, sem quis malesuada porttitor, nulla.",
		image: ""
	},
	{
		id: "sample-09",
		category: "Tin tức",
		title: "Tiêu đề bài viết mẫu 09",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent consequat justo sed sem blandit, in.",
		image: ""
	},
	{
		id: "sample-10",
		category: "Thông báo",
		title: "Tiêu đề bài viết mẫu 10",
		excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget tortor at orci luctus consectetur.",
		image: ""
	}
];
var getNewsHref = (id) => `/tin-tuc/${id}`;
export { newsItems as n, getNewsHref as t };
