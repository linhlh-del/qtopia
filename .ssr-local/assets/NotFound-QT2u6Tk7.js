import { s as Container } from "../entry-server.js";
import { Link } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
// src/pages/NotFound.jsx
function NotFound() {
	return /* @__PURE__ */ jsx("section", {
		className: "section-y bg-q-cream",
		children: /* @__PURE__ */ jsxs(Container, {
			className: "flex flex-col items-center gap-5 text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "section-title text-q-navy",
					children: "Không tìm thấy trang"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "prose-lead max-w-xl text-q-muted",
					children: "Trang bạn tìm không tồn tại hoặc đã được chuyển đi. Quay về trang chủ để xem tổng quan dự án, vị trí, tiện ích và mặt bằng căn hộ QTOPIA."
				}),
				/* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "btn-base btn-dark no-underline",
					children: "Về trang chủ QTOPIA"
				})
			]
		})
	});
}
export { NotFound as default };
