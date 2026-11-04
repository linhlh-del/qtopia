import { useState } from "react";
import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import CountUp from "../components/ui/CountUp";
import Icon from "../components/ui/Icons";
import Img from "../components/ui/Img";
import SectionHeading from "../components/ui/SectionHeading";
import { locationContent } from "../data/project";
import { useReveal } from "../hooks/useReveal";

/* =========================================
   MAP ROUTES
   Chỉnh sửa name và description theo tên
   cao tốc / quốc lộ thực tế.
========================================= */

const mapRoutes = [
  {
    id: 1,
    name: "CT01 - CAO TỐC LONG THÀNH - DẦU GIÂY",
    description:
      "Cập nhật tên cao tốc hoặc quốc lộ tương ứng với tuyến đường này.",
    color: "#e984b5",
    width: 8,
    speed: "0.55s",
    points:
      "293.1,147.9 327.4,150 351.3,152.7 373.2,156.1 391.1,158.2 408.2,160.3 423.2,163.7 460.9,173.3 486.9,178.1 504.7,176.7 517.1,173.3 532.1,165.7 545.8,158.2 558.2,150 574.6,135.6 588.3,121.9 606.1,105.5 619.1,95.2 632.8,93.1 649.2,97.3 665.7,101.4 684.2,102 717.7,98.6 738.3,93.1 756.1,86.3 770.5,80.8 784.8,75.3 797.9,73.3 809.5,73.3 821.8,73.3 838.3,72.6 860.9,65.7 891,55.5 918.4,45.9 936.2,42.5 947.2,41.8 960.9,43.8 975.2,47.3 1004,54.8 1047.1,64.4 1077.3,70.5 1090.3,71.2 1119.1,74 1169.7,71.2 1228.6,69.9 1258.1,69.9 1291.6,74.6 1333.4,77.4 1382,80.1 1407.4,80.1 1426.6,80.1",
  },
  {
    id: 2,
    name: "CT29 - CAO TỐC BIÊN HÒA VŨNG TÀU",
    description:
      "Cập nhật tên cao tốc hoặc quốc lộ tương ứng với tuyến đường này.",
    color: "#e52894",
    width: 8,
    speed: "0.5s",
    points:
      "410.9,47.3 424.6,51.4 437.6,57.5 452,65.1 468.4,77.4 478.7,84.9 489,95.9 498.6,110.3 505.4,128.8 512.3,144.5 517.7,163 523.9,182.2 530.8,197.9 542.4,217.8 555.4,228.7 573.2,241.1 590.3,247.2 608.8,252 625.3,258.2 641.7,268.5 656.8,284.9 665.7,302 667.7,320.5 668.4,337.6 674.6,352 688.3,368.5 708.1,378 719.8,393.8 728.7,408.9",
  },
  {
    id: 3,
    name: "QL51 - QUỐC LỘ 51",
    description:
      "Cập nhật tên cao tốc hoặc quốc lộ tương ứng với tuyến đường này.",
    color: "#16b3c1",
    width: 7,
    speed: "0.6s",
    points:
      "594.5,608.8 613.6,586.9 634.2,569.1 649.2,554.7 665,542.4 681.4,525.3 686.2,515 691,504.1 692.4,485.6 692.4,475.3 691,469.8 686.9,462.3 679.4,458.2 658.1,455.4 640.3,454.1 629.4,450.6 617.7,445.2 604.7,437.6 590.3,421.2 580.8,407.5 573.2,397.9 565.7,378.7 566.4,360.2 563.6,336.3 561.6,320.5 559.5,302.7 552.7,283.5 542.4,266.4 530.1,247.2 520.5,232.9 508.2,219.8 495.1,206.1 486.2,193.1 477.3,178.1 471.9,163.7 466.4,147.9 461.6,131.5 454.1,108.9 446.5,96.6 443.1,83.6 436.9,76 427.3,69.2 419.1,59.6 410.9,44.5 407.5,32.9 403.4,20.5",
  },
];

