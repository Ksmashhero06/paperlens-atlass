globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { t as FastResponse } from "./_libs/srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs").then((n) => n.t)) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/AppShell-BqnL8_eq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f7ca-I0LlceUS+m5A22ZEw9IWWAvJVhU\"",
		"mtime": "2026-09-23T07:19:15.354Z",
		"size": 63434,
		"path": "../public/assets/AppShell-BqnL8_eq.js"
	},
	"/assets/EmptyState-_EvlgKl_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"303-wH8P1aeFkEEbZRR1nFwmw/zNzCo\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 771,
		"path": "../public/assets/EmptyState-_EvlgKl_.js"
	},
	"/assets/Logo-CuHDLk6c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"564-mNX31bU2AuEuwnCfZmVPR5JWZaE\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 1380,
		"path": "../public/assets/Logo-CuHDLk6c.js"
	},
	"/assets/SectionCard-BYlr4DGB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c3-pqAKZuiWOaoIprqzghw718sT+r8\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 707,
		"path": "../public/assets/SectionCard-BYlr4DGB.js"
	},
	"/assets/StatusBadge-BTwAmKwa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"517-72t8m7WEDPM+IIpBE7hBcNdKF+o\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 1303,
		"path": "../public/assets/StatusBadge-BTwAmKwa.js"
	},
	"/assets/activity--t1cFWiB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a63-mpCUVMhDPwoAgs287TqQ9iY4mtA\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 6755,
		"path": "../public/assets/activity--t1cFWiB.js"
	},
	"/assets/arrow-right-BpLPFO9i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d-a9ybuyq7opCZWoEV19p1O0/nl9E\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 157,
		"path": "../public/assets/arrow-right-BpLPFO9i.js"
	},
	"/assets/auth-context-DrB36n74.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c528-SYVrZxj1HSZZAH2uOtOFg/y3ofw\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 116008,
		"path": "../public/assets/auth-context-DrB36n74.js"
	},
	"/assets/auth.callback-BBnIPjvU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c51-qkczbK6V6NYCCkQ6IeitmEWTUVY\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 3153,
		"path": "../public/assets/auth.callback-BBnIPjvU.js"
	},
	"/assets/calendar-B2TSBLVL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9-Yr5OW6OOOoZ19XX6TwChmZBtxfE\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 249,
		"path": "../public/assets/calendar-B2TSBLVL.js"
	},
	"/assets/chart-column-B6uN6312.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f3-RzBPnYPHk5gizTFOxq6RsMbu4ec\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 243,
		"path": "../public/assets/chart-column-B6uN6312.js"
	},
	"/assets/dashboard-D-t2xsmK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab6e-RHyVS5UoY+hZDSrcX9Vgf3UmfPs\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 43886,
		"path": "../public/assets/dashboard-D-t2xsmK.js"
	},
	"/assets/hard-drive-DFDna2xc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17c-YsU3I1ufiQ0frRTHWVPG/qgbwzg\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 380,
		"path": "../public/assets/hard-drive-DFDna2xc.js"
	},
	"/assets/index-DSIcfJqM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5de1b-zkRxrzakLrkDEeHP2KZncqYKjb8\"",
		"mtime": "2026-09-23T07:19:15.354Z",
		"size": 384539,
		"path": "../public/assets/index-DSIcfJqM.js"
	},
	"/assets/loader-circle-YfxafBhD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"88-5bvI5b6XG3AHWD7ZjKn/izhfeuw\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 136,
		"path": "../public/assets/loader-circle-YfxafBhD.js"
	},
	"/assets/login-g71j043j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19fe-j+bCOh2rJ8EWUKGPmstFuUbdfqM\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 6654,
		"path": "../public/assets/login-g71j043j.js"
	},
	"/assets/message-square-CT7Gndj3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e1-iSrkZy3vcqWYcGnKUnj9UHnWD8Q\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 225,
		"path": "../public/assets/message-square-CT7Gndj3.js"
	},
	"/assets/paper-store-BIO4lPgr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1522e-JtDKecpAGp/AABqSwbPt84UX7aQ\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 86574,
		"path": "../public/assets/paper-store-BIO4lPgr.js"
	},
	"/assets/paper._id-BJafNLSX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"858d-dkqQaCYMzD16qEsGgpfdENK9044\"",
		"mtime": "2026-09-23T07:19:15.355Z",
		"size": 34189,
		"path": "../public/assets/paper._id-BJafNLSX.js"
	},
	"/assets/papers-B3om9pDA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"216c-x9rshwiVnGMvG7FWlZ7tHbzq/zs\"",
		"mtime": "2026-09-23T07:19:15.356Z",
		"size": 8556,
		"path": "../public/assets/papers-B3om9pDA.js"
	},
	"/assets/server-1QTO6W8s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ff-e/QbuJsD6erYKNZJX8ZtEFMyZBw\"",
		"mtime": "2026-09-23T07:19:15.356Z",
		"size": 511,
		"path": "../public/assets/server-1QTO6W8s.js"
	},
	"/assets/settings-Dq6vHsUl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3718-dz6DkC9VZJ2Ck5cHuN0j/0CszXs\"",
		"mtime": "2026-09-23T07:19:15.356Z",
		"size": 14104,
		"path": "../public/assets/settings-Dq6vHsUl.js"
	},
	"/assets/sparkles-DuOAFT8b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e6-MG23o6Lb02PUC/jaEI5SwnNVdeA\"",
		"mtime": "2026-09-23T07:19:15.356Z",
		"size": 486,
		"path": "../public/assets/sparkles-DuOAFT8b.js"
	},
	"/assets/styles-reNPexmf.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"d0a3-wW6Jtw8wXA/dnUlujLoNk6hMS8A\"",
		"mtime": "2026-09-23T07:19:15.356Z",
		"size": 53411,
		"path": "../public/assets/styles-reNPexmf.css"
	},
	"/assets/supabase-ChRXmbWP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"40a86-S/kDgU+KqLnl7UNTdA/eg4kQFtg\"",
		"mtime": "2026-09-23T07:19:15.356Z",
		"size": 264838,
		"path": "../public/assets/supabase-ChRXmbWP.js"
	},
	"/assets/theme-BdE7v1nv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"240-ZI/xBzPPwpAuNFK6fVHGJEZKnSI\"",
		"mtime": "2026-09-23T07:19:15.356Z",
		"size": 576,
		"path": "../public/assets/theme-BdE7v1nv.js"
	},
	"/assets/upload-BEipnnTC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2beb-he4io1mtTaCdM51XUu2A/x1KKMs\"",
		"mtime": "2026-09-23T07:19:15.356Z",
		"size": 11243,
		"path": "../public/assets/upload-BEipnnTC.js"
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
//#region ../node_modules/.bun/nitro@3.0.260603-beta+a6356c9aefed1453/node_modules/nitro/dist/runtime/internal/route-rules.mjs
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
var _lazy_IYs2p0 = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_IYs2p0
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
//#region ../node_modules/.bun/nitro@3.0.260603-beta+a6356c9aefed1453/node_modules/nitro/dist/runtime/internal/error/prod.mjs
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
//#region ../node_modules/.bun/nitro@3.0.260603-beta+a6356c9aefed1453/node_modules/nitro/dist/runtime/internal/app.mjs
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
//#region ../node_modules/.bun/nitro@3.0.260603-beta+a6356c9aefed1453/node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
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
//#region ../node_modules/.bun/nitro@3.0.260603-beta+a6356c9aefed1453/node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
