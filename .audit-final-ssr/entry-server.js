import { n as responsiveImageProps, t as Img } from "./assets/Img-Bk2iwTwh.js";
import { t as Icon } from "./assets/Icons-CdsUf0hk.js";
import { a as loadGtm, c as trackSectionViews, i as initDelegatedTracking, l as trackWebVitals, n as useContactPopup, o as track, r as LeadFormFields, s as trackScrollDepth, t as ContactPopupProvider } from "./assets/ContactPopup--lYt3pUu.js";
import { n as newsItems } from "./assets/news-B4HGMkTB.js";
import { c as legalContent, d as masterPlan, f as salesPolicy, i as faq, l as legalDisclaimer, m as stories, n as useReveal, o as heroContent, p as siteMeta, r as facts, s as leadFormContent, t as SectionHeading } from "./assets/SectionHeading-DIihyKak.js";
import { renderToPipeableStream } from "react-dom/server";
import { PassThrough } from "node:stream";
import { Link, Outlet, Route, Routes, StaticRouter, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
// src/lib/utm.js
var KEY = "qtopia_first_touch";
var FIELDS = [
	"utm_source",
	"utm_medium",
	"utm_campaign",
	"utm_content",
	"utm_term"
];
function captureFirstTouch() {
	try {
		if (localStorage.getItem(KEY)) return;
		const q = new URLSearchParams(window.location.search);
		const utm = {};
		FIELDS.forEach((f) => {
			const v = q.get(f);
			if (v) utm[f] = v.slice(0, 100);
		});
		const data = {
			...utm,
			landing_path: window.location.pathname,
			referrer: document.referrer ? new URL(document.referrer).hostname : "",
			captured_at: (/* @__PURE__ */ new Date()).toISOString()
		};
		localStorage.setItem(KEY, JSON.stringify(data));
	} catch {}
}
// src/seo/site-meta.js
var SITE_URL_PLACEHOLDER = "https://qtopia.example.com";
var SITE_URL = "https://qtopia-tau.vercel.app".replace(/\/+$/, "");
var SITE = {
	name: "QTOPIA",
	alternateName: "QTOPIA — Thành phố cuối tuần của siêu đô thị TP. Hồ Chí Minh",
	locale: "vi_VN",
	lang: "vi",
	themeColor: "#050a2e",
	published: "2026-11-01",
	ogImageWidth: 1200,
	ogImageHeight: 630,
	twitterImage: "/images/thumb-twitter-image.jpg",
	twitterImageAlt: "Phối cảnh tòa căn hộ QTOPIA bên biển về đêm, Thành phố cuối tuần",
	logo: "/images/brand/logo-horizontal-white.png"
};
/**
* Trang (route). changefreq / priority dùng cho sitemap.xml.
* h1 / intro: hiển thị ở trang con (src/pages/Topic.jsx). Trang chủ có H1 riêng trong Hero.
* menu: mô tả ngắn cho thuộc tính `title` của link menu / footer (≤ 70 ký tự).
*/
var pages = {
	"/": {
		title: "QTOPIA — Thành phố cuối tuần bên biển gần TP.HCM",
		description: "QTOPIA – Thành phố cuối tuần bên biển, cách TP.HCM 75 phút. Sở hữu thiên nhiên núi, biển, rừng; nghỉ dưỡng Resort City, wellness, giải trí 24/7 vận hành CBRE.",
		ogTitle: "QTOPIA — Thành phố cuối tuần của siêu đô thị TP.HCM",
		ogDescription: "QTOPIA – Thành phố cuối tuần bên biển, cách TP.HCM 75 phút. Sở hữu thiên nhiên núi, biển, rừng; nghỉ dưỡng Resort City, wellness, giải trí 24/7 vận hành CBRE.",
		breadcrumb: "Trang chủ",
		changefreq: "weekly",
		priority: 1,
		ogImage: "/images/thumbnail-opengraph-image.jpg",
		ogImageAlt: "Phối cảnh tòa căn hộ QTOPIA bên biển về đêm, Thành phố cuối tuần",
		menu: "Tổng quan dự án căn hộ QTOPIA"
	},
	"/vi-tri": {
		title: "Vị trí QTOPIA — Trước biển, sau núi, gần TP.HCM",
		description: "Tìm hiểu vị trí QTOPIA tại khu vực Phước Hải: trước biển, sau núi, gần rừng. Brochure nêu khoảng 90 phút từ trung tâm TP.HCM và 30 phút từ sân bay Long Thành.",
		breadcrumb: "Vị trí",
		h1: "Vị trí QTOPIA — trước biển, sau núi, gần rừng",
		intro: ["Theo brochure, QTOPIA được phát triển tại khu vực Phước Hải với địa thế trước biển, sau núi, gần rừng — một bối cảnh cho những chuyến nghỉ cuối tuần.", "Các mốc kết nối được tài liệu giới thiệu gồm khoảng 90 phút từ trung tâm TP.HCM, 30 phút từ sân bay Long Thành, 19 phút từ Hồ Tràm và 2 phút từ Quảng trường Phước Hải. Thời gian thực tế có thể thay đổi."],
		changefreq: "monthly",
		priority: .8,
		ogImage: "/images/og-qtopia-vi-tri.webp",
		ogImageAlt: "Góc nhìn từ trên cao vị trí dự án QTOPIA giữa biển, núi và khu dân cư",
		menu: "Bản đồ vị trí và cự ly kết nối từ QTOPIA"
	},
	"/tien-ich": {
		title: "Tiện ích QTOPIA — Ocean Galaxy và Oasis Resort",
		description: "Khám phá tiện ích QTOPIA qua ba khu Quậy Station, Ocean Galaxy và Oasis Resort: từ DJ Ocean, Aqua Funny Park tới hồ bơi, thể thao và vườn cảnh quan bên biển.",
		breadcrumb: "Tiện ích",
		h1: "Tiện ích QTOPIA — ba khu trải nghiệm bên biển",
		intro: ["Quậy Station hướng ra biển, Ocean Galaxy gắn với âm nhạc và trải nghiệm về đêm, còn Oasis Resort dành cho hồ bơi, vận động và những khoảng nghỉ giữa cảnh quan.", "Brochure gọi tên DJ Ocean, Aqua Funny Park, hồ bơi Oasis, Romantic Garden và các tiện ích tầng mái. Chọn từng khu trên sơ đồ để khám phá các điểm nổi bật."],
		changefreq: "monthly",
		priority: .8,
		ogImage: "/images/og-qtopia-tien-ich.webp",
		ogImageAlt: "Phối cảnh khu Ocean Galaxy về đêm với hồ bơi và sàn DJ tại QTOPIA",
		menu: "Ba cụm tiện ích và Nightlife Hub của QTOPIA"
	},
	"/mat-bang": {
		title: "Mặt bằng QTOPIA — Q5, Q6, Q7 và bốn loại căn",
		description: "Xem mặt bằng QTOPIA: sơ đồ căn hộ tầng điển hình Q5–Q6 với mã căn, diện tích sử dụng và tim tường; tham khảo thêm bốn loại căn AMA, MIRA, VITA, ARIA tại Q7.",
		breadcrumb: "Mặt bằng",
		h1: "Mặt bằng QTOPIA — căn hộ Q5, Q6 và các loại căn Q7",
		intro: ["Tầng điển hình Q5–Q6 trong brochure gồm AMA Studio, MIRA 1PN+ và VITA 2PN. Trên sơ đồ tương tác, chọn mã căn để xem diện tích sử dụng (SD) và diện tích tim tường (TT).", "Brochure Q7 giới thiệu thêm ARIA 3PN bên cạnh AMA, MIRA và VITA. Bên dưới sơ đồ Q5–Q6 là ảnh layout tham khảo và khoảng diện tích theo từng loại căn Q7."],
		changefreq: "monthly",
		priority: .8,
		ogImage: "/images/og-qtopia-mat-bang.webp",
		ogImageAlt: "Phối cảnh tiện ích sân thượng tháp Q5 thuộc dự án QTOPIA",
		menu: "Sơ đồ căn Q5–Q6 và các loại căn tháp Q7"
	},
	"/tin-tuc": {
		title: "Tin tức QTOPIA — Cập nhật thông tin dự án",
		description: "Theo dõi tin tức và sự kiện QTOPIA, tìm hiểu thông tin dự án, tiện ích và không gian sống qua các bài viết cập nhật. Nội dung mẫu sẽ được thay thế. Xem thêm.",
		breadcrumb: "Tin tức & sự kiện",
		h1: "Tin tức & sự kiện QTOPIA",
		intro: ["Cập nhật thông tin và những câu chuyện xoay quanh QTOPIA."],
		changefreq: "weekly",
		priority: .7,
		ogImage: "/images/og-qtopia-trang-chu.webp",
		ogImageAlt: "Thông tin và bài viết về dự án QTOPIA",
		menu: "Tin tức và sự kiện QTOPIA"
	},
	...Object.fromEntries(newsItems.map((item) => {
		let description = `${item.excerpt} Bài viết mẫu về ${item.category.toLowerCase()} tại QTOPIA.`;
		while (description.length < 150) description += " Lorem ipsum dolor sit amet.";
		if (description.length > 160) description = description.slice(0, description.lastIndexOf(" ", 160));
		return [`/tin-tuc/${item.id}`, {
			title: `${item.title} — Tin tức QTOPIA`,
			description,
			breadcrumb: item.category,
			changefreq: "monthly",
			priority: .5,
			ogImage: "/images/og-qtopia-trang-chu.webp",
			ogImageAlt: "Bài viết mẫu về dự án QTOPIA",
			menu: item.title
		}];
	}))
};
/** Trang con theo chủ đề (liên kết nội bộ ở footer + CTA trong section) */
var topicPaths = [
	"/vi-tri",
	"/tien-ich",
	"/mat-bang"
];
/** Trang không đưa vào sitemap, noindex */
var hiddenPages = { "/404": {
	title: "Không tìm thấy trang — QTOPIA",
	description: "Trang bạn tìm không tồn tại. Quay về trang chủ QTOPIA để xem tổng quan dự án, vị trí, tiện ích và mặt bằng.",
	breadcrumb: "404"
} };
var routes = Object.keys(pages);
/** Menu chính (anchor nhảy tới section trên trang chủ) */
var mainNav = [
	{
		to: "/#tong-quan",
		label: "Tổng quan",
		title: "Tổng quan dự án căn hộ QTOPIA"
	},
	{
		to: "/#vi-tri",
		label: "Vị trí",
		title: pages["/vi-tri"].menu
	},
	{
		to: "/#tien-ich",
		label: "Tiện ích",
		title: pages["/tien-ich"].menu
	},
	{
		to: "/#mat-bang",
		label: "Mặt bằng",
		title: pages["/mat-bang"].menu
	},
	{
		to: "/#chinh-sach",
		label: "Chính sách",
		title: "Chính sách bán hàng và phương thức thanh toán QTOPIA"
	},
	{
		to: "/#tin-tuc",
		label: "Tin tức",
		title: "Tin tức và thông tin dự án QTOPIA"
	},
	{
		to: "/#phap-ly",
		label: "Pháp lý",
		title: "Thông tin pháp lý dự án QTOPIA"
	},
	{
		to: "/#lien-he",
		label: "Liên hệ",
		title: "Liên hệ nhận thông tin dự án QTOPIA"
	}
];
var absUrl = (path) => SITE_URL + (path === "/" ? "/" : path);
var absAsset = (src) => /^https?:/.test(src) ? src : SITE_URL + src;
function pageMeta(path) {
	return pages[path] || hiddenPages[path] || pages["/"];
}
// src/layout/Header.jsx
var navCls = "font-display text-[0.92rem] xl:text-[1.045rem] leading-[1.1] font-medium text-white/85 no-underline transition-colors duration-300 hover:text-q-lime";
function Header() {
	const [open, setOpen] = useState(false);
	const { pathname, hash } = useLocation();
	const popup = useContactPopup();
	useEffect(() => setOpen(false), [pathname, hash]);
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-40 bg-q-navy shadow-[inset_0_-1px_0_rgba(255,255,255,0.08)]",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container-page relative flex h-[var(--header-h)] items-center justify-between gap-3",
			children: [
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					"aria-label": "QTOPIA — về trang chủ",
					className: "flex min-h-11 shrink-0 items-center",
					children: /* @__PURE__ */ jsx(Img, {
						src: "/images/brand/logo-horizontal-white.png",
						alt: "QTOPIA",
						className: "h-8 w-auto lg:h-9"
					})
				}),
				/* @__PURE__ */ jsx("nav", {
					"aria-label": "Menu chính",
					className: "hidden items-center gap-3 whitespace-nowrap lg:flex xl:gap-6",
					children: mainNav.map((item) => /* @__PURE__ */ jsx(Link, {
						to: item.to,
						title: item.title,
						className: navCls,
						children: item.label
					}, item.to))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-1.5 sm:gap-3",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => popup.open("header"),
						"data-cta-name": "header_consult",
						"data-cta-location": "header",
						className: "btn-base btn-primary w-[6.6rem] shrink-0 !px-5 text-[1.045rem] leading-[1.1] md:max-lg:w-[5.346rem] lg:w-40",
						children: "TƯ VẤN"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-expanded": open,
						"aria-controls": "mobile-nav",
						"aria-label": open ? "Đóng menu" : "Mở menu",
						onClick: () => setOpen((v) => !v),
						className: "grid size-12 cursor-pointer place-items-center text-white lg:hidden",
						children: /* @__PURE__ */ jsx(Icon, {
							name: open ? "close" : "menu",
							size: 24
						})
					})]
				})
			]
		}), open ? /* @__PURE__ */ jsx("nav", {
			id: "mobile-nav",
			"aria-label": "Menu di động",
			className: "max-h-[calc(100svh-var(--header-h)-var(--bar-h))] overflow-y-auto border-t border-white/10 bg-q-navy lg:hidden",
			children: /* @__PURE__ */ jsx("ul", {
				className: "container-page m-0 flex list-none flex-col py-3",
				children: mainNav.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
					to: item.to,
					title: item.title,
					className: "flex min-h-12 items-center border-b border-white/10 font-display text-[1.1rem] leading-[1.1] font-medium text-white no-underline",
					children: item.label
				}) }, item.to))
			})
		}) : null]
	});
}
// src/lib/filled.js
function isFilled(value) {
	if (typeof value !== "string") return false;
	const v = value.trim();
	if (!v) return false;
	return !/xxxx|0000|example|\[.*\]|chờ cập nhật|theo công bố/i.test(v);
}
// src/layout/Footer.jsx
var linkCls = "inline-flex min-h-11 items-center font-display text-sm font-medium text-white/85 no-underline transition-colors hover:text-q-lime";
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		id: "legal",
		className: "bg-q-navy pt-[clamp(3rem,8svh,5rem)] text-white/70",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "container-page flex flex-col gap-12 pb-10",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid gap-10 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-4",
						children: [/* @__PURE__ */ jsx(Img, {
							src: "/images/brand/logo-horizontal-white.png",
							alt: "QTOPIA",
							className: "h-9 w-auto self-start"
						}), /* @__PURE__ */ jsx("p", {
							className: "max-w-xs text-sm leading-relaxed",
							children: "Thành phố cuối tuần của siêu đô thị TP. Hồ Chí Minh — Entertainment Complex bên biển."
						})]
					}),
					/* @__PURE__ */ jsxs("nav", {
						"aria-label": "Chân trang — các mục chính",
						className: "flex flex-col items-start gap-0.5",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-display text-xs font-semibold uppercase tracking-[0.14em] text-q-lime",
							children: "Khám phá"
						}), mainNav.map((item) => /* @__PURE__ */ jsx(Link, {
							to: item.to,
							title: item.title,
							className: linkCls,
							children: item.label
						}, item.to))]
					}),
					/* @__PURE__ */ jsxs("nav", {
						"aria-label": "Chân trang — trang chủ đề",
						className: "flex flex-col items-start gap-0.5",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "font-display text-xs font-semibold uppercase tracking-[0.14em] text-q-lime",
								children: "Thông tin chi tiết"
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/tin-tuc",
								title: pages["/tin-tuc"].menu,
								className: linkCls,
								children: "Tin tức & sự kiện"
							}),
							topicPaths.map((p) => /* @__PURE__ */ jsxs(Link, {
								to: p,
								title: pages[p].menu,
								className: linkCls,
								children: [pages[p].breadcrumb, " căn hộ QTOPIA"]
							}, p))
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-2.5 text-sm leading-relaxed",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "font-display text-xs font-semibold uppercase tracking-[0.14em] text-q-lime",
								children: "Liên hệ"
							}),
							isFilled(siteMeta.hotline) ? /* @__PURE__ */ jsxs("a", {
								href: siteMeta.hotlineHref,
								className: "font-semibold text-white no-underline hover:underline",
								children: ["Hotline: ", siteMeta.hotline]
							}) : null,
							isFilled(siteMeta.email) ? /* @__PURE__ */ jsx("a", {
								href: `mailto:${siteMeta.email}`,
								className: "text-white no-underline hover:underline",
								children: siteMeta.email
							}) : null,
							isFilled(siteMeta.address) ? /* @__PURE__ */ jsx("span", { children: siteMeta.address }) : null,
							/* @__PURE__ */ jsx(Link, {
								to: "/#lien-he",
								className: "inline-flex min-h-11 items-center self-start font-display text-sm font-semibold text-white underline underline-offset-4",
								children: "Đăng ký nhận thông tin QTOPIA"
							})
						]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "border-t border-white/10 pt-6",
				children: [/* @__PURE__ */ jsx("p", {
					className: "text-xs leading-relaxed text-white/60",
					children: legalDisclaimer
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-4 text-xs text-white/55",
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						siteMeta.projectName,
						" — Trang thông tin giới thiệu dự án, chưa phải website chính thức của Chủ đầu tư."
					]
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			"aria-hidden": "true",
			className: "h-[var(--bar-h)] lg:hidden"
		})]
	});
}
// src/layout/ValueNav.jsx
var ITEMS = [
	{
		key: "vi-tri",
		id: "vi-tri",
		to: "/#vi-tri",
		icon: "pin",
		label: "Vị trí"
	},
	{
		key: "tien-ich",
		id: "tien-ich",
		to: "/#tien-ich",
		icon: "star",
		label: "Tiện ích"
	},
	{
		key: "mat-bang",
		id: "mat-bang",
		to: "/#mat-bang",
		icon: "plan",
		label: "Mặt bằng"
	},
	{
		key: "lien-he",
		id: "lien-he",
		to: "/#lien-he",
		icon: "doc",
		label: "Đăng ký"
	}
];
var IDS = ITEMS.map((i) => i.id);
function useActiveSection(pathname) {
	const [active, setActive] = useState(null);
	useEffect(() => {
		let frame = 0;
		const check = () => {
			frame = 0;
			const mid = window.innerHeight / 2;
			const hit = IDS.find((id) => {
				const r = document.getElementById(id)?.getBoundingClientRect();
				return r && r.top <= mid && r.bottom >= mid;
			});
			setActive(hit || null);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(check);
		};
		check();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
		};
	}, [pathname]);
	return active;
}
function usePastHero() {
	const [past, setPast] = useState(false);
	useEffect(() => {
		let frame = 0;
		const check = () => {
			frame = 0;
			setPast(window.scrollY > window.innerHeight * .6);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(check);
		};
		check();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
		};
	}, []);
	return past;
}
var barItem = "flex h-[calc(var(--bar-h)-1px)] flex-col items-center justify-center gap-1 font-display text-[0.7rem] font-semibold no-underline";
function ValueNav() {
	const { pathname } = useLocation();
	const popup = useContactPopup();
	const active = useActiveSection(pathname);
	const pastHero = usePastHero();
	const [explore, setExplore] = useState(false);
	const barRef = useRef(null);
	useEffect(() => setExplore(false), [pathname]);
	useEffect(() => {
		if (!explore) return void 0;
		const onDown = (e) => {
			if (!barRef.current?.contains(e.target)) setExplore(false);
		};
		const onKey = (e) => e.key === "Escape" && setExplore(false);
		document.addEventListener("pointerdown", onDown);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onDown);
			document.removeEventListener("keydown", onKey);
		};
	}, [explore]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("nav", {
		ref: barRef,
		"aria-label": "Lối tắt nhanh",
		className: "fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-q-navy pb-[env(safe-area-inset-bottom)] text-white lg:hidden",
		children: [/* @__PURE__ */ jsx("div", {
			id: "explore-sheet",
			hidden: !explore,
			className: "absolute inset-x-0 bottom-full border-t border-white/10 bg-q-navy px-5 pb-4 pt-3 shadow-[0_-12px_30px_rgba(5,10,46,0.35)]",
			children: /* @__PURE__ */ jsx("ul", {
				className: "m-0 grid list-none grid-cols-2 gap-2 p-0 sm:grid-cols-4",
				children: ITEMS.map((it) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
					to: it.to,
					onClick: () => setExplore(false),
					"data-cta-name": `value_nav_${it.key}`,
					"data-cta-location": "sticky_bar_explore",
					"aria-current": active === it.id ? "true" : void 0,
					className: `flex min-h-12 items-center gap-3 rounded-2xl border px-4 font-display text-sm font-semibold no-underline ${active === it.id ? "border-q-lime bg-white/10 text-q-lime" : "border-white/15 text-white"}`,
					children: [/* @__PURE__ */ jsx(Icon, { name: it.icon }), it.label]
				}) }, it.key))
			})
		}), /* @__PURE__ */ jsxs("ul", {
			className: `m-0 grid list-none p-0 ${isFilled(siteMeta.hotline) && isFilled(siteMeta.zalo) ? "grid-cols-4" : isFilled(siteMeta.hotline) || isFilled(siteMeta.zalo) ? "grid-cols-3" : "grid-cols-2"}`,
			children: [
				/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setExplore((v) => !v),
					"aria-expanded": explore,
					"aria-controls": "explore-sheet",
					"aria-label": explore ? "Đóng danh mục lối tắt" : "Mở danh mục: vị trí, tiện ích, mặt bằng",
					className: `${barItem} w-full cursor-pointer border-0 border-r border-white/10 ${explore ? "bg-white/10" : "bg-transparent"} text-white`,
					children: [/* @__PURE__ */ jsx(Icon, { name: "grid" }), "Khám phá"]
				}) }),
				isFilled(siteMeta.hotline) && siteMeta.hotlineHref ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
					href: siteMeta.hotlineHref,
					"data-cta-location": "sticky_bar",
					"aria-label": "Gọi hotline tư vấn",
					className: `${barItem} text-white`,
					children: [/* @__PURE__ */ jsx(Icon, { name: "phone" }), "Gọi"]
				}) }) : null,
				isFilled(siteMeta.zalo) ? /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", {
					href: siteMeta.zalo,
					target: "_blank",
					rel: "noopener",
					"data-cta-location": "sticky_bar",
					"aria-label": "Chat Zalo với tư vấn viên",
					className: `${barItem} border-x border-white/10 text-white`,
					children: [/* @__PURE__ */ jsx(Icon, { name: "chat" }), "Zalo"]
				}) }) : null,
				/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => popup.open("sticky_bar"),
					"data-cta-name": "sticky_price",
					"data-cta-location": "sticky_bar",
					className: "flex h-full min-h-[calc(var(--bar-h)-1px)] w-full cursor-pointer flex-col items-center justify-center gap-1 border-0 bg-gradient-to-r from-[var(--cta-from)] to-[var(--cta-to)] font-display text-[0.7rem] font-semibold text-white",
					children: [/* @__PURE__ */ jsx(Icon, { name: "doc" }), "Thông tin"]
				}) })
			]
		})]
	}), /* @__PURE__ */ jsx("nav", {
		"aria-label": "Điều hướng nhanh tới giá trị chính",
		className: `fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 transition-all duration-[var(--dur-slow)] xl:block ${pastHero ? "opacity-100" : "pointer-events-none -translate-x-4 opacity-0"}`,
		children: /* @__PURE__ */ jsx("ul", {
			className: "m-0 flex list-none flex-col items-start gap-2 p-0",
			children: ITEMS.map((it) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(Link, {
				to: it.to,
				"aria-label": it.label,
				title: it.label,
				"aria-current": active === it.id ? "true" : void 0,
				tabIndex: pastHero ? 0 : -1,
				"data-cta-name": `value_nav_${it.key}`,
				"data-cta-location": "side_rail",
				className: `group relative grid size-12 place-items-center rounded-full border no-underline shadow-soft transition-colors duration-300 ${active === it.id ? "border-q-navy bg-q-navy text-white" : "border-q-navy/15 bg-white/95 text-q-navy hover:bg-white"}`,
				children: [/* @__PURE__ */ jsx(Icon, { name: it.icon }), /* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					className: "pointer-events-none absolute left-full top-1/2 ml-2 -translate-y-1/2 whitespace-nowrap rounded-full bg-q-navy px-3 py-1.5 font-display text-xs font-semibold text-white opacity-0 shadow-soft transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100",
					children: it.label
				})]
			}) }, it.key))
		})
	})] });
}
// src/layout/FloatingButtons.jsx
var fab = "grid size-12 cursor-pointer place-items-center rounded-full border-0 text-white shadow-[0_10px_24px_-8px_rgba(5,10,46,0.5)] transition-transform duration-[var(--dur-fast)] ease-[var(--ease-out)] hover:scale-[1.07] hover:shadow-[0_14px_30px_-8px_rgba(5,10,46,0.6)] active:scale-95";
function FabRings() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
		className: "fab-cta-ring fab-cta-ring-1",
		"aria-hidden": "true"
	}), /* @__PURE__ */ jsx("span", {
		className: "fab-cta-ring fab-cta-ring-2",
		"aria-hidden": "true"
	})] });
}
function CallButton({ popup, where }) {
	const ready = isFilled(siteMeta.hotline) && siteMeta.hotlineHref;
	const label = ready ? `Gọi hotline ${siteMeta.hotline}` : "Để lại số, tư vấn viên gọi lại";
	const className = `${fab} relative isolate fab-cta-pulse fab-call-pulse bg-[var(--cta-from)]`;
	const content = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FabRings, {}), /* @__PURE__ */ jsx(Icon, {
		name: "phone",
		size: 22,
		className: "fab-cta-icon"
	})] });
	return ready ? /* @__PURE__ */ jsx("a", {
		href: siteMeta.hotlineHref,
		"aria-label": label,
		title: label,
		"data-cta-name": "floating_call",
		"data-cta-location": where,
		className,
		children: content
	}) : /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: () => popup.open(where + "_call"),
		"aria-label": label,
		title: label,
		"data-cta-name": "floating_call",
		"data-cta-location": where,
		className,
		children: content
	});
}
function ZaloButton({ popup, where }) {
	const ready = isFilled(siteMeta.zalo);
	const label = ready ? "Chat Zalo với tư vấn viên" : "Nhận tư vấn qua Zalo";
	const className = `${fab} relative isolate fab-cta-pulse fab-zalo-pulse bg-[#0068ff] font-display text-[0.72rem] font-bold tracking-tight`;
	const content = /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(FabRings, {}), /* @__PURE__ */ jsx("span", {
		className: "fab-cta-icon",
		"aria-hidden": "true",
		children: "Zalo"
	})] });
	return ready ? /* @__PURE__ */ jsx("a", {
		href: siteMeta.zalo,
		target: "_blank",
		rel: "noopener",
		"aria-label": label,
		title: label,
		"data-cta-name": "floating_zalo",
		"data-cta-location": where,
		className,
		children: content
	}) : /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: () => popup.open(where + "_zalo"),
		"aria-label": label,
		title: label,
		"data-cta-name": "floating_zalo",
		"data-cta-location": where,
		className,
		children: content
	});
}
function FloatingButtons() {
	const popup = useContactPopup();
	const [past, setPast] = useState(false);
	useEffect(() => {
		let frame = 0;
		const check = () => {
			frame = 0;
			setPast(window.scrollY > window.innerHeight * .7);
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(check);
		};
		check();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", onScroll);
			cancelAnimationFrame(frame);
		};
	}, []);
	const toTop = () => window.scrollTo({
		top: 0,
		behavior: "smooth"
	});
	const topCls = `transition-all duration-[var(--dur-base)] ease-[var(--ease-out)] ${past ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "fixed bottom-8 right-5 z-30 hidden flex-col items-center gap-2.5 lg:flex",
		children: [
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: toTop,
				"aria-label": "Lên đầu trang",
				title: "Lên đầu trang",
				tabIndex: past ? 0 : -1,
				"data-cta-name": "back_to_top",
				"data-cta-location": "floating",
				className: `${fab} bg-q-navy ${topCls}`,
				children: /* @__PURE__ */ jsx(Icon, {
					name: "up",
					size: 22
				})
			}),
			/* @__PURE__ */ jsx(CallButton, {
				popup,
				where: "floating"
			}),
			/* @__PURE__ */ jsx(ZaloButton, {
				popup,
				where: "floating"
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: () => popup.open("floating"),
				"aria-label": "Nhận thông tin dự án",
				title: "Nhận thông tin dự án",
				"data-cta-name": "floating_price",
				"data-cta-location": "floating",
				className: `${fab} relative isolate fab-cta-pulse fab-offer-pulse bg-q-blue`,
				children: [/* @__PURE__ */ jsx(FabRings, {}), /* @__PURE__ */ jsx(Icon, {
					name: "doc",
					size: 22,
					className: "fab-cta-icon"
				})]
			})
		]
	}), /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: toTop,
		"aria-label": "Lên đầu trang",
		title: "Lên đầu trang",
		tabIndex: past ? 0 : -1,
		"data-cta-name": "back_to_top",
		"data-cta-location": "floating_mobile",
		className: `${fab} fixed bottom-[calc(var(--bar-h)+0.75rem)] right-4 z-30 bg-q-navy lg:hidden ${topCls}`,
		children: /* @__PURE__ */ jsx(Icon, {
			name: "up",
			size: 22
		})
	})] });
}
// src/seo/structured-data.js
var ID = {
	site: `${SITE_URL}/#website`,
	org: `${SITE_URL}/#organization`,
	project: `${SITE_URL}/#project`
};
function organization() {
	const org = {
		"@type": "Organization",
		"@id": ID.org,
		name: SITE.name,
		url: SITE_URL + "/",
		logo: {
			"@type": "ImageObject",
			url: absAsset(SITE.logo)
		}
	};
	if (isFilled(siteMeta.hotline)) org.contactPoint = {
		"@type": "ContactPoint",
		telephone: siteMeta.hotline,
		contactType: "sales",
		areaServed: "VN",
		availableLanguage: "vi"
	};
	return org;
}
function project(path) {
	const p = pageMeta(path);
	const node = {
		"@type": "ApartmentComplex",
		"@id": ID.project,
		name: SITE.name,
		description: pages["/"].description,
		url: SITE_URL + "/",
		image: absAsset(pages["/"].ogImage),
		amenityFeature: masterPlan.zones.flatMap((z) => z.markers.map((m) => ({
			"@type": "LocationFeatureSpecification",
			name: m.name,
			value: true
		})))
	};
	if (isFilled(siteMeta.address)) node.address = {
		"@type": "PostalAddress",
		streetAddress: siteMeta.address,
		addressCountry: "VN"
	};
	return path === "/" ? node : {
		...node,
		description: p.description
	};
}
function structuredData(path) {
	const meta = pageMeta(path);
	const url = absUrl(path);
	const graph = [
		{
			"@type": "WebSite",
			"@id": ID.site,
			url: SITE_URL + "/",
			name: SITE.name,
			alternateName: SITE.alternateName,
			inLanguage: "vi-VN",
			publisher: { "@id": ID.org }
		},
		organization(),
		project(path),
		{
			"@type": "WebPage",
			"@id": `${url}#webpage`,
			url,
			name: meta.title,
			description: meta.description,
			inLanguage: "vi-VN",
			isPartOf: { "@id": ID.site },
			about: { "@id": ID.project },
			primaryImageOfPage: meta.ogImage ? {
				"@type": "ImageObject",
				url: absAsset(meta.ogImage)
			} : void 0,
			...path === "/" ? { datePublished: SITE.published } : {}
		}
	];
	if (path !== "/" && pages[path]) graph.push({
		"@type": "BreadcrumbList",
		itemListElement: [{
			"@type": "ListItem",
			position: 1,
			name: pages["/"].breadcrumb,
			item: absUrl("/")
		}, {
			"@type": "ListItem",
			position: 2,
			name: meta.breadcrumb,
			item: url
		}]
	});
	if (path === "/") graph.push({
		"@type": "FAQPage",
		mainEntity: faq.map((f) => ({
			"@type": "Question",
			name: f.q,
			acceptedAnswer: {
				"@type": "Answer",
				text: f.a
			}
		}))
	});
	return {
		"@context": "https://schema.org",
		"@graph": graph
	};
}
// src/seo/head.js
function imageMimeType(src) {
	const path = src.split(/[?#]/, 1)[0].toLowerCase();
	const type = {
		jpg: "image/jpeg",
		jpeg: "image/jpeg",
		png: "image/png",
		webp: "image/webp"
	}[path.slice(path.lastIndexOf(".") + 1)];
	if (!type) throw new Error(`Unsupported image format: ${src}`);
	return type;
}
function headTags(path) {
	const m = pageMeta(path);
	const hidden = Boolean(hiddenPages[path]);
	const url = absUrl(path);
	const imageSrc = m.ogImage || "/images/og-qtopia-trang-chu.webp";
	const image = absAsset(imageSrc);
	const twitterImageSrc = m.twitterImage || SITE.twitterImage;
	const twitterImage = absAsset(twitterImageSrc);
	const ogImageType = imageMimeType(imageSrc);
	const twitterImageType = imageMimeType(twitterImageSrc);
	const tags = [
		{
			tag: "meta",
			key: "name:description",
			attrs: {
				name: "description",
				content: m.description
			}
		},
		{
			tag: "meta",
			key: "name:robots",
			attrs: {
				name: "robots",
				content: hidden ? "noindex, follow" : "index, follow"
			}
		},
		...hidden ? [] : [{
			tag: "link",
			key: "rel:canonical",
			attrs: {
				rel: "canonical",
				href: url
			}
		}],
		{
			tag: "meta",
			key: "property:og:type",
			attrs: {
				property: "og:type",
				content: "website"
			}
		},
		{
			tag: "meta",
			key: "property:og:site_name",
			attrs: {
				property: "og:site_name",
				content: SITE.name
			}
		},
		{
			tag: "meta",
			key: "property:og:locale",
			attrs: {
				property: "og:locale",
				content: SITE.locale
			}
		},
		{
			tag: "meta",
			key: "property:og:title",
			attrs: {
				property: "og:title",
				content: m.ogTitle || m.title
			}
		},
		{
			tag: "meta",
			key: "property:og:description",
			attrs: {
				property: "og:description",
				content: m.ogDescription || m.description
			}
		},
		{
			tag: "meta",
			key: "property:og:url",
			attrs: {
				property: "og:url",
				content: url
			}
		},
		{
			tag: "meta",
			key: "property:og:image",
			attrs: {
				property: "og:image",
				content: image
			}
		},
		{
			tag: "meta",
			key: "property:og:image:type",
			attrs: {
				property: "og:image:type",
				content: ogImageType
			}
		},
		{
			tag: "meta",
			key: "property:og:image:width",
			attrs: {
				property: "og:image:width",
				content: String(SITE.ogImageWidth)
			}
		},
		{
			tag: "meta",
			key: "property:og:image:height",
			attrs: {
				property: "og:image:height",
				content: String(SITE.ogImageHeight)
			}
		},
		{
			tag: "meta",
			key: "property:og:image:alt",
			attrs: {
				property: "og:image:alt",
				content: m.ogImageAlt || SITE.name
			}
		},
		{
			tag: "meta",
			key: "name:twitter:card",
			attrs: {
				name: "twitter:card",
				content: "summary_large_image"
			}
		},
		{
			tag: "meta",
			key: "name:twitter:title",
			attrs: {
				name: "twitter:title",
				content: m.ogTitle || m.title
			}
		},
		{
			tag: "meta",
			key: "name:twitter:description",
			attrs: {
				name: "twitter:description",
				content: m.ogDescription || m.description
			}
		},
		{
			tag: "meta",
			key: "name:twitter:image",
			attrs: {
				name: "twitter:image",
				content: twitterImage
			}
		},
		{
			tag: "meta",
			key: "name:twitter:image:type",
			attrs: {
				name: "twitter:image:type",
				content: twitterImageType
			}
		},
		{
			tag: "meta",
			key: "name:twitter:image:width",
			attrs: {
				name: "twitter:image:width",
				content: String(SITE.ogImageWidth)
			}
		},
		{
			tag: "meta",
			key: "name:twitter:image:height",
			attrs: {
				name: "twitter:image:height",
				content: String(SITE.ogImageHeight)
			}
		},
		{
			tag: "meta",
			key: "name:twitter:image:alt",
			attrs: {
				name: "twitter:image:alt",
				content: m.twitterImageAlt || SITE.twitterImageAlt
			}
		}
	];
	if (!hidden) tags.push({
		tag: "script",
		key: "jsonld",
		attrs: { type: "application/ld+json" },
		json: structuredData(path)
	});
	return {
		title: m.title,
		tags
	};
}
var esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
function tagsToHtml(tags) {
	return tags.map((t) => {
		if (t.tag === "script") {
			const json = JSON.stringify(t.json).replace(/</g, "\\u003c");
			return `<script data-seo="${t.key}" type="application/ld+json">${json}<\/script>`;
		}
		const attrs = Object.entries(t.attrs).map(([k, v]) => `${k}="${esc(v)}"`).join(" ");
		return `<${t.tag} data-seo="${t.key}" ${attrs} />`;
	}).join("\n    ");
}
function applyHead(path) {
	const { title, tags } = headTags(path);
	document.title = title;
	document.querySelectorAll("[data-seo]").forEach((el) => el.remove());
	const frag = document.createDocumentFragment();
	tags.forEach((t) => {
		const el = document.createElement(t.tag);
		el.setAttribute("data-seo", t.key);
		Object.entries(t.attrs).forEach(([k, v]) => el.setAttribute(k, v));
		if (t.tag === "script") el.textContent = JSON.stringify(t.json);
		frag.appendChild(el);
	});
	document.head.appendChild(frag);
}
// src/components/Seo.jsx
function Seo() {
	const { pathname } = useLocation();
	useEffect(() => {
		const path = pathname.replace(/\/+$/, "") || "/";
		applyHead(routes.includes(path) ? path : "/404");
	}, [pathname]);
	return null;
}
// src/lib/motion.js
function pauseOffscreenMotion() {
	const sections = document.querySelectorAll("#vi-tri, #tien-ich, #mat-bang");
	let scrollTimer = 0;
	const onScroll = () => {
		if (!document.documentElement.hasAttribute("data-motion-scrolling")) document.documentElement.setAttribute("data-motion-scrolling", "");
		window.clearTimeout(scrollTimer);
		scrollTimer = window.setTimeout(() => {
			document.documentElement.removeAttribute("data-motion-scrolling");
		}, 160);
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	const stopScrollMotion = () => {
		window.removeEventListener("scroll", onScroll);
		window.clearTimeout(scrollTimer);
		document.documentElement.removeAttribute("data-motion-scrolling");
	};
	if (!("IntersectionObserver" in window)) {
		sections.forEach((section) => section.setAttribute("data-motion-active", ""));
		return stopScrollMotion;
	}
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(({ target, isIntersecting }) => {
			if (isIntersecting) target.setAttribute("data-motion-active", "");
			else target.removeAttribute("data-motion-active");
		});
	}, {
		rootMargin: "20% 0px",
		threshold: 0
	});
	sections.forEach((section) => observer.observe(section));
	return () => {
		observer.disconnect();
		stopScrollMotion();
	};
}
// src/layout/Layout.jsx
function useScrollToSection() {
	const { pathname, hash, key } = useLocation();
	useEffect(() => {
		const id = hash ? decodeURIComponent(hash.slice(1)) : "";
		if (!id) {
			window.scrollTo(0, 0);
			return;
		}
		const timer = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 0);
		return () => window.clearTimeout(timer);
	}, [
		pathname,
		hash,
		key
	]);
}
if (typeof document !== "undefined") document.documentElement.classList.add("js-ready");
function Layout() {
	const { pathname } = useLocation();
	useScrollToSection();
	useEffect(() => {
		captureFirstTouch();
		loadGtm();
		const stopWebVitals = trackWebVitals();
		const stopTracking = initDelegatedTracking();
		return () => {
			stopWebVitals();
			stopTracking();
		};
	}, []);
	useEffect(() => {
		track("page_view", {
			page_path: pathname,
			page_title: document.title
		});
		const stopScroll = trackScrollDepth();
		const stopSections = trackSectionViews();
		const stopMotion = pauseOffscreenMotion();
		return () => {
			stopScroll();
			stopSections();
			stopMotion();
		};
	}, [pathname]);
	return /* @__PURE__ */ jsxs(ContactPopupProvider, { children: [
		/* @__PURE__ */ jsx(Seo, {}),
		/* @__PURE__ */ jsx("a", {
			href: "#main",
			className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-q-navy",
			children: "Bỏ qua, tới nội dung chính"
		}),
		/* @__PURE__ */ jsx(Header, {}),
		/* @__PURE__ */ jsx("main", {
			id: "main",
			tabIndex: -1,
			className: "outline-none",
			children: /* @__PURE__ */ jsx(Outlet, {})
		}),
		/* @__PURE__ */ jsx(Footer, {}),
		/* @__PURE__ */ jsx(ValueNav, {}),
		/* @__PURE__ */ jsx(FloatingButtons, {})
	] });
}
// src/components/DeferredSection.jsx
function deferredSection(id, loader) {
	const Component = lazy(async () => {
		if (typeof window !== "undefined") {
			const section = document.getElementById(id);
			if (section && "IntersectionObserver" in window) await new Promise((resolve) => {
				const observer = new IntersectionObserver((entries) => {
					if (entries.some((entry) => entry.isIntersecting)) {
						observer.disconnect();
						resolve();
					}
				}, { rootMargin: "600px" });
				observer.observe(section);
			});
		}
		return loader();
	});
	return function DeferredSection(props) {
		return /* @__PURE__ */ jsx(Suspense, {
			fallback: /* @__PURE__ */ jsx("section", {
				id,
				className: "section-screen",
				"aria-busy": "true"
			}),
			children: /* @__PURE__ */ jsx(Component, { ...props })
		});
	};
}
// src/components/ui/Container.jsx
function Container({ className = "", children }) {
	return /* @__PURE__ */ jsx("div", {
		className: `mx-auto w-full px-5 sm:px-8 lg:w-[78%] lg:px-0 ${className}`,
		children
	});
}
// src/sections/Hero.jsx
function Hero() {
	const [active, setActive] = useState(0);
	const popup = useContactPopup();
	const slide = heroContent.images[active];
	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return void 0;
		let preloadId = 0;
		let rotateId = 0;
		const startRotation = () => {
			preloadId = window.setTimeout(() => {
				const next = heroContent.images[(active + 1) % heroContent.images.length];
				const image = new window.Image();
				const imageProps = responsiveImageProps(next.src, "100vw");
				image.decoding = "async";
				image.sizes = imageProps.sizes;
				if (imageProps.srcSet) image.srcset = imageProps.srcSet;
				image.src = imageProps.src;
			}, 2500);
			rotateId = window.setTimeout(() => setActive((i) => (i + 1) % heroContent.images.length), 6500);
		};
		if (document.readyState === "complete") startRotation();
		else window.addEventListener("load", startRotation, { once: true });
		return () => {
			window.removeEventListener("load", startRotation);
			window.clearTimeout(preloadId);
			window.clearTimeout(rotateId);
		};
	}, [active]);
	return /* @__PURE__ */ jsxs("section", {
		id: "top",
		"data-snap-section": true,
		className: "relative flex min-h-[calc(100svh-var(--header-h))] items-end overflow-hidden bg-q-navy text-white",
		children: [
			heroContent.images.slice(active, active + 1).map((img) => /* @__PURE__ */ jsx(Img, {
				src: img.src,
				alt: img.alt,
				priority: active === 0,
				fade: false,
				className: "hero-image-enter absolute inset-0 h-full w-full object-cover"
			}, img.src)),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-q-navy via-q-navy/85 to-transparent lg:h-[42%] lg:via-q-navy/65" }),
			/* @__PURE__ */ jsxs(Container, {
				className: "relative z-10 pb-[calc(1.5rem+var(--bar-h))] pt-20 lg:pb-10 lg:pr-24",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex max-w-lg flex-col items-start gap-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "hero-copy-enter flex flex-col gap-3",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "m-0 font-display text-[clamp(1.35rem,3.1vw,2.1rem)] font-extrabold leading-[1.15] tracking-tight text-white",
							children: slide.h1
						}), /* @__PURE__ */ jsx("p", {
							className: "m-0 font-display text-sm font-semibold text-q-lime sm:text-base",
							children: slide.slogan
						})]
					}, slide.src), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => popup.open("hero"),
						"data-cta-name": "hero_register",
						"data-cta-location": "hero",
						className: "btn-base btn-primary mt-1",
						children: heroContent.ctaPrimary
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-5 flex gap-2",
					role: "group",
					"aria-label": "Chọn ảnh nền",
					children: heroContent.images.map((img, i) => /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": `Hiển thị ảnh ${i + 1}`,
						"aria-current": i === active ? "true" : void 0,
						onClick: () => setActive(i),
						className: "relative grid size-6 place-items-center before:absolute before:-inset-2.5 before:content-['']",
						children: /* @__PURE__ */ jsx("span", { className: `block h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-q-lime" : "w-1.5 bg-white/55"}` })
					}, img.src))
				})]
			})
		]
	});
}
// src/sections/Story.jsx
function Story({ data }) {
	const ref = useReveal();
	const right = data.align === "right";
	return /* @__PURE__ */ jsxs("section", {
		id: data.id,
		"data-snap-section": true,
		className: "relative flex min-h-[calc(100svh-var(--header-h))] items-center overflow-hidden bg-q-navy text-white",
		children: [
			/* @__PURE__ */ jsx(Img, {
				src: data.image,
				alt: data.alt,
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ jsx("div", { className: `absolute inset-0 ${right ? "bg-gradient-to-l" : "bg-gradient-to-r"} from-q-navy/90 via-q-navy/45 to-transparent max-lg:bg-gradient-to-t max-lg:from-q-navy max-lg:via-q-navy/65 max-lg:to-transparent` }),
			/* @__PURE__ */ jsx(Container, {
				className: `relative z-10 flex py-14 max-lg:items-end max-lg:pb-[calc(2rem+var(--bar-h))] ${right ? "lg:justify-end" : ""}`,
				children: /* @__PURE__ */ jsxs("div", {
					ref,
					className: "flex max-w-md flex-col gap-3",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "section-label section-label-light",
							children: data.label
						}),
						/* @__PURE__ */ jsx("p", {
							className: "prose-lead m-0 text-white/90",
							children: data.lead
						}),
						data.points.length ? /* @__PURE__ */ jsx("ul", {
							className: "m-0 flex list-none flex-col gap-1.5 p-0 text-sm text-white/85",
							children: data.points.map((p) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-2.5",
								children: [/* @__PURE__ */ jsx("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-q-lime" }), p]
							}, p))
						}) : null,
						/* @__PURE__ */ jsx("div", {
							className: "pt-1",
							children: /* @__PURE__ */ jsxs(Link, {
								to: data.cta.to,
								"data-cta-name": data.cta.name,
								"data-cta-location": data.id,
								"data-cta-target": data.cta.to,
								className: "btn-base btn-outline cta-fx no-underline",
								children: [data.cta.label, /* @__PURE__ */ jsx(Icon, {
									name: "arrow",
									size: 18
								})]
							})
						})
					]
				})
			})
		]
	});
}
// src/components/ui/CountUp.jsx
function CountUp({ value, duration = 1400, className = "" }) {
	const text = String(value);
	const ref = useRef(null);
	useEffect(() => {
		const el = ref.current;
		if (!el) return void 0;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return void 0;
		const match = text.match(/\d+/);
		if (!match) return void 0;
		const target = Number(match[0]);
		const width = match[0].length;
		const prefix = text.slice(0, match.index);
		const suffix = text.slice(match.index + width);
		let raf = 0;
		let io = null;
		let cancelled = false;
		const finish = () => {
			el.dataset.state = "done";
			delete el.dataset.display;
		};
		const run = () => {
			if (cancelled) return;
			const t0 = performance.now();
			el.dataset.state = "running";
			const loop = (now) => {
				if (cancelled) return;
				const p = Math.min((now - t0) / duration, 1);
				const eased = 1 - (1 - p) ** 3;
				el.dataset.display = `${prefix}${String(Math.floor(target * eased)).padStart(width, "0")}${suffix}`;
				if (p >= 1) return finish();
				raf = requestAnimationFrame(loop);
			};
			raf = requestAnimationFrame(loop);
		};
		el.dataset.state = "armed";
		if ("IntersectionObserver" in window) {
			io = new IntersectionObserver((entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					io.disconnect();
					run();
				}
			}, { threshold: .3 });
			io.observe(el);
		} else run();
		return () => {
			cancelled = true;
			io?.disconnect();
			cancelAnimationFrame(raf);
			delete el.dataset.state;
			delete el.dataset.display;
		};
	}, [text, duration]);
	return /* @__PURE__ */ jsx("span", {
		ref,
		className: `countup ${className}`,
		children: /* @__PURE__ */ jsx("span", {
			className: "countup__final",
			children: text
		})
	});
}
// src/sections/Facts.jsx
function Facts() {
	const ref = useReveal();
	return /* @__PURE__ */ jsxs("section", {
		id: "so-lieu",
		"data-snap-section": true,
		"aria-label": "Số liệu tổng quan dự án QTOPIA",
		className: "section-screen relative overflow-hidden bg-q-navy text-white",
		children: [
			/* @__PURE__ */ jsx(Img, {
				src: "/images/renders/view-from-sea.webp",
				alt: "",
				"aria-hidden": "true",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-q-navy/92 via-q-navy/70 to-q-navy/92" }),
			/* @__PURE__ */ jsxs(Container, {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "section-label section-label-light mb-5 [@media(max-height:740px)]:mb-2",
						children: "Tổng quan dự án"
					}),
					/* @__PURE__ */ jsx("dl", {
						ref,
						className: "m-0 grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/15 lg:grid-cols-4",
						children: facts.map((f, i) => /* @__PURE__ */ jsxs("div", {
							style: { "--i": i },
							className: "stagger flex flex-col gap-1 bg-q-navy-700/90 px-4 py-5 backdrop-blur-sm sm:px-6 sm:py-7 [@media(max-height:740px)]:gap-0 [@media(max-height:740px)]:py-2.5 [@media(max-height:620px)]:px-3 [@media(max-height:620px)]:py-1.5",
							children: [/* @__PURE__ */ jsxs("dd", {
								className: "order-1 m-0 flex items-baseline gap-1.5",
								children: [/* @__PURE__ */ jsx(CountUp, {
									value: f.value,
									className: "font-display text-3xl font-extrabold sm:text-4xl [@media(max-height:740px)]:text-2xl"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-display text-xs font-semibold text-q-lime sm:text-sm",
									children: f.unit
								})]
							}), /* @__PURE__ */ jsx("dt", {
								className: "order-2 text-xs text-white/70 sm:text-sm",
								children: f.label
							})]
						}, f.label))
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-xs text-white/65 [@media(max-height:740px)]:mt-2 [@media(max-height:620px)]:mt-1 [@media(max-height:620px)]:text-[0.65rem] [@media(max-height:620px)]:leading-snug",
						children: "Các mốc thời gian di chuyển là thông tin tham khảo trong brochure, phụ thuộc điểm xuất phát và điều kiện giao thông."
					})
				]
			})
		]
	});
}
// src/sections/SalesPolicy.jsx
function centers(milestones) {
	const total = milestones.reduce((s, m) => s + (m.flex ?? 1), 0);
	let acc = 0;
	return milestones.map((m) => {
		const f = m.flex ?? 1;
		const c = (acc + f / 2) / total * 100;
		acc += f;
		return c;
	});
}
function Amount({ m, size = "lg" }) {
	if (!m.amount) return null;
	return /* @__PURE__ */ jsxs("span", {
		className: "flex items-baseline justify-center gap-0.5 font-display font-extrabold leading-none text-white",
		children: [/* @__PURE__ */ jsx("span", {
			className: size === "lg" ? "text-3xl xl:text-4xl" : "text-2xl",
			children: m.amount
		}), /* @__PURE__ */ jsx("span", {
			className: `${m.unit === "%" ? "text-base" : "text-sm"} font-bold text-q-lime`,
			children: m.unit
		})]
	});
}
function BankBadge({ value, className = "" }) {
	return /* @__PURE__ */ jsxs("span", {
		className: `inline-flex flex-col items-center rounded-2xl border border-q-pink/60 bg-q-pink/10 px-3 py-1.5 text-center leading-tight ${className}`,
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-[0.68rem] font-medium uppercase tracking-wider text-white/75",
			children: "NH giải ngân"
		}), /* @__PURE__ */ jsx("span", {
			className: "font-display text-xl font-extrabold text-q-pink",
			children: value
		})]
	});
}
function TimelineHorizontal({ milestones }) {
	const pos = centers(milestones);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative hidden sm:block",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex",
				children: milestones.map((m, i) => /* @__PURE__ */ jsxs("div", {
					style: { flex: m.flex ?? 1 },
					className: "flex min-w-0 flex-col items-center justify-end px-1 pb-2 text-center",
					children: [/* @__PURE__ */ jsx("span", {
						className: "h-4 whitespace-nowrap text-[0.7rem] text-white/60 lg:text-xs",
						children: m.top || ""
					}), /* @__PURE__ */ jsx("span", {
						className: "whitespace-nowrap font-display text-lg font-semibold text-white lg:text-xl",
						children: m.label
					})]
				}, i))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative h-4",
				children: [/* @__PURE__ */ jsx("span", {
					className: "absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-gradient-to-r from-q-lime via-white/40 to-q-pink",
					style: {
						left: `${pos[0]}%`,
						right: `${100 - pos[pos.length - 1]}%`
					}
				}), milestones.map((m, i) => /* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
					className: "absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-q-navy bg-q-lime shadow-[0_0_0_4px_rgba(170,236,14,0.2)]",
					style: { left: `${pos[i]}%` }
				}), m.between && i < milestones.length - 1 ? /* @__PURE__ */ jsx("span", {
					className: "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/15 bg-q-navy-700 px-3 py-1 text-xs italic text-white/85 lg:text-sm",
					style: { left: `${(pos[i] + pos[i + 1]) / 2}%` },
					children: m.between
				}) : null] }, i))]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex pt-3",
				children: milestones.map((m, i) => /* @__PURE__ */ jsxs("div", {
					style: { flex: m.flex ?? 1 },
					className: "flex min-w-0 flex-col items-center gap-1.5 px-1 text-center",
					children: [
						/* @__PURE__ */ jsx(Amount, { m }),
						m.note ? /* @__PURE__ */ jsx("span", {
							className: "text-xs text-white/70 lg:text-sm",
							children: m.note
						}) : null,
						m.bank ? /* @__PURE__ */ jsx(BankBadge, {
							value: m.bank,
							className: m.amount ? "mt-1" : ""
						}) : null
					]
				}, i))
			})
		]
	});
}
function TimelineVertical({ milestones }) {
	return /* @__PURE__ */ jsxs("ol", {
		className: "relative m-0 list-none p-0 sm:hidden",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("span", { className: "absolute bottom-3 left-[0.4rem] top-3 w-0.5 rounded-full bg-gradient-to-b from-q-lime via-white/40 to-q-pink" }), milestones.map((m, i) => /* @__PURE__ */ jsxs("li", {
			className: "relative flex flex-col gap-1 pb-3 pl-7 last:pb-0",
			children: [
				/* @__PURE__ */ jsx("span", { className: "absolute left-0 top-1.5 size-3.5 rounded-full border-2 border-q-navy bg-q-lime shadow-[0_0_0_4px_rgba(170,236,14,0.2)]" }),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-3 rounded-2xl bg-white/5 px-3.5 py-2.5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex min-w-0 flex-col",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-display text-base font-semibold text-white",
								children: m.label
							}),
							m.top ? /* @__PURE__ */ jsx("span", {
								className: "text-[0.7rem] text-white/60",
								children: m.top
							}) : null,
							m.note ? /* @__PURE__ */ jsx("span", {
								className: "text-xs text-white/70",
								children: m.note
							}) : null
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex shrink-0 flex-col items-end gap-1.5",
						children: [/* @__PURE__ */ jsx(Amount, {
							m,
							size: "sm"
						}), m.bank ? /* @__PURE__ */ jsxs("span", {
							className: "rounded-full border border-q-pink/60 bg-q-pink/10 px-2.5 py-0.5 text-xs font-semibold text-q-pink",
							children: ["NH giải ngân ", m.bank]
						}) : null]
					})]
				}),
				m.between ? /* @__PURE__ */ jsxs("span", {
					className: "pl-1 pt-1.5 text-xs italic text-white/70",
					children: ["↓ ", m.between]
				}) : null
			]
		}, i))]
	});
}
function MilestonesText({ milestones }) {
	return /* @__PURE__ */ jsx("ul", {
		className: "sr-only",
		children: milestones.map((m, i) => /* @__PURE__ */ jsxs("li", { children: [
			[m.top, m.label].filter(Boolean).join(" "),
			":",
			m.amount ? ` ${m.amount} ${m.unit}` : "",
			m.note ? ` (${m.note})` : "",
			m.bank ? ` – ngân hàng giải ngân ${m.bank}` : "",
			m.between ? `. Sau đó ${m.between}` : ""
		] }, i))
	});
}
function SalesPolicy() {
	const ref = useReveal();
	const popup = useContactPopup();
	const { methods, price } = salesPolicy;
	const [activeId, setActiveId] = useState(methods[0].id);
	const active = methods.find((m) => m.id === activeId);
	const select = (id) => {
		setActiveId(id);
		track("select_payment_method", { method: id });
	};
	const onTabKey = (e) => {
		const i = methods.findIndex((m) => m.id === activeId);
		const next = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : null;
		if (next === null) return;
		e.preventDefault();
		const m = methods[(next + methods.length) % methods.length];
		select(m.id);
		document.getElementById(`csbh-tab-${m.id}`)?.focus();
	};
	return /* @__PURE__ */ jsxs("section", {
		id: "chinh-sach",
		"data-snap-section": true,
		className: "section-screen relative !h-auto !max-h-none !justify-start min-h-[calc(100svh-var(--header-h))] overflow-hidden bg-q-navy text-white",
		children: [
			/* @__PURE__ */ jsx(Img, {
				src: "/images/renders/aqua-funny-park-night.webp",
				alt: "",
				"aria-hidden": "true",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-q-navy/95 via-q-navy/85 to-q-navy/95" }),
			/* @__PURE__ */ jsx("div", {
				className: "orbit-bg",
				style: {
					"--orbit-x": "10%",
					"--orbit-y": "90%"
				}
			}),
			/* @__PURE__ */ jsxs(Container, {
				className: "relative z-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10",
					children: [/* @__PURE__ */ jsx(SectionHeading, {
						label: salesPolicy.label,
						lead: salesPolicy.lead,
						light: true
					}), /* @__PURE__ */ jsxs("p", {
						className: "m-0 flex items-center gap-3 lg:justify-end",
						children: [
							/* @__PURE__ */ jsxs("span", {
								className: "font-display text-xs font-semibold uppercase leading-tight tracking-[0.14em] text-white/80 sm:text-sm",
								children: [
									price.prefix.split(" ").slice(0, 2).join(" "),
									/* @__PURE__ */ jsx("br", {}),
									price.prefix.split(" ").slice(2).join(" ")
								]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "bg-gradient-to-b from-white to-q-lime bg-clip-text font-display text-5xl font-extrabold leading-none tracking-tight text-transparent sm:text-6xl xl:text-7xl",
								children: price.value
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "font-display text-sm font-bold uppercase leading-tight text-white sm:text-base",
								children: [
									price.unit.split(" ")[0],
									/* @__PURE__ */ jsx("br", {}),
									price.unit.split(" ").slice(1).join(" ")
								]
							})
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					ref,
					className: "mt-6 sm:mt-8",
					children: [
						/* @__PURE__ */ jsx("div", {
							role: "tablist",
							"aria-label": "Phương thức thanh toán",
							onKeyDown: onTabKey,
							className: "stagger grid grid-cols-3 gap-1 rounded-full border border-white/15 bg-white/5 p-1 backdrop-blur-sm sm:inline-grid",
							children: methods.map((m) => {
								const on = m.id === activeId;
								return /* @__PURE__ */ jsx("button", {
									id: `csbh-tab-${m.id}`,
									type: "button",
									role: "tab",
									"aria-selected": on,
									"aria-controls": `csbh-panel-${m.id}`,
									tabIndex: on ? 0 : -1,
									onClick: () => select(m.id),
									className: `min-h-11 cursor-pointer rounded-full px-2 font-display text-[0.72rem] font-semibold leading-tight transition-colors duration-300 sm:px-5 sm:text-sm ${on ? "bg-q-lime text-q-navy" : "bg-transparent text-white/80 hover:bg-white/10 hover:text-white"}`,
									children: m.tab
								}, m.id);
							})
						}),
						/* @__PURE__ */ jsxs("div", {
							id: `csbh-panel-${active.id}`,
							role: "tabpanel",
							"aria-labelledby": `csbh-tab-${active.id}`,
							className: "stagger mt-4 rounded-3xl border border-white/10 bg-q-navy-700/70 px-4 py-5 backdrop-blur-md sm:px-8 sm:py-7",
							style: { "--i": 1 },
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "m-0 mb-5 font-display text-base font-bold uppercase tracking-[0.12em] text-white sm:mb-6 sm:text-lg",
									children: active.title
								}),
								/* @__PURE__ */ jsx(TimelineHorizontal, { milestones: active.milestones }),
								/* @__PURE__ */ jsx(TimelineVertical, { milestones: active.milestones }),
								/* @__PURE__ */ jsx(MilestonesText, { milestones: active.milestones }),
								active.perks ? /* @__PURE__ */ jsxs("div", {
									className: "mt-5 flex flex-col gap-2 border-t border-white/10 pt-4 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3",
									children: [active.perks.map((p) => /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-2 rounded-full bg-q-lime/10 px-3 py-1.5 text-xs font-semibold text-q-lime sm:text-sm",
										children: [/* @__PURE__ */ jsx(Icon, {
											name: "shield",
											size: 16
										}), p]
									}, p)), active.perksNote ? /* @__PURE__ */ jsx("span", {
										className: "text-xs italic text-white/60",
										children: active.perksNote
									}) : null]
								}) : null
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "stagger mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
							style: { "--i": 2 },
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1 text-[0.7rem] leading-snug text-white/60 sm:text-xs",
								children: [/* @__PURE__ */ jsx("span", { children: salesPolicy.glossary }), /* @__PURE__ */ jsx("span", { children: salesPolicy.disclaimer })]
							}), /* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => popup.open("chinh-sach"),
								"data-cta-name": "sales_policy_request",
								"data-cta-location": "chinh-sach",
								className: "btn-base btn-primary shrink-0 self-start sm:self-auto",
								children: [/* @__PURE__ */ jsx(Icon, {
									name: "doc",
									size: 18
								}), salesPolicy.cta]
							})]
						})
					]
				})]
			})
		]
	});
}
// src/sections/Legal.jsx
function Legal() {
	const ref = useReveal();
	const popup = useContactPopup();
	const [open, setOpen] = useState(0);
	return /* @__PURE__ */ jsx("section", {
		id: "phap-ly",
		"data-snap-section": true,
		className: "section-screen !h-auto !max-h-none min-h-[calc(100svh-var(--header-h))] !justify-start bg-q-cream",
		children: /* @__PURE__ */ jsxs(Container, { children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-start lg:gap-12",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col items-start gap-4",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					label: legalContent.label,
					lead: legalContent.lead
				}), /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => popup.open("phap-ly"),
					"data-cta-name": "legal_request",
					"data-cta-location": "phap-ly",
					className: "btn-base btn-primary",
					children: [/* @__PURE__ */ jsx(Icon, {
						name: "shield",
						size: 18
					}), legalContent.cta]
				})]
			}), /* @__PURE__ */ jsx("div", {
				ref,
				className: "flex flex-col gap-2 sm:gap-2.5",
				children: legalContent.items.map((item, i) => {
					const isOpen = open === i;
					return /* @__PURE__ */ jsxs("div", {
						style: { "--i": i },
						className: `stagger rounded-3xl bg-white px-4 py-1 transition-shadow duration-300 sm:px-5 ${isOpen ? "shadow-card" : "shadow-soft"}`,
						children: [/* @__PURE__ */ jsx("h3", {
							className: "m-0",
							children: /* @__PURE__ */ jsxs("button", {
								type: "button",
								id: `legal-q-${i}`,
								"aria-expanded": isOpen,
								"aria-controls": `legal-a-${i}`,
								onClick: () => setOpen(isOpen ? null : i),
								className: "flex min-h-14 w-full cursor-pointer items-center gap-3 py-2.5 text-left",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "grid size-9 shrink-0 place-items-center rounded-full bg-q-navy text-q-lime",
										children: /* @__PURE__ */ jsx(Icon, {
											name: "shield",
											size: 18
										})
									}),
									/* @__PURE__ */ jsxs("span", {
										className: "flex min-w-0 flex-1 flex-col",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-display text-[0.95rem] font-semibold leading-snug text-q-navy sm:text-base",
											children: item.title
										}), /* @__PURE__ */ jsx("span", {
											className: "text-xs font-normal text-q-muted sm:text-sm",
											children: item.subtitle
										})]
									}),
									/* @__PURE__ */ jsx("span", {
										"aria-hidden": "true",
										className: `grid size-8 shrink-0 place-items-center rounded-full bg-q-sand text-lg text-q-navy transition-transform duration-300 ease-[var(--ease-out)] ${isOpen ? "rotate-45" : ""}`,
										children: "+"
									})
								]
							})
						}), /* @__PURE__ */ jsx("div", {
							id: `legal-a-${i}`,
							role: "region",
							"aria-labelledby": `legal-q-${i}`,
							className: `grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
							children: /* @__PURE__ */ jsx("div", {
								className: "min-h-0 overflow-hidden",
								inert: !isOpen,
								children: /* @__PURE__ */ jsx("p", {
									className: "m-0 pb-4 pl-12 pr-2 text-sm leading-relaxed text-q-muted sm:pr-10",
									children: item.body
								})
							})
						})]
					}, item.title);
				})
			})]
		}), /* @__PURE__ */ jsx("p", {
			className: "mb-0 mt-4 text-[0.7rem] leading-snug text-q-muted sm:text-xs",
			children: legalDisclaimer
		})] })
	});
}
// src/sections/Faq.jsx
function Faq() {
	const ref = useReveal();
	const [open, setOpen] = useState(null);
	return /* @__PURE__ */ jsx("section", {
		id: "faq",
		"data-snap-section": true,
		className: "section-screen !h-auto !max-h-none min-h-[calc(100svh-var(--header-h))] !justify-start bg-q-cream",
		children: /* @__PURE__ */ jsxs(Container, { children: [/* @__PURE__ */ jsx(SectionHeading, { label: "Câu hỏi thường gặp về căn hộ QTOPIA" }), /* @__PURE__ */ jsx("div", {
			ref,
			className: "mt-5 flex flex-col gap-2 sm:gap-2.5",
			children: faq.map((item, i) => {
				const isOpen = open === i;
				return /* @__PURE__ */ jsxs("div", {
					style: { "--i": i },
					className: `stagger rounded-3xl bg-white px-5 py-1 transition-shadow duration-300 sm:px-6 ${isOpen ? "shadow-card" : "shadow-soft"}`,
					children: [/* @__PURE__ */ jsx("h3", {
						className: "m-0",
						children: /* @__PURE__ */ jsxs("button", {
							type: "button",
							id: `faq-q-${i}`,
							"aria-expanded": isOpen,
							"aria-controls": `faq-a-${i}`,
							onClick: () => setOpen(isOpen ? null : i),
							className: "flex min-h-12 w-full cursor-pointer items-center justify-between gap-4 py-2.5 text-left font-display text-[0.95rem] font-semibold text-q-navy sm:min-h-14 sm:py-3 sm:text-base [@media(max-height:740px)]:min-h-10 [@media(max-height:740px)]:py-1.5",
							children: [item.q, /* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: `grid size-8 shrink-0 place-items-center rounded-full bg-q-sand text-lg text-q-navy transition-transform duration-300 ease-[var(--ease-out)] ${isOpen ? "rotate-45" : ""}`,
								children: "+"
							})]
						})
					}), /* @__PURE__ */ jsx("div", {
						id: `faq-a-${i}`,
						role: "region",
						"aria-labelledby": `faq-q-${i}`,
						className: `grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`,
						children: /* @__PURE__ */ jsx("div", {
							className: "min-h-0 overflow-hidden",
							inert: !isOpen,
							children: /* @__PURE__ */ jsx("p", {
								className: "m-0 pb-5 pr-10 leading-relaxed text-q-muted",
								children: item.a
							})
						})
					})]
				}, item.q);
			})
		})] })
	});
}
// src/sections/Register.jsx
function Register() {
	const ref = useReveal();
	return /* @__PURE__ */ jsxs("section", {
		id: "lien-he",
		"data-snap-section": true,
		className: "section-screen relative overflow-hidden bg-q-navy text-white",
		children: [/* @__PURE__ */ jsx("div", {
			className: "orbit-bg opacity-50",
			style: {
				"--orbit-x": "12%",
				"--orbit-y": "85%"
			}
		}), /* @__PURE__ */ jsx(Container, {
			className: "relative flex min-h-0 flex-1 flex-col justify-center",
			children: /* @__PURE__ */ jsxs("div", {
				ref,
				className: "mx-auto flex max-h-full w-full flex-col overflow-hidden rounded-[1.75rem] bg-white text-q-ink shadow-card md:grid md:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative min-h-[96px] flex-1 max-md:order-first md:min-h-[180px] md:flex-none",
					children: [
						/* @__PURE__ */ jsx(Img, {
							src: leadFormContent.image,
							alt: "Phối cảnh dự án căn hộ QTOPIA nhìn từ biển",
							className: "absolute inset-0 h-full w-full object-cover"
						}),
						/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-q-navy/80 to-transparent" }),
						/* @__PURE__ */ jsx("p", {
							className: "absolute bottom-4 left-5 right-5 m-0 font-display text-base font-bold text-white drop-shadow sm:text-lg",
							children: leadFormContent.heading
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "shrink-0 p-5 sm:p-7",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "section-label",
							children: leadFormContent.label
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mb-4 mt-2 text-sm text-q-muted sm:mb-5",
							children: leadFormContent.description
						}),
						/* @__PURE__ */ jsx(LeadFormFields, { formLocation: "lien-he" })
					]
				})]
			})
		})]
	});
}
// src/pages/Home.jsx
var Location = deferredSection("vi-tri", () => import("./assets/Location-C09yrtv5.js"));
var MasterPlan = deferredSection("tien-ich", () => import("./assets/MasterPlan-CGClysY7.js"));
var FeaturedAmenities = deferredSection("tien-ich-noi-bat", () => import("./assets/FeaturedAmenities-B_HIEkd3.js"));
var Residences = deferredSection("mat-bang", () => import("./assets/Residences-BY41yp7Z.js"));
var News = deferredSection("tin-tuc", () => import("./assets/News-Bb2OM1Wk.js"));
function Home() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Hero, {}),
		/* @__PURE__ */ jsx(Story, { data: stories[0] }),
		/* @__PURE__ */ jsx(Facts, {}),
		/* @__PURE__ */ jsx(Story, { data: stories[1] }),
		/* @__PURE__ */ jsx(Location, {}),
		/* @__PURE__ */ jsx(MasterPlan, {}),
		/* @__PURE__ */ jsx(FeaturedAmenities, {}),
		/* @__PURE__ */ jsx(Residences, {}),
		/* @__PURE__ */ jsx(SalesPolicy, {}),
		/* @__PURE__ */ jsx(News, {}),
		/* @__PURE__ */ jsx(Legal, {}),
		/* @__PURE__ */ jsx(Faq, {}),
		/* @__PURE__ */ jsx(Register, {})
	] });
}
// src/App.jsx
var Topic = lazy(() => import("./assets/Topic-D2t4Nk5O.js"));
var NotFound = lazy(() => import("./assets/NotFound-BqxTbanu.js"));
var NewsPage = lazy(() => import("./assets/NewsPage-DX9dymck.js"));
var NewsDetail = lazy(() => import("./assets/NewsDetail-03rVMFAc.js"));
function App() {
	return /* @__PURE__ */ jsx(Suspense, {
		fallback: /* @__PURE__ */ jsx("main", {
			className: "section-screen",
			"aria-busy": "true"
		}),
		children: /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsxs(Route, {
			element: /* @__PURE__ */ jsx(Layout, {}),
			children: [
				/* @__PURE__ */ jsx(Route, {
					index: true,
					element: /* @__PURE__ */ jsx(Home, {})
				}),
				/* @__PURE__ */ jsx(Route, {
					path: "tin-tuc",
					element: /* @__PURE__ */ jsx(NewsPage, {})
				}),
				/* @__PURE__ */ jsx(Route, {
					path: "tin-tuc/:articleId",
					element: /* @__PURE__ */ jsx(NewsDetail, {})
				}),
				topicPaths.map((p) => /* @__PURE__ */ jsx(Route, {
					path: p,
					element: /* @__PURE__ */ jsx(Topic, {})
				}, p)),
				/* @__PURE__ */ jsx(Route, {
					path: "*",
					element: /* @__PURE__ */ jsx(NotFound, {})
				})
			]
		}) })
	});
}
// src/entry-server.jsx
function render(url) {
	return new Promise((resolve, reject) => {
		const output = new PassThrough();
		let html = "";
		output.on("data", (chunk) => {
			html += chunk.toString();
		});
		output.on("end", () => resolve(html));
		output.on("error", reject);
		const stream = renderToPipeableStream(/* @__PURE__ */ jsx(StaticRouter, {
			location: url,
			children: /* @__PURE__ */ jsx(App, {})
		}), {
			onAllReady() {
				stream.pipe(output);
			},
			onError: reject
		});
	});
}
export { SITE_URL, SITE_URL_PLACEHOLDER, absUrl, headTags, hiddenPages, CountUp as n, pages, Container as r, render, routes, Register as t, tagsToHtml };
