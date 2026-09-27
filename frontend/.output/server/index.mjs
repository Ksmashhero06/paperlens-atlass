globalThis.__nitro_main__ = import.meta.url;
import { n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/activity-C97Q7mxR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a62-34zH9K1eZVKJ8Rugau6St6NTyuw\"",
		"mtime": "2026-09-27T15:36:58.407Z",
		"size": 6754,
		"path": "../public/assets/activity-C97Q7mxR.js"
	},
	"/assets/AppShell-diceG6bG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f594-oJ5YR00pMk5VZXMv2L8GrGEG/RU\"",
		"mtime": "2026-09-27T15:36:58.391Z",
		"size": 62868,
		"path": "../public/assets/AppShell-diceG6bG.js"
	},
	"/assets/arrow-right-dg08oMbn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a1-Z9sr9N1/a7TQz1AwDBvovDPELUY\"",
		"mtime": "2026-09-27T15:36:58.407Z",
		"size": 161,
		"path": "../public/assets/arrow-right-dg08oMbn.js"
	},
	"/assets/auth.callback-BCGmmiA4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c79-d8ovjNUvLI2OW6G/B6wyNmKQJ+c\"",
		"mtime": "2026-09-27T15:36:58.409Z",
		"size": 3193,
		"path": "../public/assets/auth.callback-BCGmmiA4.js"
	},
	"/assets/calendar-B5g6nDlF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fd-rq0N/qjZ6cJPCa8uovff+7exCK8\"",
		"mtime": "2026-09-27T15:36:58.409Z",
		"size": 253,
		"path": "../public/assets/calendar-B5g6nDlF.js"
	},
	"/assets/auth-context-DabS0Wen.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5a03-DyqjPJQY2BJL06BrCrUvEhvQZMU\"",
		"mtime": "2026-09-27T15:36:58.409Z",
		"size": 23043,
		"path": "../public/assets/auth-context-DabS0Wen.js"
	},
	"/assets/circle-check-C6LmYkUp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b314-RGisKvdyOb68HiQ/5kRtqjFkeXY\"",
		"mtime": "2026-09-27T15:36:58.409Z",
		"size": 45844,
		"path": "../public/assets/circle-check-C6LmYkUp.js"
	},
	"/assets/chart-column-BbKvpW9M.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7-oikFDpANMzc5q19nLkozdWIrGBg\"",
		"mtime": "2026-09-27T15:36:58.409Z",
		"size": 247,
		"path": "../public/assets/chart-column-BbKvpW9M.js"
	},
	"/assets/dashboard-DVXetyBD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab50-YFKjpmmplTejpuDnAFzXvfJlPww\"",
		"mtime": "2026-09-27T15:36:58.411Z",
		"size": 43856,
		"path": "../public/assets/dashboard-DVXetyBD.js"
	},
	"/assets/hard-drive-BewXgwe2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"180-4xO8IvpHgGfz1AEE7gGNzR0ZCiA\"",
		"mtime": "2026-09-27T15:36:58.411Z",
		"size": 384,
		"path": "../public/assets/hard-drive-BewXgwe2.js"
	},
	"/assets/Logo-C49kOFjj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"717-tVM+xwTdbPtubfSvbJr6qKJG+vA\"",
		"mtime": "2026-09-27T15:36:58.407Z",
		"size": 1815,
		"path": "../public/assets/Logo-C49kOFjj.js"
	},
	"/assets/EmptyState-UG1iI-hB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"307-l8LZc+BISdjYA7hZRvxh/PhbtzY\"",
		"mtime": "2026-09-27T15:36:58.391Z",
		"size": 775,
		"path": "../public/assets/EmptyState-UG1iI-hB.js"
	},
	"/assets/loader-circle-CNBX1Jmh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8c-kRPweHoZ4icff2ycRYPG3DbfBnA\"",
		"mtime": "2026-09-27T15:36:58.411Z",
		"size": 140,
		"path": "../public/assets/loader-circle-CNBX1Jmh.js"
	},
	"/assets/login-DASQZdH-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19de-ROYjFCdcYGGCwI0AQwxX0qxAXn8\"",
		"mtime": "2026-09-27T15:36:58.411Z",
		"size": 6622,
		"path": "../public/assets/login-DASQZdH-.js"
	},
	"/assets/message-square-DhkNUZIz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e5-UYOhqg0+Fb940j2EA3ZAyqlxFw8\"",
		"mtime": "2026-09-27T15:36:58.411Z",
		"size": 229,
		"path": "../public/assets/message-square-DhkNUZIz.js"
	},
	"/assets/papers-B45EGVya.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2176-QZbOH5c4VPaoMiYwR4EdIR73Teo\"",
		"mtime": "2026-09-27T15:36:58.413Z",
		"size": 8566,
		"path": "../public/assets/papers-B45EGVya.js"
	},
	"/assets/paper-store-DxpScc5z.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"14b4b-AQXjPcw8bDRXeWA6CUiqiq6V83A\"",
		"mtime": "2026-09-27T15:36:58.413Z",
		"size": 84811,
		"path": "../public/assets/paper-store-DxpScc5z.js"
	},
	"/assets/paper._id-CKHryear.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8564-v2ujt9ALFFBrO3vbDePkXp+sFKA\"",
		"mtime": "2026-09-27T15:36:58.413Z",
		"size": 34148,
		"path": "../public/assets/paper._id-CKHryear.js"
	},
	"/assets/SectionCard-C0Dpr9MD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c7-doYLy1deLOqTOTp+Ktb8tykPMpY\"",
		"mtime": "2026-09-27T15:36:58.407Z",
		"size": 711,
		"path": "../public/assets/SectionCard-C0Dpr9MD.js"
	},
	"/assets/server-BMDt53zp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"203-BN1wrVz1jk7bin4mn/7xEVASapg\"",
		"mtime": "2026-09-27T15:36:58.413Z",
		"size": 515,
		"path": "../public/assets/server-BMDt53zp.js"
	},
	"/assets/StatusBadge-BEiMMioN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"51b-lTNlGw92aYkuIkXxX5B5ehyA3lY\"",
		"mtime": "2026-09-27T15:36:58.407Z",
		"size": 1307,
		"path": "../public/assets/StatusBadge-BEiMMioN.js"
	},
	"/assets/settings-BUhbnQgI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"371c-tsxtDTgXAjsl83Eg9zPg472NL1Y\"",
		"mtime": "2026-09-27T15:36:58.415Z",
		"size": 14108,
		"path": "../public/assets/settings-BUhbnQgI.js"
	},
	"/assets/styles-reNPexmf.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d0a3-wW6Jtw8wXA/dnUlujLoNk6hMS8A\"",
		"mtime": "2026-09-27T15:36:58.432Z",
		"size": 53411,
		"path": "../public/assets/styles-reNPexmf.css"
	},
	"/assets/supabase-B5d06IDI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3525d-oLfGBPss5RZLOagjAJcDdMTUyMA\"",
		"mtime": "2026-09-27T15:36:58.415Z",
		"size": 217693,
		"path": "../public/assets/supabase-B5d06IDI.js"
	},
	"/assets/index-B1brIqME.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54e20-Zg571ma5ElylSEJxzLStFHOWq+s\"",
		"mtime": "2026-09-27T15:36:58.391Z",
		"size": 347680,
		"path": "../public/assets/index-B1brIqME.js"
	},
	"/assets/theme-DhXD7u0J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"244-XWDI8n/gGCjp+ISrziUP6e3wJeQ\"",
		"mtime": "2026-09-27T15:36:58.415Z",
		"size": 580,
		"path": "../public/assets/theme-DhXD7u0J.js"
	},
	"/assets/upload-DVD8Xtgo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bf5-0ZaQRou1iw64p+pC8S4IxfBfhJk\"",
		"mtime": "2026-09-27T15:36:58.415Z",
		"size": 11253,
		"path": "../public/assets/upload-DVD8Xtgo.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_1Vtswo = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_1Vtswo
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
