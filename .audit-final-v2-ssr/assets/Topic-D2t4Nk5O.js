import { pages, r as Container, t as Register } from "../entry-server.js";
import Location from "./Location-C09yrtv5.js";
import MasterPlan from "./MasterPlan-CGClysY7.js";
import FeaturedAmenities from "./FeaturedAmenities-B_HIEkd3.js";
import Residences from "./Residences-BY41yp7Z.js";
import { Link, useLocation } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
// src/pages/Topic.jsx
var BODY = {
	"/vi-tri": () => /* @__PURE__ */ jsx(Location, { showTopicLink: false }),
	"/tien-ich": () => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(MasterPlan, {}), /* @__PURE__ */ jsx(FeaturedAmenities, {})] }),
	"/mat-bang": () => /* @__PURE__ */ jsx(Residences, { showTopicLink: false })
};
function Topic() {
	const path = useLocation().pathname.replace(/\/+$/, "") || "/";
	const meta = pages[path];
	const Body = BODY[path];
	if (!meta || !Body) return null;
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsxs("section", {
			className: "relative overflow-hidden bg-q-navy py-14 text-white sm:py-20",
			children: [/* @__PURE__ */ jsx("div", {
				className: "orbit-bg opacity-70",
				style: {
					"--orbit-x": "85%",
					"--orbit-y": "20%"
				}
			}), /* @__PURE__ */ jsxs(Container, {
				className: "relative flex flex-col gap-5",
				children: [
					/* @__PURE__ */ jsx("nav", {
						"aria-label": "Đường dẫn trang",
						children: /* @__PURE__ */ jsxs("ol", {
							className: "m-0 flex list-none flex-wrap items-center gap-2 p-0 text-sm text-white/75",
							children: [
								/* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									className: "text-white/85 underline-offset-4 hover:underline",
									children: pages["/"].breadcrumb
								}) }),
								/* @__PURE__ */ jsx("li", {
									"aria-hidden": "true",
									children: "/"
								}),
								/* @__PURE__ */ jsx("li", {
									"aria-current": "page",
									className: "font-semibold text-white",
									children: meta.breadcrumb
								})
							]
						})
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "section-title max-w-4xl text-[clamp(1.9rem,4.4vw,3.4rem)] text-white",
						children: meta.h1
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex max-w-3xl flex-col gap-3",
						children: meta.intro.map((p) => /* @__PURE__ */ jsx("p", {
							className: "prose-lead m-0 text-white/85",
							children: p
						}, p.slice(0, 24)))
					})
				]
			})]
		}),
		/* @__PURE__ */ jsx(Body, {}),
		/* @__PURE__ */ jsx(Register, {})
	] });
}
export { Topic as default };
