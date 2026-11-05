import { i as Facts, n as Legal, o as Story, pages, r as SalesPolicy, s as Container, t as Register } from "../entry-server.js";
import Location from "./Location-DdE9eg9-.js";
import MasterPlan from "./MasterPlan-B4bMApyn.js";
import FeaturedAmenities from "./FeaturedAmenities-cYcTHR3V.js";
import Residences from "./Residences-DpZEwQ0Z.js";
import { t as Icon } from "./Icons-CdsUf0hk.js";
import { a as Img } from "./content-DBX5_AOn.js";
import { f as nearbyContent, h as stories, n as useReveal, t as SectionHeading } from "./SectionHeading-Ds9AHdb5.js";
import { Link, useLocation } from "react-router-dom";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
// src/sections/NearbyPlaces.jsx
function NearbyPlaces() {
	const ref = useReveal();
	return /* @__PURE__ */ jsxs("section", {
		id: "tien-ich-xung-quanh",
		className: "section-screen relative overflow-hidden bg-q-navy text-white",
		children: [
			/* @__PURE__ */ jsx(Img, {
				src: "/images/renders/birdview.webp",
				alt: "",
				"aria-hidden": "true",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-q-navy/95 via-q-navy/85 to-q-navy/95" }),
			/* @__PURE__ */ jsx("div", {
				className: "orbit-bg",
				style: {
					"--orbit-x": "90%",
					"--orbit-y": "10%"
				}
			}),
			/* @__PURE__ */ jsxs(Container, {
				className: "relative z-10",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						label: nearbyContent.label,
						lead: nearbyContent.lead,
						light: true
					}),
					/* @__PURE__ */ jsx("div", {
						ref,
						className: "mt-6 grid gap-5 sm:mt-8 lg:grid-cols-2 lg:gap-8",
						children: nearbyContent.groups.map((g, gi) => /* @__PURE__ */ jsxs("div", {
							style: { "--i": gi },
							className: "stagger rounded-3xl border border-white/10 bg-q-navy-700/70 p-4 backdrop-blur-md sm:p-6",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "m-0 mb-4 flex items-center gap-2.5 font-display text-sm font-bold uppercase tracking-[0.12em] text-q-lime sm:text-base",
								children: [/* @__PURE__ */ jsx("span", {
									className: "grid size-9 place-items-center rounded-full bg-q-lime/10",
									children: /* @__PURE__ */ jsx(Icon, {
										name: g.icon,
										size: 18
									})
								}), g.title]
							}), /* @__PURE__ */ jsx("ul", {
								className: "m-0 flex list-none flex-col gap-2 p-0",
								children: g.items.map((it) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-center gap-4 rounded-2xl bg-white/5 px-4 py-3",
									children: [/* @__PURE__ */ jsx("span", {
										className: "flex w-16 shrink-0 flex-col items-center leading-none",
										children: it.minutes ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
											className: "font-display text-2xl font-extrabold",
											children: it.minutes
										}), /* @__PURE__ */ jsx("span", {
											className: "mt-1 text-[0.68rem] text-q-lime",
											children: "phút"
										})] }) : /* @__PURE__ */ jsx("span", {
											className: "grid size-9 place-items-center rounded-full border border-white/20 text-white/80",
											children: /* @__PURE__ */ jsx(Icon, {
												name: "pin",
												size: 16
											})
										})
									}), /* @__PURE__ */ jsxs("span", {
										className: "flex min-w-0 flex-col",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-display text-[0.95rem] font-semibold text-white",
											children: it.name
										}), /* @__PURE__ */ jsx("span", {
											className: "text-xs leading-snug text-white/70 sm:text-sm",
											children: it.note
										})]
									})]
								}, it.name))
							})]
						}, g.title))
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mb-0 mt-4 text-xs text-white/60",
						children: "Thời gian di chuyển là số liệu tham khảo theo brochure; thực tế phụ thuộc điểm xuất phát, tuyến đường và giao thông."
					})
				]
			})
		]
	});
}
// src/pages/Topic.jsx
var BODY = {
	"/tong-quan": () => /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Facts, { showTopicLink: false }),
		/* @__PURE__ */ jsx(Story, { data: stories[0] }),
		/* @__PURE__ */ jsx(Story, { data: stories[1] }),
		/* @__PURE__ */ jsx(Legal, {})
	] }),
	"/chinh-sach-ban-hang": () => /* @__PURE__ */ jsx(SalesPolicy, { showTopicLink: false }),
	"/tien-ich-xung-quanh": () => /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(NearbyPlaces, {}), /* @__PURE__ */ jsx(Location, { showTopicLink: false })] }),
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
						className: "section-title max-w-4xl text-[length:calc(clamp(1.9rem,4.4vw,3.4rem)*var(--type-scale))] text-white",
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
