import { c as getNewsHref, d as newsItems, l as hasRealNews, s as Container, u as isSampleNews } from "../entry-server.js";
import { t as MediaFrame } from "./MediaFrame-BgeqE8_C.js";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/sections/News.jsx
function ArrowIcon({ direction = "right" }) {
	return /* @__PURE__ */ jsx("svg", {
		viewBox: "0 0 20 20",
		fill: "none",
		"aria-hidden": "true",
		className: `size-4 ${direction === "left" ? "rotate-180" : ""}`,
		children: /* @__PURE__ */ jsx("path", {
			d: "M3.5 10h12m-5-5 5 5-5 5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function News() {
	const trackRef = useRef(null);
	const [activePage, setActivePage] = useState(0);
	const [pageTargets, setPageTargets] = useState([
		0,
		0,
		0,
		0
	]);
	const pageTargetsRef = useRef(pageTargets);
	const updatePagination = useCallback(() => {
		const track = trackRef.current;
		const firstCard = track?.firstElementChild;
		if (!track || !firstCard) return;
		const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
		const cardStep = firstCard.getBoundingClientRect().width + gap;
		const cardsPerPage = Math.max(1, Math.floor((track.clientWidth + gap) / cardStep));
		const pageCount = Math.ceil(newsItems.length / cardsPerPage);
		const maxScroll = track.scrollWidth - track.clientWidth;
		const trackLeft = track.getBoundingClientRect().left;
		const targets = Array.from({ length: pageCount }, (_, page) => {
			const cardLeft = track.children[Math.min(page * cardsPerPage, newsItems.length - 1)].getBoundingClientRect().left - trackLeft + track.scrollLeft;
			return Math.min(cardLeft, maxScroll);
		});
		pageTargetsRef.current = targets;
		setPageTargets((current) => current.length === targets.length && current.every((target, page) => target === targets[page]) ? current : targets);
		const nearestPage = targets.reduce((nearest, target, page) => Math.abs(target - track.scrollLeft) < Math.abs(targets[nearest] - track.scrollLeft) ? page : nearest, 0);
		setActivePage(nearestPage);
	}, []);
	const updateActivePage = useCallback(() => {
		const track = trackRef.current;
		const targets = pageTargetsRef.current;
		if (!track || !targets.length) return;
		const nearestPage = targets.reduce((nearest, target, page) => Math.abs(target - track.scrollLeft) < Math.abs(targets[nearest] - track.scrollLeft) ? page : nearest, 0);
		setActivePage((current) => current === nearestPage ? current : nearestPage);
	}, []);
	useEffect(() => {
		const track = trackRef.current;
		if (!track) return void 0;
		let measureFrame = requestAnimationFrame(updatePagination);
		let scrollFrame = 0;
		const onResize = () => {
			cancelAnimationFrame(measureFrame);
			measureFrame = requestAnimationFrame(updatePagination);
		};
		const onScroll = () => {
			if (scrollFrame) return;
			scrollFrame = requestAnimationFrame(() => {
				scrollFrame = 0;
				updateActivePage();
			});
		};
		const resizeObserver = new ResizeObserver(onResize);
		resizeObserver.observe(track);
		track.addEventListener("scroll", onScroll, { passive: true });
		return () => {
			cancelAnimationFrame(measureFrame);
			cancelAnimationFrame(scrollFrame);
			resizeObserver.disconnect();
			track.removeEventListener("scroll", onScroll);
		};
	}, [updateActivePage, updatePagination]);
	const goToPage = (page) => {
		const track = trackRef.current;
		if (!track) return;
		track.scrollTo({
			left: pageTargets[page],
			behavior: "smooth"
		});
		setActivePage(page);
	};
	return /* @__PURE__ */ jsx("section", {
		id: "tin-tuc",
		"data-snap-section": true,
		className: "qtopia-news section-screen overflow-hidden bg-q-sand",
		children: /* @__PURE__ */ jsxs(Container, { children: [
			/* @__PURE__ */ jsxs("header", {
				className: "text-center",
				children: [
					/* @__PURE__ */ jsx("p", {
						className: "m-0 font-display text-xs font-bold uppercase tracking-[0.2em] text-q-lime-ink",
						children: "Tin mới nhất"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-2 font-display text-[length:calc(clamp(1.7rem,3.8vw,2.8rem)*var(--type-scale))] font-extrabold uppercase leading-tight tracking-wide text-q-navy",
						children: "Tin tức & sự kiện"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-q-muted sm:text-base",
						children: "Cập nhật những thông tin mới nhất về QTOPIA."
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4 flex items-center justify-between gap-4 sm:mt-6 [@media(max-height:740px)]:mt-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					role: "group",
					"aria-label": "Điều hướng tin tức",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => goToPage(Math.max(0, activePage - 1)),
						disabled: activePage === 0,
						"aria-label": "Trang tin trước",
						className: "grid size-10 place-items-center rounded-full border border-q-navy/20 bg-white text-q-navy transition-colors hover:border-q-navy hover:bg-q-navy hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-q-navy/20 disabled:hover:bg-white disabled:hover:text-q-navy sm:size-11",
						children: /* @__PURE__ */ jsx(ArrowIcon, { direction: "left" })
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => goToPage(Math.min(pageTargets.length - 1, activePage + 1)),
						disabled: activePage >= pageTargets.length - 1,
						"aria-label": "Trang tin tiếp theo",
						className: "grid size-10 place-items-center rounded-full border border-q-navy/20 bg-white text-q-navy transition-colors hover:border-q-navy hover:bg-q-navy hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-q-navy/20 disabled:hover:bg-white disabled:hover:text-q-navy sm:size-11",
						children: /* @__PURE__ */ jsx(ArrowIcon, {})
					})]
				}), /* @__PURE__ */ jsxs(Link, {
					to: "/tin-tuc",
					className: "inline-flex min-h-11 items-center gap-2 border-b border-q-navy/25 font-display text-xs font-bold uppercase tracking-wider text-q-navy no-underline transition-colors hover:border-q-lime-ink hover:text-q-lime-ink sm:text-sm",
					children: ["Xem tất cả", /* @__PURE__ */ jsx(ArrowIcon, {})]
				})]
			}),
			/* @__PURE__ */ jsx("ul", {
				ref: trackRef,
				className: "m-0 mt-3 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto p-1 pb-3 [scrollbar-width:none] sm:gap-6 lg:gap-8 [&::-webkit-scrollbar]:hidden",
				"aria-label": "Bài viết mới nhất",
				children: newsItems.map((item) => /* @__PURE__ */ jsx("li", {
					className: "flex w-[84%] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-4rem)/3)]",
					children: /* @__PURE__ */ jsxs("article", {
						className: "group flex w-full flex-col overflow-hidden rounded-xl border border-q-navy/10 bg-white shadow-soft transition-shadow duration-300 hover:shadow-card",
						children: [/* @__PURE__ */ jsxs(Link, {
							to: getNewsHref(item.id),
							className: "relative block overflow-hidden",
							"aria-label": item.title,
							children: [/* @__PURE__ */ jsx(MediaFrame, {
								src: item.image,
								alt: item.title,
								ratio: "16 / 9",
								note: "Khung ảnh demo",
								className: "transition-transform duration-500 group-hover:scale-[1.03]"
							}), /* @__PURE__ */ jsx("span", {
								className: "absolute bottom-3 left-3 rounded-sm bg-q-navy px-3 py-1.5 font-display text-[length:calc(0.75rem*var(--type-scale))] font-bold uppercase tracking-wider text-q-lime",
								children: item.category
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-1 flex-col p-4 sm:p-5",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "m-0 font-display text-lg font-bold leading-snug text-q-navy",
									children: /* @__PURE__ */ jsx(Link, {
										to: getNewsHref(item.id),
										className: "text-inherit no-underline transition-colors hover:text-q-blue",
										children: item.title
									})
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 line-clamp-2 text-sm leading-relaxed text-q-muted",
									children: item.excerpt
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-auto flex items-center justify-between gap-3 border-t border-q-navy/10 pt-2",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[length:calc(0.68rem*var(--type-scale))] font-semibold uppercase tracking-wider text-q-muted",
										children: isSampleNews(item) ? "Bài viết mẫu" : item.category
									}), /* @__PURE__ */ jsxs(Link, {
										to: getNewsHref(item.id),
										className: "inline-flex min-h-10 items-center gap-2 font-display text-xs font-bold uppercase tracking-wide text-q-navy no-underline hover:text-q-blue",
										children: [
											"Đọc thêm",
											/* @__PURE__ */ jsxs("span", {
												className: "sr-only",
												children: [": ", item.title]
											}),
											/* @__PURE__ */ jsx(ArrowIcon, {})
										]
									})]
								})
							]
						})]
					})
				}, item.id))
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mx-auto flex max-w-full flex-wrap justify-center",
				role: "group",
				"aria-label": "Chọn trang tin tức",
				children: pageTargets.map((_, page) => /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: () => goToPage(page),
					"aria-label": `Đi tới trang ${page + 1}`,
					"aria-current": page === activePage ? "page" : void 0,
					className: "group grid h-11 w-7 cursor-pointer place-items-center border-0 bg-transparent p-0",
					children: /* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						className: `block h-2 rounded-full transition-all duration-200 ${page === activePage ? "w-6 bg-q-lime-ink" : "w-2 bg-q-navy/20 group-hover:bg-q-navy/40"}`
					})
				}, page))
			}),
			hasRealNews() ? null : /* @__PURE__ */ jsx("p", {
				className: "mt-4 text-center text-xs text-q-muted",
				children: "Bài viết và ảnh đang ở dạng minh họa."
			})
		] })
	});
}
export { News as default };