const mapAdditionalLines = [
  {
    id: "green",
    name: "CAO TỐC BẾN LỨC - LONG THÀNH",
    description: "Tuyến màu xanh lá trên bản đồ.",
    color: "#2cec13",
    points:
      "21.2,258.9 46.6,273.3 65.7,283.5 77.4,289 89.7,292.4 102,289.7 125.3,289 152,287 182.2,285.6 208.2,285.6 223.3,282.8 231.5,282.8 242.4,284.9 253.4,287 269.1,289.7 285.6,295.2 297.2,296.5 315,302 321.2,303.4 328.7,302.7 337.6,298.6 345.2,294.5 354.1,291.8 367.1,286.3 381.5,277.4 387.6,275.3 408.2,279.4 432.1,283.5 460.2,286.3 495.8,288.3 522.5,287 539.7,285.6 553.4,278.7 561.6,266.4 569.1,255.5 574.6,241.8",
  },
  {
    id: "red",
    name: "CAO TỐC HỒ TRÀM LONG THÀNH",
    description: "Tuyến màu đỏ trên bản đồ.",
    color: "#f51919",
    points:
      "665.7,293.1 686.2,298.6 702.7,302 717,305.4 733.5,308.9 749.2,310.2 756.1,312.3 769.1,319.8 790.3,328 816.3,339 836.9,351.3 861.5,363.7 895.1,378.7 918.4,387.6 936.9,395.9 952.6,403.4 973.2,419.1 985.5,432.8 998.5,455.4",
  },
];

const legendRoutes = [...mapRoutes, ...mapAdditionalLines];

/* =========================================
   MAP CHECK-IN LOCATIONS
========================================= */

const mapLocations = [
  { id: 1, name: "Qtopia", x: 53.8, y: 80 },
  { id: 2, name: "Hồ Tràm", x: 72, y: 53.5 },
  { id: 3, name: "Bà Rịa", x: 53.2, y: 62.6 },
  { id: 4, name: "Vũng Tàu", x: 41.3, y: 89.8 },
  { id: 5, name: "Cần Giờ", x: 29.4, y: 79 },
  { id: 6, name: "Biên Hòa", x: 38.4, y: 12.7 },
  {
    id: 7,
    name: "Sân bay Quốc tế Long Thành",
    x: 44,
    y: 28.2,
  },
  {
    id: 8,
    name: "Cảng Cái Mép Thị Vải",
    x: 33.7,
    y: 69.9,
  },
];

/* =========================================
   CHECK-IN ICON
========================================= */

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 lg:h-5 lg:w-5"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

/* =========================================
   INTERACTIVE MAP
========================================= */

