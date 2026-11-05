import { t as Img } from "./Img-Bk2iwTwh.js";
import { r as Container } from "../entry-server.js";
import { d as masterPlan, n as useReveal, t as SectionHeading } from "./SectionHeading-DeHVt1iA.js";
import { t as useNearViewport } from "./useNearViewport-DtmBKF_h.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/data/amenity-label-positions.js
var amenityLabelPositions = {
	1: [{
		top: "60.1%",
		left: "61.6%"
	}],
	2: [{
		top: "65.9%",
		left: "53.5%"
	}],
	3: [{
		top: "64.9%",
		left: "51.4%"
	}],
	4: [{
		top: "55.3%",
		left: "53.6%"
	}],
	5: [{
		top: "58.4%",
		left: "56.9%"
	}],
	6: [{
		top: "35.5%",
		left: "51.5%"
	}],
	7: [{
		top: "59.4%",
		left: "43.9%"
	}],
	8: [{
		top: "63.6%",
		left: "41.9%"
	}],
	9: [{
		top: "59.1%",
		left: "40.1%"
	}],
	10: [{
		top: "61.9%",
		left: "38.3%"
	}],
	11: [{
		top: "60.0%",
		left: "36.4%"
	}],
	12: [{
		top: "56.2%",
		left: "37.3%"
	}],
	13: [{
		top: "53.9%",
		left: "33.3%"
	}],
	14: [{
		top: "55.7%",
		left: "35.4%"
	}],
	15: [{
		top: "62.3%",
		left: "34.3%"
	}],
	16: [{
		top: "59.2%",
		left: "31.7%"
	}],
	17: [{
		top: "56.0%",
		left: "31.2%"
	}],
	18: [{
		top: "66.5%",
		left: "38.8%"
	}],
	19: [
		{
			top: "50.2%",
			left: "29.4%"
		},
		{
			top: "53.1%",
			left: "40.4%"
		},
		{
			top: "70.5%",
			left: "36.2%"
		}
	],
	20: [
		{
			top: "21.3%",
			left: "10.6%"
		},
		{
			top: "26.2%",
			left: "14.1%"
		},
		{
			top: "27.8%",
			left: "19.7%"
		},
		{
			top: "33.3%",
			left: "28.3%"
		},
		{
			top: "44.3%",
			left: "26.1%"
		}
	],
	21: [{
		top: "36.5%",
		left: "24.0%"
	}],
	22: [{
		top: "34.2%",
		left: "25.9%"
	}],
	23: [{
		top: "30.6%",
		left: "22.4%"
	}],
	24: [{
		top: "30.4%",
		left: "18.1%"
	}],
	25: [{
		top: "27.1%",
		left: "15.9%"
	}],
	26: [{
		top: "16.2%",
		left: "21.8%"
	}, {
		top: "20.7%",
		left: "13.3%"
	}],
	27: [{
		top: "20.1%",
		left: "28.9%"
	}],
	28: [{
		top: "23.1%",
		left: "32.3%"
	}],
	29: [{
		top: "17.3%",
		left: "33.6%"
	}]
};
// src/sections/MasterPlan.jsx
var zones = [
	{
		id: "10",
		name: "Oasis Resort",
		color: "#a4d93b",
		path: "M61.4 154L62.4 144L74.4 134L110.4 128L195.4 122L222.4 121L242.4 121L250.4 124L273.4 148L305.4 169L367.4 195L417.4 204L436.4 194L468.4 160L519.4 138L542.4 126L555.4 126L563.4 134L564.4 146L560.4 164L553.4 184L542.4 221L532.4 245L525.4 271L512.4 302L502.4 325L489.4 346L479.4 365L476.4 380L475.4 391L476.4 402L476.4 415L475.4 430L469.4 444L452.4 456L426.4 468L416.4 479L406.4 484L311.4 403L215.4 322L108.4 232L84.4 213L73.4 202L65.4 192L61.4 179L59.4 170L58.4 166Z"
	},
	{
		id: "11",
		name: "Ocean Galaxy",
		color: "#ff4f91",
		path: "M448.4 598L426.4 489L426.4 479L441.4 467L481.4 446L485.4 436L489.4 423L504.4 417L522.4 417L545.4 418L575.4 423L607.4 424L638.4 430L663.4 433L695.4 437L725.4 440L753.4 447L765.4 455L775.4 462L778.4 481L778.4 499L777.4 523L774.4 554L777.4 590L774.4 610L774.4 629L773.4 649L769.4 661L751.4 682L733.4 691L691.4 702L661.4 711L636.4 722L602.4 727L588.4 727L578.4 725L556.4 719L521.4 696L484.4 670L474.4 662L462.4 643L453.4 631Z"
	},
	{
		id: "12",
		name: "Quậy Station",
		color: "#25b9ff",
		path: "M827.4 244L962.4 247L993.4 251L1017.4 258L1020.4 275L1020.4 296L1024.4 324L1030.4 361L1018.4 405L1015.4 443L1021.4 479L1032.4 514L1038.4 544L1038.4 584L1028.4 626L1012.4 645L964.4 656L911.4 658L873.4 658L841.4 659L832.4 660Z"
	}
];
var sourceIdByZone = {
	10: "oasis-resort",
	11: "ocean-galaxy",
	12: "quay-station"
};
var runnerColors = {
	10: "#4f7709",
	11: "#b51258",
	12: "#006baf"
};
var amenitiesByZone = Object.fromEntries(zones.map((zone) => [zone.id, masterPlan.zones.find((item) => item.id === sourceIdByZone[zone.id])?.markers || []]));
var amenityByNumber = Object.fromEntries(zones.flatMap((zone) => amenitiesByZone[zone.id].map((amenity) => [amenity.n, {
	...amenity,
	zone
}])));
function AmenityDetail({ n, onClose, inline = false }) {
	const amenity = amenityByNumber[n];
	if (!amenity) return null;
	const { zone } = amenity;
	const index = amenitiesByZone[zone.id].findIndex((item) => item.n === n);
	return /* @__PURE__ */ jsx("aside", {
		role: "dialog",
		"aria-label": `Chi tiết tiện ích ${amenity.name}`,
		className: inline ? "amenity-detail-inline mt-2 rounded-2xl border-l-4 bg-white shadow-soft sm:hidden" : "floorplan-drawer absolute bottom-3 right-3 z-30 hidden max-h-[80%] w-72 overflow-y-auto rounded-[1.5rem] border-l-4 bg-white/95 shadow-card backdrop-blur-xl sm:block lg:hidden",
		style: { borderColor: zone.color },
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 " + (inline ? "p-2.5" : "items-start p-4"),
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "grid shrink-0 place-items-center rounded-full font-display font-bold text-white " + (inline ? "size-8 text-sm" : "size-10 text-base"),
					style: { background: runnerColors[zone.id] },
					children: n
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "m-0 font-display text-[0.65rem] font-bold uppercase tracking-widest",
							style: { color: zone.color },
							children: zone.name
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "m-0 font-display font-bold leading-tight text-q-navy " + (inline ? "text-[0.95rem]" : "text-lg"),
							children: amenity.name
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "m-0 mt-0.5 text-xs text-q-muted",
							children: [
								"Tiện ích ",
								index + 1,
								"/",
								amenitiesByZone[zone.id].length,
								" của khu ",
								zone.name
							]
						})
					]
				}),
				/* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onClose,
					"aria-label": "Đóng thông tin tiện ích",
					className: "grid size-9 shrink-0 place-items-center rounded-full bg-q-navy/80 text-xl leading-none text-white hover:bg-q-navy",
					children: "×"
				})
			]
		})
	}, n);
}
function AmenityPanel({ expanded, setExpanded, selected, setSelected, setSelectedZone, className = "" }) {
	return /* @__PURE__ */ jsxs("aside", {
		className: "flex flex-col overflow-y-auto p-3 sm:p-4 " + className,
		"aria-label": "Danh sách tiện ích theo khu",
		children: [/* @__PURE__ */ jsx("p", {
			className: "mb-3 font-display text-xs font-bold uppercase tracking-widest text-q-muted",
			children: "3 khu trải nghiệm"
		}), /* @__PURE__ */ jsx("div", {
			className: "flex flex-col gap-2",
			children: zones.map((zone) => {
				const open = expanded === zone.id;
				return /* @__PURE__ */ jsxs("div", {
					className: "overflow-hidden rounded-2xl border border-q-navy/10 bg-white/90",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => {
							setExpanded(open ? null : zone.id);
							setSelectedZone(open ? null : zone.id);
						},
						"aria-expanded": open,
						"aria-controls": "amenities-" + zone.id,
						className: "flex min-h-12 w-full items-center gap-2 px-3 text-left font-display text-sm font-bold text-q-navy sm:px-4",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "size-3 shrink-0 rounded-full",
								style: { background: runnerColors[zone.id] }
							}),
							/* @__PURE__ */ jsx("span", {
								className: "flex-1",
								children: zone.name
							}),
							/* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: "text-lg transition-transform " + (open ? "rotate-180" : ""),
								children: "⌄"
							})
						]
					}), open ? /* @__PURE__ */ jsx("div", {
						id: "amenities-" + zone.id,
						className: "grid gap-1 border-t border-q-navy/10 p-2",
						children: amenitiesByZone[zone.id].map((amenity) => /* @__PURE__ */ jsxs("button", {
							type: "button",
							onClick: () => {
								setSelected(amenity.n);
								setSelectedZone(zone.id);
							},
							"aria-pressed": selected === amenity.n,
							className: "flex min-h-11 items-center gap-2 rounded-xl px-2 text-left text-xs leading-snug transition-colors sm:text-sm " + (selected === amenity.n ? "bg-q-navy text-white" : "text-q-ink hover:bg-q-cream"),
							children: [/* @__PURE__ */ jsx("span", {
								className: "grid size-6 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-white",
								style: { background: runnerColors[zone.id] },
								children: amenity.n
							}), amenity.name]
						}, amenity.n))
					}) : null]
				}, zone.id);
			})
		})]
	});
}
function MasterPlan() {
	const ref = useReveal();
	const [mapRef, mapVisible] = useNearViewport("300px");
	const [expanded, setExpanded] = useState(null);
	const [selected, setSelected] = useState(null);
	const [hoveredZone, setHoveredZone] = useState(null);
	const [selectedZone, setSelectedZone] = useState(null);
	const [fullscreen, setFullscreen] = useState(false);
	const [zoom, setZoom] = useState(1);
	useEffect(() => {
		if (!fullscreen) {
			setZoom(1);
			return;
		}
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (event) => event.key === "Escape" && setFullscreen(false);
		document.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = previousOverflow;
			document.removeEventListener("keydown", onKey);
		};
	}, [fullscreen]);
	const showZone = (id) => setExpanded(id);
	const panelProps = {
		expanded,
		setExpanded,
		selected,
		setSelected,
		setSelectedZone
	};
	const highlightedZone = hoveredZone || selectedZone;
	return /* @__PURE__ */ jsx("section", {
		id: "tien-ich",
		"data-snap-section": true,
		className: "section-screen bg-q-cream",
		children: /* @__PURE__ */ jsxs(Container, { children: [/* @__PURE__ */ jsx("div", {
			ref,
			children: /* @__PURE__ */ jsx(SectionHeading, {
				label: "Ba khu trải nghiệm tại QTOPIA",
				lead: "Quậy Station mở ra phía biển, Ocean Galaxy mang nhịp vui sôi động, còn Oasis Resort dành cho những khoảng nghỉ và vận động."
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: fullscreen ? "fixed inset-0 z-[100] flex flex-col justify-center gap-3 overflow-auto bg-q-navy p-3" : "relative mt-5 w-full rounded-[2rem] bg-white p-2 shadow-card sm:p-3 lg:flex",
			style: fullscreen ? { alignItems: "safe center" } : void 0,
			children: [
				/* @__PURE__ */ jsxs("div", {
					ref: mapRef,
					className: "relative mx-auto w-full shrink-0 overflow-hidden " + (fullscreen ? "amenity-map-full aspect-[1672/941] rounded-xl" : "aspect-[1120/941] max-w-[calc((100svh-var(--header-h)-16rem)*1.19)] rounded-[1.6rem] sm:max-w-[calc((100svh-var(--header-h)-13rem)*1.19)] lg:mx-0 lg:aspect-[1672/941] lg:w-[min(calc(100%-19rem),calc((100svh-var(--header-h)-9rem)*1.777))] lg:max-w-none lg:rounded-r-none"),
					style: fullscreen ? {
						width: `${zoom * 100}%`,
						maxWidth: zoom > 1 ? "none" : "178svh"
					} : void 0,
					children: [
						/* @__PURE__ */ jsx(Img, {
							src: masterPlan.image,
							alt: mapVisible ? "" : "Mặt bằng tiện ích QTOPIA với ba khu Oasis Resort, Ocean Galaxy và Quậy Station",
							sizes: fullscreen ? "100vw" : "(min-width: 1024px) 60vw, 135vw",
							className: "absolute inset-y-0 left-0 h-full max-w-none " + (fullscreen ? "w-full" : "w-[149.2857%] lg:w-full")
						}),
						mapVisible ? /* @__PURE__ */ jsx("svg", {
							className: "absolute inset-y-0 left-0 h-full " + (fullscreen ? "w-full" : "w-[149.2857%] lg:w-full"),
							viewBox: "0 0 1672 941",
							preserveAspectRatio: "xMidYMid meet",
							role: "img",
							"aria-label": "Mặt bằng tiện ích QTOPIA với ba khu Oasis Resort, Ocean Galaxy và Quậy Station",
							children: zones.map((zone) => /* @__PURE__ */ jsxs("g", {
								className: "amenity-zone",
								style: {
									color: zone.color,
									opacity: expanded && expanded !== zone.id ? .55 : 1
								},
								children: [
									/* @__PURE__ */ jsx("path", {
										d: zone.path,
										fill: "currentColor",
										fillOpacity: expanded === zone.id ? .07 : .035,
										stroke: "currentColor",
										strokeOpacity: "0.95",
										strokeWidth: "4.2",
										strokeLinejoin: "round",
										vectorEffect: "non-scaling-stroke"
									}),
									/* @__PURE__ */ jsx("path", {
										d: zone.path,
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "5",
										strokeLinecap: "round",
										strokeLinejoin: "round",
										strokeDasharray: "2 98",
										pathLength: "100",
										vectorEffect: "non-scaling-stroke",
										className: "amenity-zone-runner " + (highlightedZone === zone.id ? "amenity-zone-runner-active" : ""),
										style: { color: highlightedZone === zone.id ? zone.color : runnerColors[zone.id] }
									}),
									/* @__PURE__ */ jsx("path", {
										d: zone.path,
										fill: "transparent",
										stroke: "transparent",
										strokeWidth: "18",
										onMouseEnter: () => {
											setHoveredZone(zone.id);
											showZone(zone.id);
										},
										onMouseLeave: () => setHoveredZone(null),
										onClick: () => {
											showZone(zone.id);
											setSelectedZone(zone.id);
										},
										className: "cursor-pointer"
									})
								]
							}, zone.id))
						}) : null,
						mapVisible ? zones.flatMap((zone) => amenitiesByZone[zone.id].flatMap((amenity) => {
							const positions = amenityLabelPositions[amenity.n] || [];
							const isSelected = selected === amenity.n;
							return positions.map((position, index) => /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => {
									showZone(zone.id);
									setSelected(amenity.n);
									setSelectedZone(zone.id);
								},
								"aria-label": `${amenity.n}. ${amenity.name}`,
								"aria-pressed": isSelected,
								className: "amenity-number absolute z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-display text-[0.7rem] font-bold text-white " + (isSelected ? "amenity-number-selected" : ""),
								style: {
									top: position.top,
									"--amenity-left-full": position.left,
									"--amenity-left-cropped": `${(parseFloat(position.left) * 1672 / 1120).toFixed(2)}%`,
									"--amenity-marker-color": runnerColors[zone.id]
								},
								children: /* @__PURE__ */ jsx("span", { children: amenity.n })
							}, `${amenity.n}-${index}`));
						})) : null,
						mapVisible && fullscreen ? /* @__PURE__ */ jsx(AmenityPanel, {
							...panelProps,
							className: "absolute bottom-3 right-3 top-16 z-20 hidden w-[34%] min-w-[17rem] rounded-2xl border border-white/60 bg-white/92 shadow-card backdrop-blur-xl lg:flex"
						}) : null,
						mapVisible && selected ? /* @__PURE__ */ jsx(AmenityDetail, {
							n: selected,
							onClose: () => setSelected(null)
						}) : null,
						/* @__PURE__ */ jsxs("div", {
							className: (fullscreen ? "fixed right-3 top-3" : "absolute right-2.5 top-2.5 sm:right-3 sm:top-3") + " z-40 flex items-center gap-2",
							children: [fullscreen ? /* @__PURE__ */ jsxs("div", {
								className: "flex items-center overflow-hidden rounded-full bg-q-navy/80 backdrop-blur",
								children: [
									/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setZoom((current) => Math.max(1, current - 1)),
										disabled: zoom === 1,
										"aria-label": "Thu nhỏ mức phóng",
										className: "grid size-11 place-items-center text-xl text-white disabled:opacity-40",
										children: "−"
									}),
									/* @__PURE__ */ jsxs("span", {
										"aria-live": "polite",
										className: "min-w-10 text-center font-display text-sm font-semibold text-white",
										children: [zoom, "x"]
									}),
									/* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => setZoom((current) => Math.min(4, current + 1)),
										disabled: zoom === 4,
										"aria-label": "Phóng to thêm",
										className: "grid size-11 place-items-center text-xl text-white disabled:opacity-40",
										children: "+"
									})
								]
							}) : null, /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setFullscreen((current) => !current),
								className: "inline-flex min-h-11 items-center rounded-full bg-q-navy/80 px-4 font-display text-sm font-semibold text-white backdrop-blur hover:bg-q-navy",
								children: fullscreen ? "Thu nhỏ" : "Phóng to"
							})]
						})
					]
				}),
				fullscreen ? null : /* @__PURE__ */ jsx("div", {
					className: "relative hidden min-w-[19rem] flex-1 lg:block",
					children: /* @__PURE__ */ jsx(AmenityPanel, {
						...panelProps,
						className: "absolute inset-0 rounded-r-[1.6rem] bg-q-cream"
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: (fullscreen ? "w-full shrink-0" : "mt-3") + " lg:hidden",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex gap-2",
							children: zones.map((zone) => {
								const active = expanded === zone.id;
								return /* @__PURE__ */ jsxs("button", {
									type: "button",
									"aria-pressed": active,
									onClick: () => {
										const next = active ? null : zone.id;
										setExpanded(next);
										setSelectedZone(next);
										setSelected(null);
									},
									className: "flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-full border px-2 text-center font-display text-[0.7rem] font-bold leading-tight transition-colors sm:text-sm " + (active ? "border-transparent text-white" : "border-q-navy/15 bg-white text-q-navy"),
									style: active ? { background: runnerColors[zone.id] } : void 0,
									children: [/* @__PURE__ */ jsx("span", {
										className: "size-2.5 shrink-0 rounded-full",
										style: { background: active ? "#fff" : zone.color }
									}), zone.name]
								}, zone.id);
							})
						}),
						selected ? /* @__PURE__ */ jsx(AmenityDetail, {
							inline: true,
							n: selected,
							onClose: () => setSelected(null)
						}) : null,
						/* @__PURE__ */ jsx("p", {
							className: "mb-0 mt-2 text-center text-xs " + (selected ? "max-sm:hidden " : "") + (fullscreen ? "text-white/70" : "text-q-muted"),
							children: "Chạm vào số trên mặt bằng để xem tên tiện ích."
						})
					]
				})
			]
		})] })
	});
}
export { MasterPlan as default };
