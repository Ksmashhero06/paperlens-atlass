import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { s as cn } from "./router-Do8j06WO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SectionCard-CKoutGwL.js
var import_jsx_runtime = require_jsx_runtime();
function SectionCard({ eyebrow, title, children, action, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("rounded-xl border border-border bg-card p-5 shadow-xs md:p-6", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [eyebrow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground",
				children: eyebrow
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-lg font-bold text-foreground",
				children: title
			})] }), action && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: action })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children })]
	});
}
//#endregion
export { SectionCard as t };