function LocationMap() {
  const [active, setActive] = useState(null);
  const [activeRoute, setActiveRoute] = useState(null);
  const toggleRoute = (id) => setActiveRoute((current) => current === id ? null : id);
  const onRouteKeyDown = (event, id) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleRoute(id);
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-center gap-3 lg:justify-start">
      <div className="relative isolate aspect-[1456/683] w-full overflow-hidden rounded-[12px] bg-white ring-1 ring-white/10">
        {/* ANIMATION STYLES */}
        <style>{`
        @keyframes qtopia-route-flow {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: -24;
          }
        }

        @keyframes qtopia-additional-line-flow {
          to { stroke-dashoffset: -42; }
        }

        .qtopia-additional-line {
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 24 9 0 9;
          animation: qtopia-additional-line-flow 1.2s linear infinite;
        }

        @keyframes qtopia-marker-pulse {
          0% {
            transform: scale(.8);
            opacity: .8;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }

        .qtopia-route {
          fill: none;
          stroke-dasharray: 5 9;
          stroke-linecap: round;
          stroke-linejoin: round;
          animation: qtopia-route-flow var(--route-speed) linear infinite;
        }

        .qtopia-route-center {
          fill: none;
          stroke: #ffffff;
          stroke-width: 2.5;
          stroke-dasharray: 3 11;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .qtopia-pulse {
          animation: qtopia-marker-pulse 1.8s ease-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .qtopia-route,
          .qtopia-route-center,
          .qtopia-additional-line,
          .qtopia-pulse {
            animation: none;
          }
        }
      `}</style>

        {/* Ảnh, tuyến SVG, marker và nhãn dùng chung khung đúng tỉ lệ ảnh gốc. */}
        <Img
          src={locationContent.mapImage}
          alt="Bản đồ vị trí và cự ly kết nối từ dự án QTOPIA"
          className="absolute inset-0 block h-full w-full object-contain"
        />

        {/* SVG ANIMATED ROUTES */}
        <svg
          viewBox="0 0 1456 683"
          preserveAspectRatio="none"
          role="group"
          aria-label="Chọn tuyến giao thông trên bản đồ"
          className="pointer-events-none absolute inset-0 h-full w-full"
        >
          {mapRoutes.map((route) => (
            <g
              key={route.id}
              opacity={
                activeRoute === null || activeRoute === route.id ? 1 : 0.25
              }
            >
              {/* COLOR ROUTE */}
              <polyline
                points={route.points}
                stroke={route.color}
                strokeWidth={activeRoute === route.id ? route.width + 3 : route.width}
                pointerEvents="none"
                className="qtopia-route"
                style={{
                  "--route-speed": route.speed,
                }}
              />

              {/* WHITE CENTER LINE */}
              <polyline
                points={route.points}
                pointerEvents="none"
                className="qtopia-route-center"
                style={{
                  "--route-speed": route.speed,
                }}
              />
              <polyline
                points={route.points}
                fill="none"
                stroke="transparent"
                strokeWidth="26"
                vectorEffect="non-scaling-stroke"
                pointerEvents="stroke"
                role="button"
                tabIndex={0}
                aria-label={`Chọn ${route.name}`}
                aria-pressed={activeRoute === route.id}
                onClick={() => toggleRoute(route.id)}
                onKeyDown={(event) => onRouteKeyDown(event, route.id)}
                className="cursor-pointer"
              />
            </g>
          ))}
          {mapAdditionalLines.map((line) => (
            <g
              key={line.id}
              opacity={
                activeRoute === null || activeRoute === line.id ? 1 : 0.25
              }
            >
              <polyline
                points={line.points}
                stroke={line.color}
                strokeWidth={activeRoute === line.id ? 9 : 6}
                pointerEvents="none"
                className="qtopia-additional-line"
              />
              <polyline
                points={line.points}
                fill="none"
                stroke="transparent"
                strokeWidth="26"
                vectorEffect="non-scaling-stroke"
                pointerEvents="stroke"
                role="button"
                tabIndex={0}
                aria-label={`Chọn ${line.name}`}
                aria-pressed={activeRoute === line.id}
                onClick={() => toggleRoute(line.id)}
                onKeyDown={(event) => onRouteKeyDown(event, line.id)}
                className="cursor-pointer"
              />
            </g>
          ))}
        </svg>

        {/* LOCATION MARKERS */}
        {mapLocations.map((place) => (
          <div
            key={place.id}
            className={`absolute z-[2] flex -translate-x-1/2 -translate-y-1/2 flex-col-reverse items-center gap-1.5 ${
              active === place.id ? "z-20" : ""
            }`}
            style={{
              left: `${place.x}%`,
              top: `${Math.min(95, Math.max(8, place.y - 6))}%`,
            }}
          >
            {/* CHECK-IN BUTTON */}
            <button
              type="button"
              aria-label={place.name}
              aria-expanded={active === place.id}
              onClick={() => setActive(active === place.id ? null : place.id)}
              className={`relative z-0 grid shrink-0 place-items-center bg-transparent p-0 text-[#e63946] drop-shadow-md transition-all duration-300 hover:scale-110 ${
                active === place.id ? "scale-110 text-q-lime" : ""
              }`}
            >
              <MapPinIcon />
              <span className="qtopia-pulse pointer-events-none absolute -inset-[5px] rounded-full border-2 border-[#e63946]" />
            </button>

            {/* LOCATION LABEL — ẩn mặc định, chỉ hiện khi bấm vào nút check-in */}
            <span
              aria-hidden="true"
              className={`relative z-10 pointer-events-none whitespace-nowrap rounded-md border px-2 py-1 font-body text-[8px] font-semibold text-q-navy shadow-[0_2px_8px_rgba(0,0,0,0.25)] backdrop-blur-[2px] transition-all duration-300 sm:text-[10px] lg:px-2.5 lg:text-xs ${
                active === place.id
                  ? "translate-y-0 border-q-lime bg-q-lime/70 opacity-100"
                  : "translate-y-1 border-white/40 bg-white/70 opacity-0"
              }`}
            >
              {place.name}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full rounded-xl border border-white/20 bg-white/10 p-3 text-white sm:p-4">
        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-q-lime sm:text-xs">
          Chú thích tuyến giao thông
        </p>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 lg:grid-cols-3">
          {legendRoutes.map((route) => (
            <button
              key={route.id}
              type="button"
              onClick={() => toggleRoute(route.id)}
              aria-pressed={activeRoute === route.id}
              className={`flex min-w-0 items-start gap-2 rounded-md border-l-[3px] p-1 pl-2 text-left transition-colors ${activeRoute === route.id ? "font-bold" : "hover:bg-white/10"}`}
              style={{
                borderColor: activeRoute === route.id ? route.color : "transparent",
                backgroundColor: activeRoute === route.id ? `${route.color}26` : undefined,
              }}
            >
              <span className="mt-1 flex shrink-0 items-center gap-0.5">
                <span
                  className="h-[3px] w-3 rounded-full"
                  style={{ backgroundColor: route.color }}
                />
                <span
                  className="h-[3px] w-2 rounded-full"
                  style={{
                    backgroundColor:
                      typeof route.id === "number" ? "#fff" : route.color,
                  }}
                />
                <span
                  className="h-[3px] w-3 rounded-full"
                  style={{ backgroundColor: route.color }}
                />
              </span>

              <span className="min-w-0">
                <span
                  className={`block text-[9px] font-semibold sm:text-[10px] lg:text-xs ${
                    activeRoute === route.id ? "text-q-lime" : "text-white"
                  }`}
                >
                  {route.name}
                </span>
                {activeRoute === route.id && (
                  <span className="mt-1 block text-[8px] leading-relaxed text-white/75 sm:text-[9px] lg:text-[11px]">
                    {route.description}
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================
   LOCATION SECTION
========================================= */

export default function Location({ showTopicLink = true }) {
  const ref = useReveal();

  return (
    <section
      id="vi-tri"
      data-snap-section
      className="section-screen relative min-h-[calc(100svh-var(--header-h))] h-auto max-h-none overflow-hidden bg-q-navy text-white"
    >
      <div
        className="orbit-bg opacity-60"
        style={{
          "--orbit-x": "90%",
          "--orbit-y": "10%",
        }}
      />

      <Container className="relative flex min-h-0 flex-1 flex-col">
        <div
          ref={ref}
          className="mt-3 grid min-h-0 flex-1 grid-cols-1 gap-5 lg:mt-7 lg:grid-cols-[minmax(0,7fr)_minmax(0,13fr)] lg:items-stretch lg:gap-8 [@media(max-height:740px)]:mt-2"
        >
          <div className="flex min-w-0 flex-col justify-center lg:h-full lg:justify-start">
            <SectionHeading
              light
              label={locationContent.label}
              lead={locationContent.lead}
            />
            <ul className="m-0 flex list-none flex-col p-0">
              {locationContent.highlights.map((h, i) => (
                <li
                  key={h.label}
                  style={{ "--i": i }}
                  className="stagger flex items-baseline gap-4 border-b border-white/10 py-1.5 last:border-0 lg:py-3 [@media(max-height:740px)]:py-1 [@media(max-height:620px)]:py-0.5"
                >
                  <span className="flex w-20 shrink-0 items-baseline gap-1">
                    <CountUp
                      value={h.value}
                      className="font-display text-xl font-extrabold lg:text-3xl [@media(max-height:620px)]:text-lg"
                    />
                    <span className="text-xs text-q-lime">phút</span>
                  </span>

                  <span className="text-sm text-white/85">{h.label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-1.5 text-[0.7rem] leading-snug text-white/65 lg:mt-3 lg:text-xs">
              Thời gian di chuyển tham khảo theo brochure; thực tế phụ thuộc
              tuyến đường và giao thông.
            </p>

            <div className="flex flex-wrap gap-2 pt-2.5 lg:gap-3 lg:pt-5">
              <Link
                to="/#lien-he"
                data-cta-name="location_register"
                data-cta-location="vi-tri"
                className="btn-base btn-primary no-underline"
              >
                Nhận tư vấn vị trí
              </Link>

              {showTopicLink ? (
                <Link
                  to="/vi-tri"
                  title="Bản đồ vị trí và cự ly kết nối từ QTOPIA"
                  data-cta-name="location_detail"
                  data-cta-location="vi-tri"
                  className="btn-base btn-outline cta-fx no-underline"
                >
                  Xem chi tiết
                  <Icon name="arrow" size={18} />
                </Link>
              ) : null}
            </div>
          </div>

          <div className="w-full min-w-0 lg:h-full">
            <LocationMap />
          </div>
        </div>
      </Container>
    </section>
  );
}
