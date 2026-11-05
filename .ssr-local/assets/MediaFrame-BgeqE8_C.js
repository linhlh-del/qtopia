import { a as Img } from "./content-DBX5_AOn.js";
import { jsx, jsxs } from "react/jsx-runtime";
// src/components/ui/MediaFrame.jsx
function MediaFrame({ src, alt, ratio = "16 / 10", priority = false, note = "Ảnh sẽ được cập nhật", className = "", imgClassName = "h-full w-full object-cover", light = false, notePosition = "center" }) {
	const bottom = notePosition === "bottom";
	return /* @__PURE__ */ jsx("div", {
		className: `relative overflow-hidden ${className}`,
		style: { aspectRatio: ratio },
		children: src ? /* @__PURE__ */ jsx(Img, {
			src,
			alt,
			priority,
			className: imgClassName
		}) : /* @__PURE__ */ jsxs("div", {
			role: "img",
			"aria-label": `${alt} — ${note.toLowerCase()}`,
			className: `flex h-full w-full flex-col items-center gap-2 border border-dashed p-3 text-center ${bottom ? "justify-end" : "justify-center p-4"} ${light ? "border-white/30 bg-white/5 text-white/65" : "border-q-navy/20 bg-q-sand text-q-muted"}`,
			children: [/* @__PURE__ */ jsxs("svg", {
				width: "30",
				height: "30",
				viewBox: "0 0 24 24",
				fill: "none",
				"aria-hidden": "true",
				className: `opacity-55 ${bottom ? "hidden" : ""}`,
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "3",
						y: "4",
						width: "18",
						height: "16",
						rx: "2.5",
						stroke: "currentColor",
						strokeWidth: "1.6"
					}),
					/* @__PURE__ */ jsx("circle", {
						cx: "8.5",
						cy: "9.5",
						r: "1.6",
						fill: "currentColor"
					}),
					/* @__PURE__ */ jsx("path", {
						d: "M4 17l4.5-4.5 3 3 3.5-3.5L20 16",
						stroke: "currentColor",
						strokeWidth: "1.6",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				]
			}), /* @__PURE__ */ jsx("span", {
				className: "font-display text-xs font-semibold",
				children: note
			})]
		})
	});
}
export { MediaFrame as t };
