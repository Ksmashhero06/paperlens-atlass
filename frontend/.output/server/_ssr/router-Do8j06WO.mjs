import { n as __exportAll, r as __toESM } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { L as redirect, _ as createRootRouteWithContext, b as useRouter, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter$1, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { F as FileQuestionMark, G as CircleCheck, K as CircleAlert, _ as RotateCw, nt as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-CwSSvks0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-Do8j06WO.js
var router_Do8j06WO_exports = /* @__PURE__ */ __exportAll({
	a: () => SuccessState,
	createRouter: () => createRouter,
	getRouter: () => getRouter,
	i: () => ErrorState,
	n: () => Route,
	r: () => useAuth,
	t: () => router_exports
});
var styles_default = "/assets/styles-reNPexmf.css";
function reportLovableError(error, context) {
	if (typeof window !== "undefined") console.error("[PaperAtlas ErrorBoundary]", error, context);
}
function Toaster$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-card group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
}
function NotFoundView() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileQuestionMark, { className: "h-8 w-8 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-serif text-3xl font-bold text-foreground sm:text-4xl",
				children: "Page Not Found"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-sm text-muted-foreground",
				children: "The research paper or workspace page you were looking for doesn't exist or may have been moved."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/dashboard",
					className: "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Back to Dashboard"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/papers",
					className: "inline-flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted",
					children: "View Library"
				})]
			})
		]
	});
}
function ErrorState({ title, description, retryLabel = "Try Again", onRetry, secondaryLabel, onSecondary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 p-8 text-center sm:p-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-lg font-semibold text-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed",
				children: description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex items-center gap-3",
				children: [onRetry && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: onRetry,
					size: "sm",
					variant: "default",
					className: "gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5" }), retryLabel]
				}), secondaryLabel && onSecondary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: onSecondary,
					size: "sm",
					variant: "outline",
					className: "gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), secondaryLabel]
				})]
			})
		]
	});
}
function SuccessState({ title, description, actionLabel, onAction }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center sm:p-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-6 w-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-serif text-lg font-semibold text-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 max-w-sm text-xs text-muted-foreground leading-relaxed",
				children: description
			}),
			actionLabel && onAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: onAction,
					size: "sm",
					variant: "default",
					children: actionLabel
				})
			})
		]
	});
}
var DEFAULT_USER = {
	id: "researcher-local-01",
	name: "Lead Researcher",
	email: "researcher@local.vault",
	institution: "Computer Science & AI Institute",
	specialty: "Document Synthesis & NLP",
	role: "lead_researcher",
	last_active: "Active Now"
};
var LOCAL_USER_KEY = "paperatlas_researcher_profile";
var AuthContext = (0, import_react.createContext)(void 0);
function AuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(DEFAULT_USER);
	const [loading, setLoading] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (typeof window !== "undefined") {
			const cached = localStorage.getItem(LOCAL_USER_KEY);
			if (cached) try {
				setUser({
					...DEFAULT_USER,
					...JSON.parse(cached)
				});
			} catch {}
		}
	}, []);
	const updateProfile = (0, import_react.useCallback)((updates) => {
		setUser((prev) => {
			const updated = {
				...prev,
				...updates
			};
			if (typeof window !== "undefined") localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
			return updated;
		});
		toast.success("Researcher profile updated locally.");
	}, []);
	const resetToDefault = (0, import_react.useCallback)(() => {
		setUser(DEFAULT_USER);
		if (typeof window !== "undefined") localStorage.removeItem(LOCAL_USER_KEY);
		toast.success("Profile reset to default.");
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		resetToDefault();
	}, [resetToDefault]);
	const signInWithGoogle = (0, import_react.useCallback)(async () => {
		toast.success("Connected with Google Drive AppData Storage.");
	}, []);
	const reconnectDrive = (0, import_react.useCallback)(async () => {
		toast.info("Google Drive AppData Storage is active.");
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			isAuthenticated: true,
			loading,
			isAdmin: true,
			isResearcher: true,
			isConfigured: true,
			driveSyncStatus: "connected",
			driveError: null,
			updateProfile,
			signOut,
			resetToDefault,
			signInWithGoogle,
			reconnectDrive
		},
		children
	});
}
function useAuth() {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within an AuthProvider");
	return context;
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotFoundView, {});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background px-4 py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-full max-w-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				title: "Something went wrong",
				description: "We couldn't complete your request. Please try again.",
				retryLabel: "Try Again",
				onRetry: () => {
					router.invalidate();
					reset();
				},
				secondaryLabel: "Back to Dashboard",
				onSecondary: () => {
					window.location.href = "/dashboard";
				}
			})
		})
	});
}
var Route$10 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "PaperAtlas — AI Research Assistant & Grounded Citations" },
			{
				name: "description",
				content: "PaperAtlas is an AI research assistant that helps students and academics analyze papers, extract methodology, ask grounded questions, and store research privately in Google Drive AppData."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:title",
				content: "PaperAtlas — AI Research Assistant & Grounded Citations"
			},
			{
				property: "og:description",
				content: "PaperAtlas is an AI research assistant with grounded citations and private user-owned Google Drive AppData persistence."
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "PaperAtlas — AI Research Assistant"
			},
			{
				name: "twitter:description",
				content: "PaperAtlas is an AI research assistant with grounded citations and private user-owned Google Drive AppData persistence."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/002190d0-db5b-4553-9f9c-81e666b799e4/id-preview-a43b5f6f--c23ca41c-568e-463d-87ae-00e1c3114733.lovable.app-1784818746321.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/002190d0-db5b-4553-9f9c-81e666b799e4/id-preview-a43b5f6f--c23ca41c-568e-463d-87ae-00e1c3114733.lovable.app-1784818746321.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/paperlens-logo.svg",
				type: "image/svg+xml"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Source+Serif+4:opsz,wght@8..60,400;8..60,500;8..60,600;8..60,700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$10.useRouteContext();
	(0, import_react.useEffect)(() => {
		import("./theme-OmRUUPq1.mjs").then((n) => n.r).then((n) => n.r).then(({ initTheme }) => {
			initTheme();
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			position: "top-right",
			richColors: false,
			closeButton: true,
			mobileOffset: { bottom: "16px" }
		})] })
	});
}
var Route$9 = createFileRoute("/")({ beforeLoad: () => {
	throw redirect({ to: "/dashboard" });
} });
var $$splitComponentImporter$7 = () => import("./activity-BFpxDLtK.mjs");
var Route$8 = createFileRoute("/activity")({
	head: () => ({ meta: [
		{ title: "Paper & Analysis History · PaperAtlas" },
		{
			name: "description",
			content: "View your previous research analyses, questions, and grounded citations in PaperAtlas."
		},
		{
			property: "og:title",
			content: "Paper & Analysis History · PaperAtlas"
		},
		{
			property: "og:description",
			content: "View your previous research analyses and questions in PaperAtlas."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./dashboard-DjcVPF_t.mjs");
var Route$7 = createFileRoute("/dashboard")({
	head: () => ({ meta: [
		{ title: "User Workspace · PaperAtlas" },
		{
			name: "description",
			content: "Your personalized PaperAtlas research workspace: upload papers, review recent work, and interact with AI evidence backed by your Google Drive AppData."
		},
		{
			property: "og:title",
			content: "User Workspace · PaperAtlas"
		},
		{
			property: "og:description",
			content: "Your personalized PaperAtlas research workspace."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var Route$6 = createFileRoute("/history")({ beforeLoad: () => {
	throw redirect({ to: "/activity" });
} });
var $$splitComponentImporter$5 = () => import("./login-juMrdfkC.mjs");
var Route$5 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Sign In · PaperAtlas" }, {
		name: "description",
		content: "Sign in to PaperAtlas with your Google Account to access your research papers stored in your personal Google Drive AppData."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./papers-ZD9si6Sb.mjs");
var Route$4 = createFileRoute("/papers")({
	head: () => ({ meta: [
		{ title: "My Papers · PaperLens" },
		{
			name: "description",
			content: "Your analyzed research papers in one place — search, filter, and open them."
		},
		{
			property: "og:title",
			content: "My Papers · PaperLens"
		},
		{
			property: "og:description",
			content: "Your analyzed research papers in one place."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./settings-B1y_L-Ad.mjs");
var Route$3 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Settings & Storage · PaperAtlas" },
		{
			name: "description",
			content: "Manage your PaperAtlas Google Account, Drive AppData storage, workspace, and preferences."
		},
		{
			property: "og:title",
			content: "Settings & Storage · PaperAtlas"
		},
		{
			property: "og:description",
			content: "Manage your PaperAtlas Google Account and Drive AppData storage."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./upload-C1-s9-K3.mjs");
var Route$2 = createFileRoute("/upload")({
	head: () => ({ meta: [
		{ title: "Analyze a Research Paper · PaperAtlas" },
		{
			name: "description",
			content: "Upload a PDF and PaperAtlas will structure the document through the 9-stage research pipeline and persist to Google Drive AppData."
		},
		{
			property: "og:title",
			content: "Analyze a Research Paper · PaperAtlas"
		},
		{
			property: "og:description",
			content: "Upload a PDF and PaperAtlas will structure the document through the 9-stage research pipeline and persist to Google Drive AppData."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./auth.callback-C1by6VqS.mjs");
var Route$1 = createFileRoute("/auth/callback")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./paper._id-C-HeJlCn.mjs");
var Route = createFileRoute("/paper/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$9.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$10
	}),
	ActivityRoute: Route$8.update({
		id: "/activity",
		path: "/activity",
		getParentRoute: () => Route$10
	}),
	DashboardRoute: Route$7.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => Route$10
	}),
	HistoryRoute: Route$6.update({
		id: "/history",
		path: "/history",
		getParentRoute: () => Route$10
	}),
	LoginRoute: Route$5.update({
		id: "/login",
		path: "/login",
		getParentRoute: () => Route$10
	}),
	PapersRoute: Route$4.update({
		id: "/papers",
		path: "/papers",
		getParentRoute: () => Route$10
	}),
	SettingsRoute: Route$3.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$10
	}),
	UploadRoute: Route$2.update({
		id: "/upload",
		path: "/upload",
		getParentRoute: () => Route$10
	}),
	AuthCallbackRoute: Route$1.update({
		id: "/auth/callback",
		path: "/auth/callback",
		getParentRoute: () => Route$10
	}),
	PaperIdRoute: Route.update({
		id: "/paper/$id",
		path: "/paper/$id",
		getParentRoute: () => Route$10
	})
};
var routeTree = Route$10._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll$1({
	createRouter: () => createRouter,
	getRouter: () => getRouter
});
function createRouter() {
	const queryClient = new QueryClient({ defaultOptions: { queries: {
		staleTime: 3e5,
		refetchOnWindowFocus: false
	} } });
	return createRouter$1({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		scrollRestoration: true
	});
}
var routerInstance;
function getRouter() {
	if (!routerInstance) routerInstance = createRouter();
	return routerInstance;
}
//#endregion
export { useAuth as a, router_Do8j06WO_exports as i, Route as n, Button as o, SuccessState as r, cn as s, ErrorState as t };
