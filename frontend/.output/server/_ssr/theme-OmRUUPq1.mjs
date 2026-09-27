import { n as __exportAll } from "../_runtime.mjs";
import { b as __exportAll$1 } from "./router-ClHQqvmk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/theme-OmRUUPq1.js
var theme_OmRUUPq1_exports = /* @__PURE__ */ __exportAll({
	n: () => getStoredTheme,
	r: () => theme_exports,
	t: () => applyTheme
});
var theme_exports = /* @__PURE__ */ __exportAll$1({
	applyTheme: () => applyTheme,
	getStoredTheme: () => getStoredTheme,
	initTheme: () => initTheme
});
var STORAGE_KEY = "paperatlas_theme";
function getStoredTheme() {
	if (typeof window === "undefined") return "light";
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === "light" || stored === "dark" || stored === "system") return stored;
	} catch {}
	return "light";
}
function applyTheme(mode) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, mode);
	} catch {}
	const root = document.documentElement;
	if (mode === "dark" || mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches) root.classList.add("dark");
	else root.classList.remove("dark");
}
function initTheme() {
	applyTheme(getStoredTheme());
}
//#endregion
export { getStoredTheme as n, theme_OmRUUPq1_exports as r, applyTheme as t };
