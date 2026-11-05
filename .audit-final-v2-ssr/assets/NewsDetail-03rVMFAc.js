import { r as Container } from "../entry-server.js";
import { t as MediaFrame } from "./MediaFrame-YJt46scW.js";
import { n as newsItems, t as getNewsHref } from "./news-B4HGMkTB.js";
import NotFound from "./NotFound-BqxTbanu.js";
import { Link, useParams } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
// src/pages/NewsDetail.jsx
function NewsDetail() {
	const { articleId } = useParams();
	const article = newsItems.find((item) => item.id === articleId);
	if (!article) return /* @__PURE__ */ jsx(NotFound, {});
	const related = newsItems.filter((item) => item.id !== article.id).slice(0, 3);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		className: "bg-q-sand pb-12 sm:pb-16",
		children: [/* @__PURE__ */ jsx("div", {
			className: "bg-q-navy py-8 text-white sm:py-10",
			children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("nav", {
				"aria-label": "Đường dẫn trang",
				children: /* @__PURE__ */ jsxs("ol", {
					className: "m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-white/70",
					children: [
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/",
							className: "text-white/80 underline-offset-4 hover:underline",
							children: "Trang chủ"
						}) }),
						/* @__PURE__ */ jsx("li", {
							"aria-hidden": "true",
							children: "/"
						}),
						/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
							to: "/tin-tuc",
							className: "text-white/80 underline-offset-4 hover:underline",
							children: "Tin tức"
						}) }),
						/* @__PURE__ */ jsx("li", {
							"aria-hidden": "true",
							children: "/"
						}),
						/* @__PURE__ */ jsx("li", {
							"aria-current": "page",
							className: "font-semibold text-q-lime",
							children: article.category
						})
					]
				})
			}) })
		}), /* @__PURE__ */ jsx(Container, {
			className: "pt-8 sm:pt-12",
			children: /* @__PURE__ */ jsxs("article", {
				className: "w-full",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mx-auto max-w-3xl text-center",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "m-0 font-display text-xs font-bold uppercase tracking-[0.18em] text-q-lime-ink",
								children: [
									article.category,
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "px-2 text-q-navy/30",
										children: "/"
									}),
									" Bài viết mẫu"
								]
							}),
							/* @__PURE__ */ jsx("h1", {
								className: "section-title mt-4 text-[clamp(1.8rem,4vw,3rem)] text-q-navy",
								children: article.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mx-auto mt-4 max-w-2xl text-base leading-relaxed text-q-muted",
								children: article.excerpt
							})
						]
					}),
					/* @__PURE__ */ jsx(MediaFrame, {
						src: article.image,
						alt: article.title,
						ratio: "16 / 9",
						note: "Khung ảnh demo",
						className: "mt-8 overflow-hidden rounded-xl border border-q-navy/10 shadow-soft sm:mt-10"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-5 text-base leading-[1.85] text-q-ink",
								children: [
									/* @__PURE__ */ jsx("p", {
										className: "m-0",
										children: article.excerpt
									}),
									/* @__PURE__ */ jsx("h2", {
										className: "m-0 pt-2 font-display text-xl font-bold leading-snug text-q-navy",
										children: "Thông tin bài viết"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "m-0",
										children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae neque ac nisi consequat interdum. Aenean sed sapien at augue consequat tempor, ut feugiat erat posuere. Nội dung này là văn bản mẫu để minh họa bố cục bài viết."
									}),
									/* @__PURE__ */ jsx("p", {
										className: "m-0",
										children: "Curabitur aliquam risus vel dui tincidunt, id malesuada justo consequat. Integer malesuada, lectus sed facilisis placerat, erat nibh volutpat erat, vitae feugiat turpis sapien non est. Nội dung chính thức sẽ được cập nhật sau."
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-8 border-t border-q-navy/10 pt-5",
								children: [/* @__PURE__ */ jsx("span", {
									className: "rounded-full bg-q-navy/5 px-3 py-1.5 text-xs font-semibold text-q-navy",
									children: article.category
								}), /* @__PURE__ */ jsx(Link, {
									to: "/tin-tuc",
									className: "ml-3 text-sm font-semibold text-q-navy underline underline-offset-4 hover:text-q-blue",
									children: "Quay lại Tin tức"
								})]
							})]
						}), /* @__PURE__ */ jsxs("aside", {
							className: "h-fit rounded-xl border border-q-navy/10 bg-white p-5",
							children: [
								/* @__PURE__ */ jsx("p", {
									className: "m-0 font-display text-xs font-bold uppercase tracking-[0.16em] text-q-lime-ink",
									children: "Bài viết nổi bật"
								}),
								/* @__PURE__ */ jsx("ul", {
									className: "m-0 mt-4 flex list-none flex-col divide-y divide-q-navy/10 p-0",
									children: related.map((item) => /* @__PURE__ */ jsx("li", {
										className: "py-3 first:pt-0 last:pb-0",
										children: /* @__PURE__ */ jsx(Link, {
											to: getNewsHref(item.id),
											className: "font-display text-sm font-semibold leading-snug text-q-navy no-underline hover:text-q-blue",
											children: item.title
										})
									}, item.id))
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-5 w-full",
									children: /* @__PURE__ */ jsx(Link, {
										to: "/#lien-he",
										className: "btn-base btn-primary flex w-full justify-center whitespace-nowrap no-underline",
										children: "Nhận thông tin QTOPIA"
									})
								})
							]
						})]
					})
				]
			})
		})]
	}), /* @__PURE__ */ jsx("section", {
		className: "bg-white py-12 sm:py-16",
		children: /* @__PURE__ */ jsxs(Container, { children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
					className: "m-0 font-display text-xs font-bold uppercase tracking-[0.16em] text-q-lime-ink",
					children: "Cùng chủ đề"
				}), /* @__PURE__ */ jsx("h2", {
					className: "mt-2 font-display text-2xl font-extrabold text-q-navy",
					children: "Bài viết liên quan"
				})] }), /* @__PURE__ */ jsx(Link, {
					to: "/tin-tuc",
					className: "font-display text-sm font-bold text-q-navy underline underline-offset-4 hover:text-q-blue",
					children: "Tất cả tin tức"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: related.map((item) => /* @__PURE__ */ jsxs("article", {
					className: "overflow-hidden rounded-xl border border-q-navy/10 bg-q-sand",
					children: [/* @__PURE__ */ jsx(Link, {
						to: getNewsHref(item.id),
						"aria-label": item.title,
						className: "group block overflow-hidden",
						children: /* @__PURE__ */ jsx(MediaFrame, {
							src: item.image,
							alt: item.title,
							ratio: "16 / 10",
							note: "Khung ảnh demo",
							className: "transition-transform duration-500 group-hover:scale-[1.03]"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "p-5",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "m-0 text-[0.68rem] font-bold uppercase tracking-wider text-q-lime-ink",
								children: item.category
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "mt-2 font-display text-lg font-bold leading-snug text-q-navy",
								children: /* @__PURE__ */ jsx(Link, {
									to: getNewsHref(item.id),
									className: "text-inherit no-underline hover:text-q-blue",
									children: item.title
								})
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 line-clamp-2 text-sm leading-relaxed text-q-muted",
								children: item.excerpt
							})
						]
					})]
				}, item.id))
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-5 text-center text-xs text-q-muted",
				children: "Bài viết và ảnh đang ở dạng minh họa."
			})
		] })
	})] });
}
export { NewsDetail as default };
