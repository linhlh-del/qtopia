import { s as leadFormContent } from "./SectionHeading-DIihyKak.js";
import { t as Icon } from "./Icons-CdsUf0hk.js";
import { t as Img } from "./Img-Bk2iwTwh.js";
import { createContext, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
// src/lib/lead.js
async function submitLead({ name, phone, formLocation }) {
	throw new Error("Chưa cấu hình VITE_LEAD_ENDPOINT — form đang ở chế độ demo, chưa gửi lead thật.");
}
// src/lib/analytics.js
function track(event, params = {}) {
	if (typeof window === "undefined") return;
	window.dataLayer = window.dataLayer || [];
	if (window.gtag) window.gtag("event", event, params);
	else window.dataLayer.push({
		event,
		...params
	});
}
function loadGtm() {
	if (typeof window === "undefined" || window.__qtopiaAnalytics) return;
	window.__qtopiaAnalytics = true;
	window.dataLayer = window.dataLayer || [];
	window.gtag = function() {
		window.dataLayer.push(arguments);
	};
	window.gtag("js", /* @__PURE__ */ new Date());
	window.gtag("config", "G-6LEMBK6FTP", { send_page_view: false });
	let loaded = false;
	const run = () => {
		if (loaded) return;
		loaded = true;
		for (const event of [
			"pointerdown",
			"keydown",
			"scroll"
		]) window.removeEventListener(event, run);
		const s = document.createElement("script");
		s.id = "gtm-loader";
		s.async = true;
		s.src = "https://www.googletagmanager.com/gtag/js?id=G-6LEMBK6FTP";
		document.head.appendChild(s);
	};
	for (const event of [
		"pointerdown",
		"keydown",
		"scroll"
	]) window.addEventListener(event, run, {
		once: true,
		passive: true
	});
	const schedule = () => {
		if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 5e3 });
		else window.setTimeout(run, 1e3);
	};
	if (document.readyState === "complete") schedule();
	else window.addEventListener("load", schedule, { once: true });
}
function trackWebVitals() {
	let active = true;
	let timer = 0;
	let idleId = 0;
	let stopMetrics = () => {};
	const start = async () => {
		try {
			const { onCLS, onINP, onLCP } = await import("web-vitals");
			if (!active) return;
			const report = ({ name, value, delta, rating }) => {
				track("web_vital", {
					metric_name: name,
					metric_value: value,
					metric_delta: delta,
					metric_unit: name === "CLS" ? "score" : "ms",
					metric_rating: rating,
					page_path: window.location.pathname
				});
			};
			const unsubscribe = [
				onCLS(report),
				onINP(report),
				onLCP(report)
			];
			stopMetrics = () => unsubscribe.forEach((stop) => stop());
		} catch (error) {
			console.error("Failed to initialize Core Web Vitals reporting.", error);
		}
	};
	const schedule = () => {
		if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(start, { timeout: 5e3 });
		else timer = window.setTimeout(start, 1e3);
	};
	if (document.readyState === "complete") schedule();
	else window.addEventListener("load", schedule, { once: true });
	return () => {
		active = false;
		window.removeEventListener("load", schedule);
		window.clearTimeout(timer);
		if (idleId) window.cancelIdleCallback(idleId);
		stopMetrics();
	};
}
function initDelegatedTracking() {
	const onClick = (e) => {
		const el = e.target.closest?.("a, button");
		if (!el) return;
		const loc = el.dataset.ctaLocation || "";
		const href = el.getAttribute("href") || "";
		if (href.startsWith("tel:")) return track("click_call", { cta_location: loc });
		if (/zalo\.me/i.test(href)) return track("click_zalo", { cta_location: loc });
		if (el.dataset.ctaName) track("click_cta", {
			cta_name: el.dataset.ctaName,
			cta_location: loc,
			cta_target: el.dataset.ctaTarget || href || ""
		});
	};
	document.addEventListener("click", onClick);
	return () => document.removeEventListener("click", onClick);
}
function trackScrollDepth() {
	const marks = [
		25,
		50,
		75,
		90
	];
	const fired = /* @__PURE__ */ new Set();
	let frame = 0;
	const check = () => {
		frame = 0;
		const max = document.documentElement.scrollHeight - window.innerHeight;
		if (max <= 0) return;
		const pct = window.scrollY / max * 100;
		marks.forEach((m) => {
			if (pct >= m && !fired.has(m)) {
				fired.add(m);
				track("scroll_depth", { percent: m });
			}
		});
	};
	const onScroll = () => {
		if (!frame) frame = requestAnimationFrame(check);
	};
	window.addEventListener("scroll", onScroll, { passive: true });
	return () => {
		window.removeEventListener("scroll", onScroll);
		cancelAnimationFrame(frame);
	};
}
function trackSectionViews() {
	if (!("IntersectionObserver" in window)) return () => {};
	const seen = /* @__PURE__ */ new Set();
	const io = new IntersectionObserver((entries) => {
		entries.forEach((en) => {
			if (en.isIntersecting && !seen.has(en.target.id)) {
				seen.add(en.target.id);
				track("section_view", { section_id: en.target.id });
			}
		});
	}, { threshold: .35 });
	document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
	return () => io.disconnect();
}
// src/components/LeadFormFields.jsx
var VN_PHONE = /^(?:\+?84|0)(?:3|5|7|8|9)\d{8}$/;
function validate(values) {
	const errors = {};
	if (values.name.trim().length < 2) errors.name = "Vui lòng nhập họ và tên";
	if (!VN_PHONE.test(values.phone.replace(/[\s.-]/g, ""))) errors.phone = "Số điện thoại chưa đúng (vd. 0912 345 678)";
	return errors;
}
function LeadFormFields({ formLocation, onSuccess, submitLabel = "Nhận thông tin", tone = "light" }) {
	const uid = useId();
	const [values, setValues] = useState({
		name: "",
		phone: ""
	});
	const [errors, setErrors] = useState({});
	const [status, setStatus] = useState("idle");
	const [message, setMessage] = useState("");
	const nameRef = useRef(null);
	const phoneRef = useRef(null);
	const dark = tone === "dark";
	const input = `w-full rounded-2xl border px-4 py-3.5 text-base outline-none transition-colors ${dark ? "border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white" : "border-q-navy/15 bg-white text-q-ink placeholder:text-q-muted/70 focus:border-q-blue"}`;
	const labelCls = `text-sm font-semibold ${dark ? "text-white" : "text-q-ink"}`;
	const errCls = dark ? "text-amber-300" : "text-q-red";
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (status === "sending") return;
		const next = validate(values);
		setErrors(next);
		if (next.name) return nameRef.current?.focus();
		if (next.phone) return phoneRef.current?.focus();
		setStatus("sending");
		setMessage("");
		try {
			await submitLead({
				...values,
				formLocation
			});
			setStatus("success");
			setValues({
				name: "",
				phone: ""
			});
			track("generate_lead", { form_location: formLocation });
			onSuccess?.();
		} catch (err) {
			setStatus("error");
			setMessage(err.message);
		}
	};
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: handleSubmit,
		noValidate: true,
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ jsxs("label", {
						htmlFor: `${uid}-name`,
						className: labelCls,
						children: ["Họ và tên ", /* @__PURE__ */ jsx("span", {
							className: errCls,
							children: "*"
						})]
					}),
					/* @__PURE__ */ jsx("input", {
						ref: nameRef,
						id: `${uid}-name`,
						type: "text",
						autoComplete: "name",
						placeholder: "vd. Nguyễn Văn An",
						value: values.name,
						onChange: (e) => setValues((v) => ({
							...v,
							name: e.target.value
						})),
						"aria-invalid": Boolean(errors.name),
						"aria-describedby": errors.name ? `${uid}-name-err` : void 0,
						className: input
					}),
					errors.name ? /* @__PURE__ */ jsx("p", {
						id: `${uid}-name-err`,
						className: `text-sm ${errCls}`,
						children: errors.name
					}) : null
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1.5",
				children: [
					/* @__PURE__ */ jsxs("label", {
						htmlFor: `${uid}-phone`,
						className: labelCls,
						children: ["Số điện thoại ", /* @__PURE__ */ jsx("span", {
							className: errCls,
							children: "*"
						})]
					}),
					/* @__PURE__ */ jsx("input", {
						ref: phoneRef,
						id: `${uid}-phone`,
						type: "tel",
						inputMode: "tel",
						autoComplete: "tel",
						placeholder: "vd. 0912 345 678",
						value: values.phone,
						onChange: (e) => setValues((v) => ({
							...v,
							phone: e.target.value
						})),
						"aria-invalid": Boolean(errors.phone),
						"aria-describedby": errors.phone ? `${uid}-phone-err` : void 0,
						className: input
					}),
					errors.phone ? /* @__PURE__ */ jsx("p", {
						id: `${uid}-phone-err`,
						className: `text-sm ${errCls}`,
						children: errors.phone
					}) : null
				]
			}),
			/* @__PURE__ */ jsx("button", {
				type: "submit",
				disabled: status === "sending",
				className: "btn-base btn-primary w-full disabled:opacity-60",
				children: status === "sending" ? "Đang gửi…" : submitLabel
			}),
			/* @__PURE__ */ jsxs("p", {
				role: "status",
				"aria-live": "polite",
				className: "min-h-[1.25rem] text-sm",
				children: [status === "success" ? /* @__PURE__ */ jsx("span", {
					className: dark ? "text-q-lime" : "text-green-700",
					children: "Đã gửi thành công! Chúng tôi sẽ liên hệ sớm nhất."
				}) : null, status === "error" ? /* @__PURE__ */ jsx("span", {
					className: errCls,
					children: message
				}) : null]
			}),
			/* @__PURE__ */ jsx("p", {
				className: `text-xs ${dark ? "text-white/65" : "text-q-muted"}`,
				children: leadFormContent.consentNote
			})
		]
	});
}
// src/components/ContactPopup.jsx
var Ctx = createContext({ open: () => {} });
var useContactPopup = () => useContext(Ctx);
var SEEN_KEY = "qtopia_popup_seen";
function ContactPopupProvider({ autoOpenMs = 3e4, children }) {
	const ref = useRef(null);
	const [source, setSource] = useState("popup");
	const [session, setSession] = useState(0);
	const open = useCallback((from = "popup") => {
		const dlg = ref.current;
		if (!dlg || dlg.open) return;
		setSource(from);
		setSession((n) => n + 1);
		dlg.showModal();
		try {
			sessionStorage.setItem(SEEN_KEY, "1");
		} catch {}
	}, []);
	useEffect(() => {
		let seen = false;
		try {
			seen = sessionStorage.getItem(SEEN_KEY) === "1";
		} catch {}
		if (seen) return void 0;
		const t = window.setTimeout(() => {
			if (document.activeElement?.closest?.("form")) return;
			open("popup_auto");
		}, autoOpenMs);
		return () => window.clearTimeout(t);
	}, [autoOpenMs, open]);
	const value = useMemo(() => ({ open }), [open]);
	return /* @__PURE__ */ jsxs(Ctx.Provider, {
		value,
		children: [children, /* @__PURE__ */ jsx("dialog", {
			ref,
			"aria-labelledby": "popup-title",
			onClick: (e) => e.target === e.currentTarget && e.currentTarget.close(),
			className: "m-auto w-[min(94vw,46rem)] overflow-hidden rounded-[1.75rem] border-0 bg-white p-0 shadow-card backdrop:bg-q-navy/70 backdrop:backdrop-blur-sm",
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative grid sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => ref.current?.close(),
						"aria-label": "Đóng hộp thoại đăng ký",
						title: "Đóng",
						className: "absolute right-3 top-3 z-10 grid size-11 place-items-center rounded-full bg-white/80 text-q-muted backdrop-blur hover:bg-q-sand",
						children: /* @__PURE__ */ jsx(Icon, { name: "close" })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative max-sm:hidden",
						children: [
							/* @__PURE__ */ jsx(Img, {
								src: leadFormContent.image,
								alt: "Phối cảnh dự án căn hộ QTOPIA nhìn từ biển",
								className: "absolute inset-0 h-full w-full object-cover"
							}),
							/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-q-navy/85 to-q-navy/10" }),
							/* @__PURE__ */ jsx("p", {
								className: "absolute bottom-5 left-5 right-5 m-0 font-display text-lg font-bold text-white drop-shadow",
								children: "Tìm hiểu thêm về QTOPIA"
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "p-5 sm:p-7",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "section-label",
								children: "Đăng ký tư vấn"
							}),
							/* @__PURE__ */ jsx("h2", {
								id: "popup-title",
								className: "mt-2 font-display text-xl font-extrabold text-q-navy",
								children: "Nhận thông tin QTOPIA"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-4 mt-1.5 text-sm text-q-muted",
								children: "Để lại thông tin, chuyên viên sẽ liên hệ sớm nhất."
							}),
							/* @__PURE__ */ jsx(LeadFormFields, { formLocation: source }, session)
						]
					})
				]
			})
		})]
	});
}
export { loadGtm as a, trackSectionViews as c, initDelegatedTracking as i, trackWebVitals as l, useContactPopup as n, track as o, LeadFormFields as r, trackScrollDepth as s, ContactPopupProvider as t };
