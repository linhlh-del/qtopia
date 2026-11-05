import { r as Container } from "../entry-server.js";
import { t as Img } from "./Img-Bk2iwTwh.js";
import { a as featuredAmenityGroups, n as useReveal, t as SectionHeading } from "./SectionHeading-DeHVt1iA.js";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/sections/FeaturedAmenities.jsx
function FeaturedAmenities() {
	const [groupId, setGroupId] = useState(featuredAmenityGroups[0].id);
	const [lightbox, setLightbox] = useState(null);
	const ref = useReveal();
	const track = useRef(null);
	const group = featuredAmenityGroups.find((g) => g.id === groupId);
	const slide = (direction) => {
		const list = track.current;
		if (!list) return;
		const step = (list.firstElementChild?.offsetWidth || list.clientWidth * .8) + 12;
		list.scrollBy({
			left: direction * step,
			behavior: "smooth"
		});
	};
	useEffect(() => {
		if (!lightbox) return void 0;
		const onKey = (e) => e.key === "Escape" && setLightbox(null);
		document.addEventListener("keydown", onKey);
		return () => document.removeEventListener("keydown", onKey);
	}, [lightbox]);
	const card = (item, extraCls = "") => /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick: () => setLightbox(item),
		className: `group relative block h-full w-full overflow-hidden rounded-2xl ${extraCls}`,
		children: [
			/* @__PURE__ */ jsx(Img, {
				src: item.image,
				alt: `${item.caption} — tiện ích dự án QTOPIA`,
				className: "h-full w-full object-cover transition-transform duration-[var(--dur-slow)] ease-[var(--ease-out)] group-hover:scale-105"
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" }),
			/* @__PURE__ */ jsx("span", {
				className: "absolute bottom-3 left-3 right-3 text-left font-display text-sm font-semibold text-white drop-shadow",
				children: item.caption
			})
		]
	});
	return /* @__PURE__ */ jsxs("section", {
		id: "tien-ich-noi-bat",
		"data-snap-section": true,
		className: "section-screen bg-q-sand",
		children: [/* @__PURE__ */ jsxs(Container, { children: [
			/* @__PURE__ */ jsx("div", {
				ref,
				children: /* @__PURE__ */ jsx(SectionHeading, {
					label: "Tiện ích QTOPIA theo từng nhịp sống",
					lead: "Chọn một trải nghiệm: năng lượng của Ocean Galaxy, khoảng nghỉ tại Oasis Resort hay góc nhìn riêng từ các tầng mái."
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: featuredAmenityGroups.map((g) => /* @__PURE__ */ jsx("button", {
					type: "button",
					"data-active": g.id === groupId,
					onClick: () => setGroupId(g.id),
					className: `min-h-11 rounded-full px-5 py-2.5 font-display text-sm font-semibold transition-colors ${g.id === groupId ? "bg-q-navy text-white" : "bg-white text-q-muted hover:text-q-navy"}`,
					children: g.label
				}, g.id))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative mt-5",
				children: [
					/* @__PURE__ */ jsx("ul", {
						ref: track,
						className: "m-0 flex list-none snap-x snap-mandatory gap-3 overflow-x-auto p-0 pb-2 [scrollbar-width:thin] lg:grid lg:h-[clamp(320px,46svh,440px)] lg:grid-cols-4 lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)] lg:overflow-visible lg:pb-0",
						"aria-label": `Ảnh tiện ích ${group.label}`,
						children: group.items.map((item, i) => /* @__PURE__ */ jsx("li", {
							className: `h-[clamp(170px,28svh,260px)] w-[78%] shrink-0 snap-start sm:w-[46%] lg:h-auto lg:w-auto ${i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`,
							children: card(item)
						}, item.image))
					}, groupId),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => slide(-1),
						"aria-label": "Xem ảnh trước",
						className: "absolute left-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-q-navy/75 text-xl text-white backdrop-blur hover:bg-q-navy lg:hidden",
						children: "‹"
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => slide(1),
						"aria-label": "Xem ảnh tiếp theo",
						className: "absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-q-navy/75 text-xl text-white backdrop-blur hover:bg-q-navy lg:hidden",
						children: "›"
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-2 text-xs text-q-muted lg:hidden",
				children: "Bấm mũi tên hoặc vuốt ngang để xem thêm ảnh"
			})
		] }), lightbox ? /* @__PURE__ */ jsxs("div", {
			className: "fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm",
			role: "dialog",
			"aria-modal": "true",
			onClick: () => setLightbox(null),
			children: [/* @__PURE__ */ jsx("button", {
				type: "button",
				"aria-label": "Đóng",
				onClick: () => setLightbox(null),
				className: "absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/15 text-2xl text-white hover:bg-white/25",
				children: "×"
			}), /* @__PURE__ */ jsxs("figure", {
				onClick: (e) => e.stopPropagation(),
				className: "max-h-[90vh] max-w-5xl",
				children: [/* @__PURE__ */ jsx(Img, {
					src: lightbox.image,
					alt: `${lightbox.caption} — tiện ích dự án QTOPIA`,
					priority: true,
					className: "max-h-[82vh] w-full rounded-xl object-contain"
				}), /* @__PURE__ */ jsx("figcaption", {
					className: "mt-3 text-center text-sm text-white/80",
					children: lightbox.caption
				})]
			})]
		}) : null]
	});
}
export { FeaturedAmenities as default };
