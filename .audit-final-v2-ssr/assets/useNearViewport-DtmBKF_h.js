import { useEffect, useRef, useState } from "react";
// src/hooks/useNearViewport.js
function useNearViewport(rootMargin = "300px") {
	const ref = useRef(null);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const element = ref.current;
		if (!element) return void 0;
		if (!("IntersectionObserver" in window)) {
			const frame = requestAnimationFrame(() => setVisible(true));
			return () => cancelAnimationFrame(frame);
		}
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setVisible(true);
				observer.disconnect();
			}
		}, { rootMargin });
		observer.observe(element);
		return () => observer.disconnect();
	}, [rootMargin]);
	return [ref, visible];
}
export { useNearViewport as t };
