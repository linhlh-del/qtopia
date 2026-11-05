import { f as useContactPopup, p as track, s as Container } from "../entry-server.js";
import { t as Icon } from "./Icons-CdsUf0hk.js";
import { a as Img } from "./content-DBX5_AOn.js";
import { t as MediaFrame } from "./MediaFrame-BgeqE8_C.js";
import { _ as unitTypeInfo, g as unitLayoutImages, n as useReveal, t as SectionHeading } from "./SectionHeading-Ds9AHdb5.js";
import { t as useNearViewport } from "./useNearViewport-DtmBKF_h.js";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/data/qtopiaFloorPlan.js
var FLOOR_VIEWBOX_W = 1279;
var top = [
	[
		"32",
		"mira-1pn",
		"41,67",
		"47,44",
		"92.5,52 158.5,55 159.5,189 73.5,190 74.5,112 92.5,111"
	],
	[
		"33",
		"ama-studio",
		"25,68",
		"28,88",
		"159.5,53 207.5,54 208.5,190 162.5,189"
	],
	[
		"34",
		"ama-studio",
		"25,68",
		"28,88",
		"209.5,55 254.5,55 253.5,189 209.5,189"
	],
	[
		"35",
		"ama-studio",
		"25,68",
		"28,69",
		"257.5,55 303.5,55 304.5,189 257.5,189"
	],
	[
		"36",
		"ama-studio",
		"25,39",
		"28,60",
		"304.5,54 350.5,56 352.5,188 306.5,190"
	],
	[
		"37",
		"ama-studio",
		"25,42",
		"28,65",
		"395.5,55 441.5,55 442.5,188 394.5,189"
	],
	[
		"38",
		"ama-studio",
		"25,37",
		"29,33",
		"447.5,54 490.5,54 491.5,190 445.5,190"
	],
	[
		"01",
		"ama-studio",
		"25,76",
		"29,33",
		"610.5,54 656.5,55 657.5,188 610.5,188"
	],
	[
		"02",
		"ama-studio",
		"25,68",
		"28,88",
		"658.5,54 704.5,54 704.5,189 658.5,189"
	],
	[
		"03",
		"ama-studio",
		"25,68",
		"28,88",
		"706.5,54 753.5,55 753.5,188 707.5,188"
	],
	[
		"04",
		"ama-studio",
		"25,68",
		"28,88",
		"755.5,54 800.5,54 801.5,188 755.5,188"
	],
	[
		"05",
		"ama-studio",
		"25,68",
		"28,88",
		"803.5,53 848.5,55 848.5,188 803.5,188"
	],
	[
		"06",
		"ama-studio",
		"25,68",
		"28,88",
		"850.5,54 896.5,53 897.5,190 850.5,189"
	],
	[
		"07",
		"ama-studio",
		"25,48",
		"28,69",
		"899.5,54 945.5,53 946.5,190 900.5,189"
	],
	[
		"08",
		"ama-studio",
		"25,48",
		"28,69",
		"947.5,54 992.5,55 993.5,188 948.5,188"
	],
	[
		"09",
		"ama-studio",
		"25,68",
		"28,88",
		"995.5,54 1041.5,55 1042.5,190 994.5,188"
	],
	[
		"10",
		"ama-studio",
		"25,68",
		"28,88",
		"1042.5,53 1089.5,54 1089.5,189 1043.5,189"
	],
	[
		"11",
		"vita-2pn",
		"63,09",
		"69,68",
		"1091.5,53 1190.5,53 1190.5,111 1212.5,112 1213.5,190 1090.5,187"
	]
];
var bottom = [
	[
		"31",
		"mira-1pn",
		"41,67",
		"47,44",
		"73.5,215 157.5,215 157.5,351 95.5,351 96.5,290 76.5,290"
	],
	[
		"30",
		"ama-studio",
		"25,62",
		"28,88",
		"160.5,215 207.5,215 207.5,350 160.5,350"
	],
	[
		"29",
		"ama-studio",
		"25,62",
		"28,88",
		"208.5,216 253.5,215 255.5,350 209.5,349"
	],
	[
		"28",
		"ama-studio",
		"25,62",
		"28,88",
		"256.5,216 303.5,215 301.5,351 257.5,351"
	],
	[
		"27",
		"ama-studio",
		"25,62",
		"28,88",
		"304.5,216 349.5,216 351.5,350 304.5,350"
	],
	[
		"26",
		"ama-studio",
		"25,62",
		"28,88",
		"351.5,216 398.5,215 399.5,350 352.5,351"
	],
	[
		"25",
		"ama-studio",
		"25,62",
		"28,88",
		"399.5,216 444.5,216 445.5,352 400.5,351"
	],
	[
		"24",
		"ama-studio",
		"25,43",
		"28,88",
		"446.5,215 494.5,215 493.5,351 448.5,351"
	],
	[
		"23",
		"ama-studio",
		"25,76",
		"28,88",
		"496.5,216 542.5,215 541.5,351 495.5,352"
	],
	[
		"22",
		"ama-studio",
		"25,48",
		"28,88",
		"544.5,214 589.5,214 589.5,350 543.5,350"
	],
	[
		"21",
		"ama-studio",
		"25,68",
		"28,88",
		"592.5,215 637.5,214 637.5,349 592.5,350"
	],
	[
		"20",
		"ama-studio",
		"25,68",
		"28,88",
		"639.5,214 685.5,214 687.5,349 639.5,350"
	],
	[
		"19",
		"ama-studio",
		"25,68",
		"28,88",
		"688.5,216 734.5,214 733.5,349 688.5,349"
	],
	[
		"18",
		"ama-studio",
		"25,68",
		"28,88",
		"734.5,215 782.5,216 783.5,350 736.5,351"
	],
	[
		"17",
		"ama-studio",
		"25,68",
		"28,88",
		"784.5,217 831.5,215 829.5,349 784.5,350"
	],
	[
		"16",
		"ama-studio",
		"30,05",
		"33,47",
		"833.5,215 898.5,215 899.5,349 832.5,350"
	],
	[
		"15",
		"ama-studio",
		"25,25",
		"28,79",
		"945.5,216 992.5,216 993.5,350 947.5,350"
	],
	[
		"14",
		"ama-studio",
		"25,62",
		"28,88",
		"994.5,214 1040.5,215 1040.5,351 995.5,351"
	],
	[
		"13",
		"ama-studio",
		"25,62",
		"28,88",
		"1042.5,215 1088.5,214 1087.5,350 1042.5,350"
	],
	[
		"12",
		"vita-2pn",
		"63,09",
		"69,68",
		"1090.5,215 1213.5,214 1213.5,293 1191.5,293 1191.5,350 1090.5,349"
	]
];
var centerX = (points) => {
	const xs = points.split(" ").map((point) => Number(point.split(",")[0]));
	return (Math.min(...xs) + Math.max(...xs)) / 2;
};
var zoneColor = {
	"ama-studio": "#fbbd83",
	"mira-1pn": "#e1ebaf",
	"vita-2pn": "#b6e3f1"
};
var labelColor = {
	"ama-studio": "#a44d18",
	"mira-1pn": "#60751e",
	"vita-2pn": "#21677e"
};
// src/sections/Residences.jsx
var tower = {
	id: "q5-q6",
	label: "Tháp Q5 & Q6",
	floorRange: "Tầng điển hình",
	image: "/images/mat-bangq5-q6.webp",
	imageWidth: FLOOR_VIEWBOX_W,
	imageHeight: 404,
	units: [...top.map(([code, type, usableArea, grossArea, points]) => ({
		code,
		type,
		usableArea,
		grossArea,
		points,
		color: zoneColor[type],
		labelColor: labelColor[type],
		labelX: centerX(points),
		labelY: 27
	})), ...bottom.map(([code, type, usableArea, grossArea, points]) => ({
		code,
		type,
		usableArea,
		grossArea,
		points,
		color: code === "28" ? "#fabc83" : zoneColor[type],
		labelColor: labelColor[type],
		labelX: centerX(points),
		labelY: 377
	}))]
};
var unitsByCode = Object.fromEntries(tower.units.map((unit) => [unit.code, unit]));
var legend = [...new Set(tower.units.map((unit) => unit.type))].map((type) => unitTypeInfo[type]);
var q7Types = Object.entries(unitLayoutImages.q7).map(([id, layout]) => ({
	...unitTypeInfo[id],
	...layout
}));
function Residences({ showTopicLink = true }) {
	const ref = useReveal();
	const [planRef, planVisible] = useNearViewport("300px");
	const popup = useContactPopup();
	const [activeCode, setActiveCode] = useState(null);
	const [pinned, setPinned] = useState(false);
	const [fullscreen, setFullscreen] = useState(false);
	const [zoom, setZoom] = useState(1);
	const suppressHover = useRef(false);
	const activeUnit = activeCode ? unitsByCode[activeCode] : null;
	const activeType = activeUnit ? unitTypeInfo[activeUnit.type] : null;
	const activeLayout = activeUnit ? unitLayoutImages[tower.id]?.[activeUnit.type] : null;
	const clear = () => {
		setActiveCode(null);
		setPinned(false);
	};
	const hoverUnit = (code) => {
		if (!pinned && !suppressHover.current) setActiveCode(code);
	};
	const closePanel = () => {
		suppressHover.current = true;
		clear();
	};
	const selectUnit = (unit) => (event) => {
		event.stopPropagation();
		if (pinned && activeCode === unit.code) return clear();
		setActiveCode(unit.code);
		setPinned(true);
		track("view_floorplan", {
			tower: tower.id,
			unit_code: unit.code,
			unit_type: unit.type
		});
	};
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
	useEffect(() => {
		if (!pinned) return void 0;
		const onDoc = (event) => {
			if (!event.target.closest?.("[data-floor-plan]")) clear();
		};
		const onKey = (event) => {
			if (event.key === "Escape") clear();
		};
		document.addEventListener("click", onDoc);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("click", onDoc);
			document.removeEventListener("keydown", onKey);
		};
	}, [pinned]);
	return /* @__PURE__ */ jsx("section", {
		id: "mat-bang",
		"data-snap-section": true,
		className: "section-screen bg-q-cream",
		children: /* @__PURE__ */ jsxs(Container, { children: [
			/* @__PURE__ */ jsx("div", {
				ref,
				children: /* @__PURE__ */ jsx(SectionHeading, {
					label: "Mặt bằng căn hộ Q5 & Q6",
					lead: `${tower.floorRange} · ${tower.units.length} căn trên sơ đồ · ${legend.length} loại căn`
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-4 flex flex-wrap justify-center gap-3",
				children: legend.map((type) => /* @__PURE__ */ jsxs("span", {
					className: "inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-q-navy shadow-soft [@media(max-height:740px)]:py-1",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "h-3 w-3 rounded-full",
							style: { background: tower.units.find((unit) => unit.type === type.id).color }
						}),
						type.name,
						" · ",
						type.subtitle
					]
				}, type.id))
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-4 text-center text-sm text-q-muted lg:hidden [@media(max-height:740px)]:mt-2",
				children: "Chạm “Phóng to” để xem toàn sơ đồ, hoặc vuốt ngang và chạm vào căn để xem chi tiết."
			}),
			/* @__PURE__ */ jsxs("div", {
				ref: planRef,
				"data-floor-plan": true,
				className: fullscreen ? "fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-q-navy" : "relative mt-4 overflow-hidden rounded-[1.5rem] bg-white shadow-card sm:h-[min(540px,44svh)] xl:h-[min(600px,50svh)]",
				onMouseLeave: () => {
					suppressHover.current = false;
					if (!pinned) setActiveCode(null);
				},
				children: [
					/* @__PURE__ */ jsx("div", {
						className: fullscreen ? "flex h-full w-full overflow-auto" : "overflow-x-auto sm:flex sm:h-full sm:items-center",
						style: fullscreen ? {
							justifyContent: "safe center",
							alignItems: "safe center"
						} : void 0,
						children: /* @__PURE__ */ jsxs("div", {
							className: fullscreen ? "floorplan-fullscreen relative shrink-0" : "relative w-full min-w-[min(1000px,calc(38svh*3.165))] lg:min-w-0",
							style: fullscreen ? {
								"--fp-ar": tower.imageWidth / tower.imageHeight,
								"--fp-zoom": zoom
							} : void 0,
							children: [
								/* @__PURE__ */ jsx(MediaFrame, {
									src: tower.image,
									alt: `Mặt bằng tầng điển hình ${tower.label} dự án QTOPIA`,
									ratio: `${tower.imageWidth} / ${tower.imageHeight}`,
									imgClassName: "h-full w-full object-fill"
								}),
								planVisible ? /* @__PURE__ */ jsxs("svg", {
									className: "absolute inset-0 h-full w-full",
									viewBox: `0 0 ${FLOOR_VIEWBOX_W} 404`,
									preserveAspectRatio: "none",
									"aria-label": `Sơ đồ tương tác ${tower.label}, chọn mã căn để xem diện tích`,
									children: [
										tower.units.map((unit) => {
											const top = unit.labelY < 100;
											return /* @__PURE__ */ jsx("line", {
												x1: unit.labelX,
												x2: unit.labelX,
												y1: top ? unit.labelY + 10 : 351,
												y2: top ? 53 : unit.labelY - 10,
												stroke: unit.labelColor,
												strokeWidth: "1.5",
												opacity: ".65",
												pointerEvents: "none"
											}, `leader-${unit.code}`);
										}),
										tower.units.map((unit) => {
											const isActive = activeCode === unit.code;
											return /* @__PURE__ */ jsx("polygon", {
												points: unit.points,
												role: "button",
												tabIndex: 0,
												"aria-label": `Căn ${unit.code} — ${unitTypeInfo[unit.type].name} ${unitTypeInfo[unit.type].subtitle}, diện tích sử dụng ${unit.usableArea} mét vuông`,
												onMouseEnter: () => hoverUnit(unit.code),
												onFocus: () => hoverUnit(unit.code),
												onClick: selectUnit(unit),
												onKeyDown: (event) => {
													if (event.key === "Enter" || event.key === " ") {
														event.preventDefault();
														selectUnit(unit)(event);
													}
												},
												className: "cursor-pointer outline-none transition-[fill-opacity,opacity,filter] duration-300",
												style: {
													fill: unit.color,
													fillOpacity: isActive ? .55 : .28,
													stroke: unit.color,
													strokeWidth: isActive ? 3 : 2.5,
													strokeDasharray: isActive ? void 0 : "10 6",
													strokeLinejoin: "round",
													vectorEffect: "non-scaling-stroke",
													opacity: activeCode && !isActive ? .45 : 1,
													filter: isActive ? `drop-shadow(0 0 5px ${unit.color})` : void 0
												},
												children: /* @__PURE__ */ jsx("title", { children: unit.code })
											}, unit.code);
										}),
										tower.units.map((unit, i) => /* @__PURE__ */ jsx("polygon", {
											points: unit.points,
											pathLength: "100",
											pointerEvents: "none",
											className: "amenity-zone-runner " + (activeCode === unit.code ? "amenity-zone-runner-active" : ""),
											style: {
												color: unit.labelColor,
												fill: "none",
												stroke: "currentColor",
												strokeWidth: 4,
												strokeLinecap: "round",
												strokeLinejoin: "round",
												strokeDasharray: "6 94",
												vectorEffect: "non-scaling-stroke",
												animationDuration: `${5 + i % 3}s`,
												animationDelay: `${-(i * .7)}s`,
												opacity: activeCode && activeCode !== unit.code ? .6 : 1
											}
										}, `runner-${unit.code}`))
									]
								}) : null,
								planVisible ? tower.units.map((unit) => {
									const isActive = activeCode === unit.code;
									return /* @__PURE__ */ jsx("button", {
										type: "button",
										tabIndex: -1,
										"aria-hidden": "true",
										onMouseEnter: () => hoverUnit(unit.code),
										onClick: selectUnit(unit),
										style: {
											left: `${unit.labelX / FLOOR_VIEWBOX_W * 100}%`,
											top: `${unit.labelY / 404 * 100}%`,
											background: unit.labelColor
										},
										className: `absolute z-10 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-1.5 py-0.5 before:absolute before:-inset-x-1.5 before:-inset-y-2.5 before:content-[''] font-display text-[length:calc(10px*var(--type-scale))] font-bold leading-none text-white shadow-sm transition-transform sm:text-xs ${isActive ? "scale-125 ring-2 ring-white" : "hover:scale-110"}`,
										children: unit.code
									}, `label-${unit.code}`);
								}) : null
							]
						})
					}),
					activeUnit ? /* @__PURE__ */ jsxs("aside", {
						onClick: (event) => event.stopPropagation(),
						className: `floorplan-drawer absolute inset-x-0 bottom-0 z-30 overflow-y-auto rounded-t-[1.5rem] bg-white/95 shadow-card backdrop-blur-xl sm:inset-y-0 sm:left-auto sm:right-0 sm:max-h-none sm:w-80 sm:rounded-l-[1.5rem] sm:rounded-tr-none ${fullscreen ? "max-h-[48%]" : "max-h-[94%]"}`,
						children: [/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [activeLayout ? /* @__PURE__ */ jsx(MediaFrame, {
								src: activeLayout.image,
								alt: `Mặt bằng tham khảo loại ${activeType.name} ${activeType.subtitle} tại ${tower.label}`,
								ratio: "16 / 9",
								className: "h-28 w-full sm:h-44",
								imgClassName: "h-full w-full object-contain"
							}) : null, /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: closePanel,
								"aria-label": "Đóng thông tin căn hộ",
								className: "absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-q-navy/80 text-xl text-white hover:bg-q-navy",
								children: "×"
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-3 p-4 sm:p-5",
							children: [
								/* @__PURE__ */ jsxs("p", {
									className: "m-0 text-xs font-semibold uppercase tracking-wide",
									style: { color: activeUnit.labelColor },
									children: [
										tower.label,
										" · ",
										tower.floorRange
									]
								}),
								/* @__PURE__ */ jsxs("h3", {
									className: "m-0 font-display text-xl font-bold text-q-navy",
									children: [
										"Căn ",
										activeUnit.code,
										" · ",
										activeType.name,
										" ",
										activeType.subtitle
									]
								}),
								/* @__PURE__ */ jsxs("dl", {
									className: "grid grid-cols-2 gap-3 rounded-xl bg-q-sand/70 p-3 text-sm",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
										className: "text-q-muted",
										children: "Diện tích sử dụng"
									}), /* @__PURE__ */ jsxs("dd", {
										className: "m-0 font-bold text-q-navy",
										children: [activeUnit.usableArea, " m²"]
									})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
										className: "text-q-muted",
										children: "Diện tích tim tường"
									}), /* @__PURE__ */ jsxs("dd", {
										className: "m-0 font-bold text-q-navy",
										children: [activeUnit.grossArea, " m²"]
									})] })]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "m-0 text-xs text-q-muted",
									children: "Ảnh layout minh họa theo loại căn; diện tích lấy theo mã căn trên sơ đồ."
								}),
								/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: () => popup.open("mat-bang"),
									"data-cta-name": "floorplan_quote",
									className: "btn-base btn-primary w-full",
									children: ["Nhận báo giá căn ", activeUnit.code]
								})
							]
						})]
					}, activeUnit.code) : null,
					/* @__PURE__ */ jsxs("div", {
						className: "absolute right-3 top-3 z-40 flex items-center gap-2 max-lg:top-1/2 max-lg:-translate-y-1/2",
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
							"aria-label": fullscreen ? "Thu nhỏ sơ đồ mặt bằng" : "Phóng to sơ đồ mặt bằng",
							className: "inline-flex min-h-11 items-center rounded-full bg-q-navy/80 px-4 font-display text-sm font-semibold text-white backdrop-blur hover:bg-q-navy",
							children: fullscreen ? "Thu nhỏ" : "Phóng to"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "hint-hover mt-2 text-center text-xs text-q-muted",
				children: "Rê chuột hoặc chọn mã căn để xem layout và diện tích."
			}),
			showTopicLink ? /* @__PURE__ */ jsx("div", {
				className: "mt-3 flex justify-center",
				children: /* @__PURE__ */ jsxs(Link, {
					to: "/mat-bang",
					title: "Mặt bằng tầng điển hình và các loại căn hộ QTOPIA",
					"data-cta-name": "floorplan_detail",
					"data-cta-location": "mat-bang",
					className: "btn-base btn-dark cta-fx no-underline",
					children: ["Xem mặt bằng chi tiết", /* @__PURE__ */ jsx(Icon, {
						name: "arrow",
						size: 18
					})]
				})
			}) : null,
			!showTopicLink ? /* @__PURE__ */ jsxs("div", {
				className: "mt-12",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					label: "Loại căn tại tháp Q7",
					lead: "Brochure Q7 giới thiệu thêm dòng ARIA 3PN, bên cạnh AMA Studio, MIRA 1PN+ và VITA 2PN. Diện tích dưới đây là khoảng theo loại căn, không thay thế thông số từng mã căn."
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
					children: q7Types.map((type) => /* @__PURE__ */ jsxs("article", {
						className: "overflow-hidden rounded-2xl bg-white shadow-soft",
						children: [/* @__PURE__ */ jsx("div", {
							className: "aspect-[4/3] bg-q-sand/50 p-3",
							children: /* @__PURE__ */ jsx(Img, {
								src: type.image,
								alt: `Mặt bằng tham khảo căn ${type.name} ${type.subtitle} tháp Q7`,
								className: "h-full w-full object-contain"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "p-4",
							children: [/* @__PURE__ */ jsxs("h3", {
								className: "m-0 font-display text-lg font-bold text-q-navy",
								children: [
									type.name,
									" · ",
									type.subtitle
								]
							}), /* @__PURE__ */ jsx("p", {
								className: "mb-0 mt-2 text-sm text-q-muted",
								children: type.area
							})]
						})]
					}, type.id))
				})]
			}) : null
		] })
	});
}
export { Residences as default };
