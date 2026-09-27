import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { et as BookOpen } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-D_SibOpw.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/dashboard",
		className: `flex items-center gap-2.5 font-sans ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-xs",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-4.5 w-4.5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-serif text-lg font-bold leading-none tracking-tight text-foreground",
				children: "PaperAtlas"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[10px] font-medium uppercase tracking-wider text-muted-foreground mt-0.5",
				children: "Research Vault"
			})]
		})]
	});
}
//#endregion
export { Logo as t };
