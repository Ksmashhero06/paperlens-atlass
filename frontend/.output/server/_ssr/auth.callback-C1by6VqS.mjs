import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as LoaderCircle, G as CircleCheck, K as CircleAlert } from "../_libs/lucide-react.mjs";
import { a as supabase, o as syncSupabaseSessionWithBackend } from "./supabase-B3S-Ur_j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth.callback-C1by6VqS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthCallbackPage() {
	const navigate = useNavigate();
	const [status, setStatus] = (0, import_react.useState)("loading");
	const [errorMessage, setErrorMessage] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		async function handleAuthCallback() {
			try {
				const { data: { session }, error } = await supabase.auth.getSession();
				if (error) throw error;
				if (session) await syncSupabaseSessionWithBackend(session);
				else if (typeof window !== "undefined" && window.location.hash) {
					const hash = window.location.hash.substring(1);
					const accessToken = new URLSearchParams(hash).get("access_token");
					if (accessToken) {
						const { data: userData } = await supabase.auth.getUser(accessToken);
						if (userData?.user) await syncSupabaseSessionWithBackend({
							access_token: accessToken,
							user: userData.user
						});
					}
				}
				setStatus("success");
				if (window.opener && window.opener !== window) {
					window.opener.postMessage({
						type: "SUPABASE_AUTH_SUCCESS",
						status: "success"
					}, "*");
					setTimeout(() => {
						window.close();
					}, 600);
					return;
				}
				toast.success("Successfully authenticated with Google via Supabase Auth!");
				setTimeout(() => {
					navigate({ to: "/dashboard" });
				}, 800);
			} catch (err) {
				console.error("Auth callback error:", err);
				setStatus("error");
				setErrorMessage(err.message || "Failed to finalize authentication session.");
			}
		}
		handleAuthCallback();
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-background px-4 py-12 text-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-sm rounded-xl border border-border bg-card p-6 text-center shadow-lg",
			children: [
				status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif-editorial text-xl font-bold text-foreground",
						children: "Authenticating Session"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Verifying Google identity and syncing research workspace..."
					})] })]
				}),
				status === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-serif-editorial text-xl font-bold text-foreground",
						children: "Identity Verified"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Google OAuth completed. Loading your research workspace..."
					})] })]
				}),
				status === "error" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-6 w-6" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-serif-editorial text-xl font-bold text-foreground",
							children: "Authentication Error"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: errorMessage || "Unable to complete Google OAuth session."
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => navigate({ to: "/dashboard" }),
							className: "mt-3 w-full rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90",
							children: "Return to Dashboard"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { AuthCallbackPage as component };
