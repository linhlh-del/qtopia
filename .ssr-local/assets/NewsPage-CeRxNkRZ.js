import { c as getNewsHref, d as newsItems, s as Container } from "../entry-server.js";
import { t as MediaFrame } from "./MediaFrame-BgeqE8_C.js";
import { Link } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
// src/pages/NewsPage.jsx
function NewsImage({ item, className = "" }) {
	return /* @__PURE__ */ jsx(MediaFrame, {
		src: item.image,
		alt: item.title,
		ratio: "16 / 10",
		note: "Khung ảnh demo",
		className
	});
}
function NewsMeta({ item }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-between gap-3 text-[length:calc(0.7rem*var(--type-scale))] font-semibold uppercase tracking-wider text-q-muted",
		children: [/* @__PURE__ */ jsxs("span", { children: [/* @__PURE__ */ jsx("span", {
			className: "mr-1 text-q-lime-ink",
			children: "#"
		}), item.category] }), /* @__PURE__ */ jsx("span", { children: "Bài viết mẫu" })]
	});
}
function NewsCard({ item }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "flex flex-col border-r border-b border-q-navy/10 p-4 sm:p-5",
		children: [
			/* @__PURE__ */ jsx(Link, {
				to: getNewsHref(item.id),
				"aria-label": item.title,
				className: "group mb-4 block overflow-hidden rounded-lg",
				children: /* @__PURE__ */ jsx(NewsImage, {
					item,
					className: "transition-transform duration-500 group-hover:scale-[1.03]"
				})
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "m-0 font-display text-base font-bold leading-snug text-q-navy",
				children: /* @__PURE__ */ jsx(Link, {
					to: getNewsHref(item.id),
					className: "text-inherit no-underline hover:text-q-blue",
					children: item.title
				})
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 line-clamp-3 text-sm leading-relaxed text-q-muted",
				children: item.excerpt
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-auto pt-4",
				children: /* @__PURE__ */ jsx(NewsMeta, { item })
			})
		]
	});
}
function NewsPage() {
	const [featured, ...articles] = newsItems;
	const highlights = articles.slice(0, 2);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-q-navy py-12 text-white sm:py-16",
		children: [/* @__PURE__ */ jsx("div", {
			className: "orbit-bg opacity-60",
			style: {
				"--orbit-x": "85%",
				"--orbit-y": "20%"
			}
		}), /* @__PURE__ */ jsxs(Container, {
			className: "relative text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "m-0 font-display text-xs font-bold uppercase tracking-[0.2em] text-q-lime",
					children: "Cập nhật từ QTOPIA"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "section-title mt-3 text-[length:calc(clamp(1.9rem,4.4vw,3.4rem)*var(--type-scale))] text-white",
					children: "Tin tức & sự kiện"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base",
					children: "Cập nhật thông tin và những câu chuyện xoay quanh QTOPIA."
				})
			]
		})]
	}), /* @__PURE__ */ jsx("section", {
		className: "bg-q-sand py-10 sm:py-14",
		children: /* @__PURE__ */ jsxs(Container, { children: [
			/* @__PURE__ */ jsx("p", {
				className: "mb-4 inline-block border-b border-q-lime-ink pb-2 font-display text-xs font-bold uppercase tracking-[0.18em] text-q-lime-ink",
				children: "Tin mới nhất"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid overflow-hidden rounded-xl border border-q-navy/10 bg-white lg:grid-cols-[minmax(0,3fr)_minmax(15rem,1fr)]",
				children: [/* @__PURE__ */ jsxs("article", {
					className: "grid min-w-0 md:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col p-5 sm:p-8",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-display text-xl font-bold leading-snug text-q-navy sm:text-2xl",
								children: /* @__PURE__ */ jsx(Link, {
									to: getNewsHref(featured.id),
									className: "text-inherit no-underline hover:text-q-blue",
									children: featured.title
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-3 text-sm leading-relaxed text-q-muted",
								children: featured.excerpt
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-auto pt-6",
								children: [/* @__PURE__ */ jsx(NewsMeta, { item: featured }), /* @__PURE__ */ jsxs(Link, {
									to: getNewsHref(featured.id),
									className: "btn-base btn-primary mt-5 inline-flex no-underline",
									children: ["Đọc bài viết", /* @__PURE__ */ jsxs("span", {
										className: "sr-only",
										children: [": ", featured.title]
									})]
								})]
							})
						]
					}), /* @__PURE__ */ jsx(Link, {
						to: getNewsHref(featured.id),
						"aria-label": featured.title,
						className: "group block overflow-hidden",
						children: /* @__PURE__ */ jsx(NewsImage, {
							item: featured,
							className: "h-full min-h-56 transition-transform duration-500 group-hover:scale-[1.03] md:min-h-full"
						})
					})]
				}), /* @__PURE__ */ jsx("aside", {
					"aria-label": "Bài viết nổi bật",
					className: "flex flex-col border-t border-q-navy/10 lg:border-l lg:border-t-0",
					children: highlights.map((item) => /* @__PURE__ */ jsxs("article", {
						className: "flex flex-1 flex-col justify-center border-b border-q-navy/10 p-5 last:border-0 sm:p-6",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "m-0 font-display text-base font-bold leading-snug text-q-navy",
							children: /* @__PURE__ */ jsx(Link, {
								to: getNewsHref(item.id),
								className: "text-inherit no-underline hover:text-q-blue",
								children: item.title
							})
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-4",
							children: /* @__PURE__ */ jsx(NewsMeta, { item })
						})]
					}, item.id))
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-12 sm:mt-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-5 text-center",
					children: [/* @__PURE__ */ jsx("p", {
						className: "m-0 font-display text-xs font-bold uppercase tracking-[0.18em] text-q-lime-ink",
						children: "Khám phá thêm"
					}), /* @__PURE__ */ jsx("h2", {
						className: "mt-2 font-display text-2xl font-extrabold text-q-navy",
						children: "Các bài viết khác"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "grid overflow-hidden rounded-xl border-t border-l border-q-navy/10 bg-white sm:grid-cols-2 lg:grid-cols-4",
					children: articles.map((item) => /* @__PURE__ */ jsx(NewsCard, { item }, item.id))
				})]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-5 text-center text-xs text-q-muted",
				children: "Bài viết và ảnh đang ở dạng minh họa."
			})
		] })
	})] });
}
export { NewsPage as default };
