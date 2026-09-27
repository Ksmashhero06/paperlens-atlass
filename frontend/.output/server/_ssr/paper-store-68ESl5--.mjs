import { r as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as useAuth, o as Button, s as cn } from "./router-Do8j06WO.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as LayoutGrid, C as Mail, D as LoaderCircle, E as Lock, G as CircleCheck, H as Clock, I as Eye, L as EyeOff, N as FolderGit2, O as LifeBuoy, P as FileText, T as LogIn, V as CloudUpload, W as CircleX, Y as ChevronDown, a as UserCheck, f as Settings, h as Search, i as UserX, k as Library, n as Users, r as User, s as Trash2, t as X, u as ShieldCheck, v as RefreshCw, w as LogOut } from "../_libs/lucide-react.mjs";
import { t as Logo } from "./Logo-D_SibOpw.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { i as simulateGoogleOAuthSignIn, n as isSupabaseConfigured, o as syncSupabaseSessionWithBackend, r as signInWithGoogleOAuth, t as determineUserRole } from "./supabase-B3S-Ur_j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paper-store-68ESl5--.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var api_exports = /* @__PURE__ */ __exportAll({
	askPaperQuestion: () => askPaperQuestion,
	deleteAdminUser: () => deleteAdminUser,
	evaluatePaperBenchmark: () => evaluatePaperBenchmark,
	getAdminActivity: () => getAdminActivity,
	getAdminPapers: () => getAdminPapers,
	getAdminStats: () => getAdminStats,
	getAdminUsers: () => getAdminUsers,
	getMe: () => getMe,
	getPaper: () => getPaper,
	getPaperAnalysis: () => getPaperAnalysis,
	getPaperChatHistory: () => getPaperChatHistory,
	getPaperContributions: () => getPaperContributions,
	getPaperDetail: () => getPaperDetail,
	getPaperMethodology: () => getPaperMethodology,
	getPaperRecommendations: () => getPaperRecommendations,
	getPaperStatus: () => getPaperStatus,
	getPapers: () => getPapers,
	getSystemHealth: () => getSystemHealth,
	getUserAnalyses: () => getUserAnalyses,
	logoutUser: () => logoutUser,
	reanalyzePaper: () => reanalyzePaper,
	registerUser: () => registerUser,
	retryPaperPipeline: () => retryPaperPipeline,
	updateAdminUserStatus: () => updateAdminUserStatus,
	uploadPaper: () => uploadPaper
});
var API_BASE_URL = "http://localhost:8000/api/v1";
var TOKEN_KEY = "paperlens_access_token";
async function getAuthHeaders() {
	const token = typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
	return token ? { Authorization: `Bearer ${token}` } : {};
}
async function handleResponse(response) {
	if (!response.ok) {
		let errorDetail = null;
		try {
			errorDetail = await response.json();
		} catch {}
		let msg = `HTTP ${response.status}: Request failed`;
		if (errorDetail && errorDetail.detail) msg = typeof errorDetail.detail === "string" ? errorDetail.detail : JSON.stringify(errorDetail.detail);
		else if (response.status === 413) msg = "File size exceeds the maximum limit of 20MB.";
		else if (response.status === 429) msg = "Too many requests. Please wait a moment and try again.";
		else if (response.status === 500) msg = "Internal server error. Please try again later.";
		throw {
			status: response.status,
			message: msg,
			detail: errorDetail
		};
	}
	const text = await response.text();
	if (!text) return {};
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
}
async function getMe() {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/auth/me`, {
		headers,
		credentials: "include"
	}));
}
async function logoutUser() {
	try {
		await fetch(`${API_BASE_URL}/auth/logout`, {
			method: "POST",
			credentials: "include"
		});
	} catch {}
	if (typeof window !== "undefined") {
		localStorage.removeItem(TOKEN_KEY);
		localStorage.removeItem("paperlens_user");
	}
}
async function getPapers() {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers`, {
		headers,
		credentials: "include"
	}));
}
async function getPaperDetail(paperId) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}`, {
		headers,
		credentials: "include"
	}));
}
var getPaper = getPaperDetail;
async function evaluatePaperBenchmark(paperId) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/evaluate`, {
		method: "POST",
		headers,
		credentials: "include"
	}));
}
async function getSystemHealth() {
	return await handleResponse(await fetch(`${API_BASE_URL}/health`));
}
async function getPaperStatus(paperId) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/status`, {
		headers,
		credentials: "include"
	}));
}
async function retryPaperPipeline(paperId) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/retry`, {
		method: "POST",
		headers,
		credentials: "include"
	}));
}
async function reanalyzePaper(paperId) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/reanalyze`, {
		method: "POST",
		headers,
		credentials: "include"
	}));
}
async function uploadPaper(file, workspaceId) {
	const headers = await getAuthHeaders();
	const formData = new FormData();
	formData.append("file", file);
	if (workspaceId) formData.append("workspace_id", workspaceId);
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/upload`, {
		method: "POST",
		headers,
		credentials: "include",
		body: formData
	}));
}
async function getPaperAnalysis(paperId) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/analysis`, {
		headers,
		credentials: "include"
	}));
}
async function getPaperMethodology(paperId) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/methodology`, {
		headers,
		credentials: "include"
	}));
}
async function getPaperContributions(paperId) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/contributions`, {
		headers,
		credentials: "include"
	}));
}
async function askPaperQuestion(paperId, question) {
	const headers = await getAuthHeaders();
	try {
		return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/questions`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				...headers
			},
			credentials: "include",
			body: JSON.stringify({ question })
		}));
	} catch (err) {
		if (!err.status) throw {
			status: 0,
			message: "Network error — failed to connect to backend server."
		};
		throw err;
	}
}
async function registerUser(email, password, name) {
	const data = await handleResponse(await fetch(`${API_BASE_URL}/auth/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		credentials: "include",
		body: JSON.stringify({
			email,
			password,
			name
		})
	}));
	if (data.access_token && typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, data.access_token);
	return data;
}
async function getAdminStats() {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/admin/stats`, {
		headers,
		credentials: "include"
	}));
}
async function getAdminUsers() {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/admin/users`, {
		headers,
		credentials: "include"
	}));
}
async function deleteAdminUser(userId) {
	const headers = await getAuthHeaders();
	const resp = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
		method: "DELETE",
		headers,
		credentials: "include"
	});
	if (!resp.ok) throw await handleResponse(resp);
}
async function updateAdminUserStatus(userId, isActive) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
		method: "PATCH",
		headers: {
			...headers,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ is_active: isActive }),
		credentials: "include"
	}));
}
async function getPaperChatHistory(paperId) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/chat-history`, {
		headers,
		credentials: "include"
	}));
}
async function getPaperRecommendations(paperId, limit = 5) {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/papers/${paperId}/recommendations?limit=${limit}`, {
		headers,
		credentials: "include"
	}));
}
async function getUserAnalyses() {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/user/analyses`, {
		headers,
		credentials: "include"
	}));
}
async function getAdminPapers() {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/admin/papers`, {
		headers,
		credentials: "include"
	}));
}
async function getAdminActivity() {
	const headers = await getAuthHeaders();
	return await handleResponse(await fetch(`${API_BASE_URL}/admin/activity`, {
		headers,
		credentials: "include"
	}));
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/60 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
	ref,
	className: cn(labelVariants(), className),
	...props
}));
Label.displayName = "Label";
var API_BASE = "http://localhost:8000/api/v1";
function AuthModal({ isOpen, onClose, onSuccess }) {
	const { signInWithGoogle, user: currentAuthUser } = useAuth();
	const [mode, setMode] = (0, import_react.useState)("login");
	const [view, setView] = (0, import_react.useState)("main");
	const [showEmailForm, setShowEmailForm] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [showPassword, setShowPassword] = (0, import_react.useState)(false);
	const [customEmail, setCustomEmail] = (0, import_react.useState)("");
	const [customName, setCustomName] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const onSuccessRef = (0, import_react.useRef)(onSuccess);
	onSuccessRef.current = onSuccess;
	const resetAndClose = (0, import_react.useCallback)(() => {
		setView("main");
		setCustomEmail("");
		setCustomName("");
		setShowEmailForm(false);
		onClose();
	}, [onClose]);
	const resetAndCloseRef = (0, import_react.useRef)(resetAndClose);
	resetAndCloseRef.current = resetAndClose;
	const handleLiveGoogleSignIn = async () => {
		setLoading(true);
		try {
			await signInWithGoogle();
			onSuccessRef.current(currentAuthUser);
			resetAndCloseRef.current();
		} catch (err) {} finally {
			setLoading(false);
		}
	};
	const handleSupabaseGoogleOAuth = async (targetEmail, targetName) => {
		setLoading(true);
		try {
			if (isSupabaseConfigured && !targetEmail) {
				const res = await signInWithGoogleOAuth();
				if (res.error) throw res.error;
				toast.info("Opening Google authentication window...");
				return;
			}
			const finalEmail = (targetEmail || customEmail || "ksmfrom2006@gmail.com").trim();
			const finalName = targetName || customName || (finalEmail.includes("ksmfrom2006") ? "Sakthi Kumaran" : finalEmail.split("@")[0]);
			const role = determineUserRole(finalEmail);
			const res = await simulateGoogleOAuthSignIn(finalEmail, finalName);
			toast.success(`Authenticated as ${res.user.name} (${finalEmail}) — Role: ${role.toUpperCase()}`);
			onSuccessRef.current(res.user);
			resetAndCloseRef.current();
		} catch (err) {
			toast.error(err.message || "Google OAuth via Supabase failed.");
		} finally {
			setLoading(false);
		}
	};
	const handleOAuthSubmit = async (provider, targetEmail, targetName) => {
		if (provider === "google") return handleSupabaseGoogleOAuth(targetEmail, targetName);
		const finalEmail = (targetEmail || customEmail || "researcher@outlook.com").trim();
		setLoading(true);
		try {
			const res = await syncSupabaseSessionWithBackend(null, {
				email: finalEmail,
				name: targetName || customName || "Academic Researcher",
				role: "user"
			});
			toast.success(`Signed in as ${res.name} (Microsoft)`);
			onSuccessRef.current(res);
			resetAndCloseRef.current();
		} catch (err) {
			toast.error(err.message || "Authentication failed.");
		} finally {
			setLoading(false);
		}
	};
	const handleEmailAuth = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Please enter both email and password.");
			return;
		}
		setLoading(true);
		try {
			if (mode === "register") {
				const res = await registerUser(email, password, name || void 0);
				localStorage.setItem("paperlens_access_token", res.access_token ?? "");
				localStorage.setItem("paperlens_user", JSON.stringify(res.user));
				toast.success("Account created successfully!");
				onSuccessRef.current(res.user);
			} else {
				const resp = await fetch(`${API_BASE}/auth/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						email,
						password
					})
				});
				if (!resp.ok) throw new Error("Invalid email or password");
				const data = await resp.json();
				localStorage.setItem("paperlens_access_token", data.access_token);
				localStorage.setItem("paperlens_user", JSON.stringify(data.user));
				toast.success("Logged in successfully!");
				onSuccessRef.current(data.user);
			}
			resetAndCloseRef.current();
		} catch (err) {
			toast.error(err.message || "Authentication failed.");
		} finally {
			setLoading(false);
		}
	};
	const googleIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "h-4 w-4 shrink-0",
		viewBox: "0 0 24 24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.15C3.25 21.3 7.31 24 12 24z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.15z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.7 1.27 6.58l4.01 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
			})
		]
	});
	const msIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "h-4 w-4 shrink-0",
		viewBox: "0 0 23 23",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#f35325",
				d: "M1 1h10v10H1z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#81bc06",
				d: "M12 1h10v10H12z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#05a6f0",
				d: "M1 12h10v10H1z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#ffba08",
				d: "M12 12h10v10H12z"
			})
		]
	});
	if (view === "oauth-custom-google" || view === "oauth-microsoft") {
		const isGoogle = view === "oauth-custom-google";
		const provider = isGoogle ? "google" : "microsoft";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: isOpen,
			onOpenChange: (open) => !open && resetAndClose(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
				className: "sm:max-w-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10",
						children: isGoogle ? googleIcon : msIcon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogTitle, {
						className: "text-center text-xl",
						children: [
							"Sign in with another ",
							isGoogle ? "Google" : "Microsoft",
							" Account"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-center text-xs text-muted-foreground",
						children: "Enter your Google Workspace or personal email address to authenticate with role-based access."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs",
							children: "Full Name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "text",
								placeholder: "Your Name",
								value: customName,
								onChange: (e) => setCustomName(e.target.value),
								className: "pl-8 text-xs"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								className: "text-xs",
								children: "Google Email Address"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative mt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									required: true,
									autoFocus: true,
									placeholder: "scholar@university.edu or gmail.com",
									value: customEmail,
									onChange: (e) => setCustomEmail(e.target.value),
									onKeyDown: (e) => e.key === "Enter" && handleOAuthSubmit(provider, customEmail, customName),
									className: "pl-8 text-xs"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] text-muted-foreground",
								children: [
									"Tip: ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
										className: "text-primary font-mono",
										children: "ksmfrom2006@gmail.com"
									}),
									" receives the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "ADMIN" }),
									" role; other accounts receive the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "RESEARCHER" }),
									" role."
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => handleOAuthSubmit(provider, customEmail, customName),
							disabled: loading,
							className: "w-full text-xs font-semibold",
							children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center justify-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3 w-3 animate-spin" }), "Authenticating via Supabase..."]
							}) : `Continue with ${isGoogle ? "Google (Supabase Auth)" : "Microsoft"}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setView("main"),
							className: "w-full text-center text-xs text-muted-foreground hover:text-foreground pt-1",
							children: "← Back to main options"
						})
					]
				})]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open && resetAndClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-center text-2xl font-serif",
						children: "Sign in to PaperLens"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "text-center text-xs text-muted-foreground",
						children: "Sign in with your Google Account to access your personal workspace in Google Drive AppData."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: "Google Drive AppData"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400",
							children: "User Owns Data"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							disabled: loading,
							onClick: handleLiveGoogleSignIn,
							className: "w-full h-11 flex items-center justify-center gap-3 rounded-lg border border-border bg-background hover:bg-muted text-foreground text-sm font-semibold shadow-xs transition-all cursor-pointer",
							children: [loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin text-primary" }) : googleIcon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue with Google" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-md bg-muted/40 px-3 py-2 text-[11px] border border-border/60",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 truncate text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-emerald-500 shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "truncate",
										children: ["Account: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
											className: "text-foreground",
											children: "ksmfrom2006@gmail.com"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded bg-primary/10 px-1.5 py-0.2 text-[9px] font-mono font-bold text-primary",
										children: "ADMIN"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setCustomEmail("");
									setCustomName("");
									setView("oauth-custom-google");
								},
								className: "text-primary hover:underline font-medium shrink-0 ml-2",
								children: "Switch Account"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border/70 bg-card p-3 text-xs space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "font-semibold text-foreground flex items-center gap-1.5 text-[11px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Role-Based Access Control (RBAC)" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-2 text-[11px] text-muted-foreground pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded bg-muted/30 p-2 border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-foreground",
									children: "Administrator"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] mt-0.5",
									children: "Admin panel, user management, status toggles, deletion"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded bg-muted/30 p-2 border border-border/50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-foreground",
									children: "Researcher"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[10px] mt-0.5",
									children: "Workspace library, 9-stage analysis, evidence Q&A"
								})]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						type: "button",
						disabled: loading,
						onClick: () => {
							setCustomEmail("");
							setCustomName("");
							setView("oauth-microsoft");
						},
						className: "w-full h-8 flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors",
						children: [msIcon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Or sign in with Microsoft" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-2 border-t border-border",
						children: !showEmailForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setShowEmailForm(true),
							className: "flex w-full items-center justify-center gap-1.5 py-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue with Email & Password" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleEmailAuth,
							className: "space-y-3 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs font-medium text-foreground",
										children: mode === "register" ? "Create with Email" : "Sign In with Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMode(mode === "login" ? "register" : "login"),
										className: "text-[11px] text-primary hover:underline font-medium",
										children: mode === "login" ? "Need an account? Register" : "Have an account? Sign In"
									})]
								}),
								mode === "register" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Full Name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "text",
										placeholder: "Sakthi Kumaran",
										value: name,
										onChange: (e) => setName(e.target.value),
										className: "pl-8 text-xs"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Email Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "email",
										required: true,
										placeholder: "you@domain.edu",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										className: "pl-8 text-xs"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Password"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative mt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: showPassword ? "text" : "password",
											required: true,
											placeholder: "••••••••",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											className: "pl-8 pr-10 text-xs"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setShowPassword(!showPassword),
											className: "absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground focus:outline-none",
											"aria-label": showPassword ? "Hide password" : "Show password",
											children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "h-4 w-4" })
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2 pt-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										disabled: loading,
										className: "flex-1 text-xs font-semibold h-8",
										children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }) : mode === "register" ? "Create Account" : "Sign In"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										onClick: () => setShowEmailForm(false),
										className: "text-xs h-8 px-3",
										children: "Cancel"
									})]
								})
							]
						})
					})
				]
			})]
		})
	});
}
function AdminModal({ isOpen, onClose }) {
	const [stats, setStats] = (0, import_react.useState)(null);
	const [users, setUsers] = (0, import_react.useState)([]);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const loadAdminData = async () => {
		setLoading(true);
		try {
			const [s, u] = await Promise.all([getAdminStats(), getAdminUsers()]);
			setStats(s);
			setUsers(u);
		} catch (err) {
			toast.error(err.message || "Failed to load admin management data.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		if (isOpen) loadAdminData();
	}, [isOpen]);
	const ADMIN_EMAILS = ["kkssakthikumaran@gmail.com", "kumaran.6373707@gmail.com"];
	const handleToggleStatus = async (userId, currentStatus, email) => {
		if (ADMIN_EMAILS.includes(email.toLowerCase())) {
			toast.error("Primary Administrator account status cannot be changed.");
			return;
		}
		const newStatus = !currentStatus;
		try {
			await updateAdminUserStatus(userId, newStatus);
			toast.success(`User ${email} status set to ${newStatus ? "Active" : "Deactivated"}.`);
			loadAdminData();
		} catch (err) {
			toast.error(err.message || "Failed to update user status.");
		}
	};
	const handleDeleteUser = async (userId, email) => {
		if (ADMIN_EMAILS.includes(email.toLowerCase())) {
			toast.error("Primary Administrator account cannot be deleted.");
			return;
		}
		if (!confirm(`Are you sure you want to delete user ${email} and all their data?`)) return;
		try {
			await deleteAdminUser(userId);
			toast.success(`User ${email} deleted successfully.`);
			loadAdminData();
		} catch (err) {
			toast.error(err.message || "Failed to delete user.");
		}
	};
	const filteredUsers = users.filter((u) => {
		const q = searchQuery.toLowerCase().trim();
		return u.name?.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.provider.toLowerCase().includes(q);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-4xl max-h-[90vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
							className: "font-serif-editorial text-xl",
							children: "PaperLens System Administrator Panel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: ["Admin: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: currentUser?.email || stats?.admin || "kkssakthikumaran@gmail.com"
							})]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						size: "sm",
						onClick: loadAdminData,
						disabled: loading,
						className: "flex items-center gap-1.5 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3.5 w-3.5 ${loading ? "animate-spin" : ""}` }), "Refresh"]
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-4 gap-3 my-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-3 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Total Users"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-2xl font-bold font-serif-editorial text-foreground",
								children: stats ? stats.total_users : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-3 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-4 w-4 text-emerald-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Active Users"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-2xl font-bold font-serif-editorial text-foreground",
								children: stats ? stats.active_users ?? stats.total_users : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-3 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderGit2, { className: "h-4 w-4 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Workspaces"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-2xl font-bold font-serif-editorial text-foreground",
								children: stats ? stats.total_workspaces : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-3 shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-amber-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-medium",
									children: "Analyzed Papers"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 text-2xl font-bold font-serif-editorial text-foreground",
								children: stats ? stats.total_papers : "—"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-semibold text-foreground",
							children: "Signed-In Users Directory & Account Controls"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative w-64",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								placeholder: "Search user name or email...",
								value: searchQuery,
								onChange: (e) => setSearchQuery(e.target.value),
								className: "h-8 pl-8 text-xs"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-md border border-border overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "border-b border-border bg-muted/50 text-muted-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5 font-medium",
										children: "User"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5 font-medium",
										children: "Provider"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5 font-medium",
										children: "Joined"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5 font-medium",
										children: "Last Login"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5 font-medium text-center",
										children: "Analyses"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5 font-medium text-center",
										children: "Status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "p-2.5 font-medium text-right",
										children: "Actions"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border",
								children: filteredUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "hover:bg-muted/30 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 font-medium text-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [u.picture ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: u.picture,
													alt: u.name,
													className: "h-6 w-6 rounded-full object-cover border border-border"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "flex h-6 w-6 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-[10px]",
													children: (u.name || u.email).substring(0, 2).toUpperCase()
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "font-semibold text-foreground",
													children: u.name || "Scholar User"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-muted-foreground",
													children: u.email
												})] })]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 capitalize text-muted-foreground",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium border border-border",
												children: u.provider
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 text-muted-foreground text-[11px]",
											children: new Date(u.created_at).toLocaleDateString(void 0, {
												month: "short",
												day: "numeric",
												year: "numeric"
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 text-muted-foreground text-[11px]",
											children: u.last_login_at ? new Date(u.last_login_at).toLocaleDateString(void 0, {
												month: "short",
												day: "numeric"
											}) : "Initial Login"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 text-center font-bold font-serif-editorial text-foreground",
											children: u.analyses_count ?? 0
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 text-center",
											children: u.is_active !== false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3 w-3" }), " Active"]
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1 rounded bg-destructive/10 px-2 py-0.5 text-[10px] font-semibold text-destructive",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "h-3 w-3" }), " Deactivated"]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "p-2.5 text-right space-x-1",
											children: !u.is_admin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "sm",
												onClick: () => handleToggleStatus(u.id, u.is_active !== false, u.email),
												className: "h-7 px-2 text-[11px] text-muted-foreground hover:text-foreground",
												title: u.is_active !== false ? "Disable user account" : "Enable user account",
												children: u.is_active !== false ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 text-amber-600 dark:text-amber-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, { className: "h-3.5 w-3.5" }), " Disable"]
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "flex items-center gap-1 text-emerald-600 dark:text-emerald-400",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, { className: "h-3.5 w-3.5" }), " Enable"]
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												onClick: () => handleDeleteUser(u.id, u.email),
												className: "h-7 w-7 text-destructive hover:bg-destructive/10",
												title: "Delete user account",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-3.5 w-3.5" })
											})] })
										})
									]
								}, u.id))
							})]
						})
					})]
				})
			]
		})
	});
}
var primary = [
	{
		label: "Overview",
		to: "/dashboard",
		icon: LayoutGrid
	},
	{
		label: "My Papers",
		to: "/papers",
		icon: Library
	},
	{
		label: "Upload Paper",
		to: "/upload",
		icon: CloudUpload
	},
	{
		label: "Recent Activity",
		to: "/activity",
		icon: Clock
	}
];
var secondary = [{
	label: "Settings",
	to: "/settings",
	icon: Settings
}, {
	label: "Help",
	to: "/help",
	icon: LifeBuoy
}];
function NavRow({ item, active }) {
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		className: cn("group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40", active ? "bg-accent text-primary" : "text-foreground/80 hover:bg-muted hover:text-foreground"),
		children: [
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: "absolute inset-y-1.5 left-0 w-0.5 rounded-r-sm bg-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
				className: cn("h-4 w-4 shrink-0 transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"),
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "truncate",
				children: item.label
			})
		]
	});
}
function Sidebar({ onNavigate }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [authOpen, setAuthOpen] = (0, import_react.useState)(false);
	const [adminOpen, setAdminOpen] = (0, import_react.useState)(false);
	const [currentUser, setCurrentUser] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		Promise.resolve().then(() => api_exports).then(({ getMe }) => {
			getMe().then((user) => {
				if (user && user.email) setCurrentUser(user);
			}).catch(() => {
				if (typeof window !== "undefined") {
					const cached = localStorage.getItem("paperlens_user");
					if (cached) try {
						setCurrentUser(JSON.parse(cached));
					} catch {
						setCurrentUser(null);
					}
				}
			});
		});
	}, []);
	const handleLogout = async (e) => {
		e.stopPropagation();
		const { logoutUser } = await Promise.resolve().then(() => api_exports);
		await logoutUser();
		setCurrentUser(null);
		toast.success("Signed out successfully");
		window.location.reload();
	};
	const isActive = (to) => to === "/dashboard" ? pathname === "/dashboard" || pathname === "/" : pathname.startsWith(to);
	const isAdmin = currentUser?.email?.toLowerCase() === "kkssakthikumaran@gmail.com" || currentUser?.email?.toLowerCase() === "kumaran.6373707@gmail.com" || Boolean(currentUser?.is_admin);
	const initials = currentUser?.name ? currentUser.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : currentUser?.email ? currentUser.email.slice(0, 2).toUpperCase() : "G";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "flex h-full w-full flex-col border-r border-border bg-surface",
			onClick: onNavigate,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-16 items-center border-b border-border px-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto px-3 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-2 px-3 text-[0.65rem] font-medium uppercase tracking-[0.16em] text-muted-foreground",
						children: "Workspace"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "space-y-0.5",
						children: primary.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
							item,
							active: isActive(item.to)
						}, item.to))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border px-3 py-4 space-y-2",
					children: [
						isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: (e) => {
								e.stopPropagation();
								setAdminOpen(true);
							},
							className: "flex w-full items-center gap-2.5 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admin Panel" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "space-y-0.5",
							children: secondary.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavRow, {
								item,
								active: isActive(item.to)
							}, item.to))
						}),
						currentUser ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-surface text-[11px] font-semibold tracking-wide text-foreground uppercase",
									children: initials
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs font-medium text-foreground",
										children: currentUser.name || currentUser.email.split("@")[0]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-[10px] text-muted-foreground",
										children: currentUser.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: handleLogout,
									title: "Sign Out",
									className: "p-1 rounded text-muted-foreground hover:text-destructive hover:bg-muted transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 shrink-0" })
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: (e) => {
								e.stopPropagation();
								setAuthOpen(true);
							},
							className: "flex w-full items-center gap-3 rounded-md border border-border bg-background px-3 py-2.5 transition-colors hover:bg-muted text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border bg-surface text-[11px] font-semibold tracking-wide text-foreground uppercase",
									children: "?"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1 leading-tight",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-xs font-medium text-foreground",
										children: "Guest User"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "truncate text-[10px] font-semibold text-primary",
										children: "Sign In / Register"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4 text-primary shrink-0" })
							]
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthModal, {
			isOpen: authOpen,
			onClose: () => setAuthOpen(false),
			onSuccess: (user) => {
				setCurrentUser(user);
				localStorage.setItem("paperlens_user", JSON.stringify(user));
			}
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminModal, {
			isOpen: adminOpen,
			onClose: () => setAdminOpen(false)
		})
	] });
}
function DriveSyncIndicator({ className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400", className),
		title: "All papers, analyses, and Q&A are stored securely in your local browser vault. No cloud dependencies or billing.",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3 w-3 text-emerald-600 dark:text-emerald-400 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: compact ? "Local Vault" : "Local Vault (Private & Offline)" })]
	});
}
var mockPapers = [
	{
		id: "paper-1",
		title: "Attention Is All You Need",
		authors: [
			"Ashish Vaswani",
			"Noam Shazeer",
			"Niki Parmar",
			"Jakob Uszkoreit",
			"Llion Jones",
			"Aidan N. Gomez",
			"Łukasz Kaiser",
			"Illia Polosukhin"
		],
		year: 2017,
		venue: "NeurIPS 2017",
		addedAt: "2026-09-10",
		pages: 15,
		status: "ready",
		citations: 124800,
		tags: [
			"Transformer",
			"Deep Learning",
			"NLP",
			"Self-Attention"
		],
		abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely.",
		keyContributions: [
			"Solely attention-based sequence transduction without recurrent or convolutional neural networks.",
			"Multi-Head Attention mechanism allowing the model to jointly attend to information from different representation subspaces.",
			"Scaled Dot-Product Attention with a scaling factor of 1/√d_k to prevent gradient vanishing into soft saturation regions.",
			"Sinusoidal positional encodings to inject absolute and relative token positions into non-recurrent layers."
		],
		methodology: [
			"Stacked self-attention and point-wise fully connected feed-forward layers for both encoder and decoder.",
			"Residual connections around each sub-layer followed by layer normalization (Post-LN formulation).",
			"Label smoothing with value ε_ls = 0.1 during training to improve BLEU metric and prevent overconfident predictions."
		],
		results: ["Achieved 28.4 BLEU on WMT 2014 English-to-German translation task, outperforming existing state-of-the-art models by over 2.0 BLEU.", "Established a new single-model state-of-the-art BLEU score of 41.8 on WMT 2014 English-to-French after training for 3.5 days on 8 P100 GPUs."]
	},
	{
		id: "paper-2",
		title: "LoRA: Low-Rank Adaptation of Large Language Models",
		authors: [
			"Edward J. Hu",
			"Yelong Shen",
			"Phillip Wallis",
			"Zeyuan Allen-Zhu",
			"Yuanzhi Li",
			"Shean Wang",
			"Lu Wang",
			"Weizhu Chen"
		],
		year: 2021,
		venue: "ICLR 2022",
		addedAt: "2026-09-14",
		pages: 14,
		status: "ready",
		citations: 18900,
		tags: [
			"Fine-Tuning",
			"Parameter-Efficient",
			"LLM",
			"Optimization"
		],
		abstract: "An important paradigm of natural language processing consists of large-scale pre-training on general domain data and adaptation to specific tasks. However, full fine-tuning of multi-billion parameter models becomes prohibitively expensive. We propose Low-Rank Adaptation (LoRA), which freezes pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture.",
		keyContributions: [
			"Parameter-efficient tuning freezing pre-trained weights W_0 while learning low-rank matrix pairs B and A.",
			"Zero inference latency overhead by folding adapter matrices ΔW = BA back into W_0 during deployment.",
			"Memory requirement reductions up to 3x on VRAM during training and checkpoint storage size reductions by 10,000x."
		],
		methodology: [
			"Decomposes dense weight updates ΔW into low-rank matrices B ∈ R^{d×r} and A ∈ R^{r×k} where intrinsic rank r ≪ min(d, k).",
			"Applies Gaussian random initialization to matrix A and zero initialization to matrix B so ΔW = 0 at start of adaptation.",
			"Scales adapter contribution by α/r where α is a constant hyperparameter."
		],
		results: ["Matches or exceeds full fine-tuning performance on GPT-3 175B with only 0.01% trainable parameters.", "Demonstrates higher training throughput and eliminates checkpoint switching latency on shared multi-tenant clusters."]
	},
	{
		id: "paper-3",
		title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
		authors: [
			"Patrick Lewis",
			"Ethan Perez",
			"Aleksandra Piktus",
			"Fabio Petroni",
			"Vladimir Karpukhin",
			"Naman Goyal",
			"Heinrich Küttler",
			"Mike Lewis",
			"Wen-tau Yih",
			"Tim Rocktäschel",
			"Sebastian Riedel",
			"Douwe Kiela"
		],
		year: 2020,
		venue: "NeurIPS 2020",
		addedAt: "2026-09-17",
		pages: 19,
		status: "ready",
		citations: 24300,
		tags: [
			"RAG",
			"Dense Retrieval",
			"Hallucination Reduction",
			"Knowledge Base"
		],
		abstract: "Large pre-trained language models have been shown to store vast amounts of factual knowledge in their parameters, but their ability to access and precisely manipulate knowledge is still limited. We explore general-purpose fine-tuning recipes for Retrieval-Augmented Generation (RAG) — models which combine pre-trained parametric and non-parametric memory for language generation.",
		keyContributions: [
			"Hybrid parametric and non-parametric architecture combining dense passage retrieval with seq2seq generation.",
			"Formulation of both RAG-Sequence and RAG-Token probability distributions over retrieved document sets.",
			"End-to-end differentiability allowing the dense retriever and seq2seq generator to be fine-tuned jointly."
		],
		methodology: [
			"Dense Passage Retrieval (DPR) utilizing dual BERT encoders for query and document representations.",
			"BART-large pre-trained sequence-to-sequence model as the parametric generator.",
			"Marginalization over top-k retrieved documents (k=5 to 10) during sequence generation."
		],
		results: ["Sets new state-of-the-art results on open-domain QA benchmarks including Natural Questions, TriviaQA, and WebQuestions.", "Generates significantly more specific, diverse, and factual text than parametric-only seq2seq baselines."]
	},
	{
		id: "paper-4",
		title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning",
		authors: [
			"DeepSeek-AI",
			"Daya Guo",
			"Dejian Yang",
			"Haowei Zhang",
			"Junxiao Song",
			"Ruoyu Zhang",
			"Runxin Xu",
			"Qihao Zhu"
		],
		year: 2025,
		venue: "arXiv preprint 2501.12948",
		addedAt: "2026-09-19",
		pages: 28,
		status: "ready",
		citations: 6200,
		tags: [
			"Reasoning",
			"Reinforcement Learning",
			"Chain-of-Thought",
			"DeepSeek"
		],
		abstract: "We introduce our first-generation reasoning models, DeepSeek-R1-Zero and DeepSeek-R1. DeepSeek-R1-Zero, a model trained via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT) as a preliminary step, demonstrates remarkable reasoning capabilities. Through RL, DeepSeek-R1-Zero naturally emerges with numerous powerful reasoning behaviors including self-verification, reflection, and generating long chains of thought.",
		keyContributions: [
			"Demonstration that pure reinforcement learning without initial supervised fine-tuning induces emergent reasoning.",
			"Multi-stage pipeline incorporating cold-start data, reasoning-oriented RL, rejection sampling, and broad-domain RL.",
			"Distillation of reasoning capabilities from DeepSeek-R1 into smaller dense models (1.5B, 7B, 14B, 32B)."
		],
		methodology: [
			"Group Relative Policy Optimization (GRPO) omitting the critic model to reduce training memory footprint.",
			"Rule-based reward system rewarding accuracy (e.g., LeetCode/math answers) and formatting (thinking tags).",
			"Strict avoidance of neural reward models during early RL to prevent reward hacking."
		],
		results: ["Achieved 79.8% Pass@1 on AIME 2024 and 97.3% on MATH-500, competitive with OpenAI o1.", "Distilled DeepSeek-R1-32B outperforms open-source baselines and achieves superior inference cost efficiency."]
	},
	{
		id: "paper-5",
		title: "FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning",
		authors: ["Tri Dao"],
		year: 2023,
		venue: "ICLR 2024",
		addedAt: "2026-09-20",
		pages: 14,
		status: "processing",
		citations: 3400,
		tags: [
			"CUDA",
			"Attention Optimization",
			"GPU Kernel",
			"Hardware-Aware"
		],
		abstract: "FlashAttention is an exact attention algorithm that reduces memory reads/writes between GPU HBM and SRAM. We present FlashAttention-2, which yields a 2x speedup over FlashAttention by tweaking the algorithm to reduce non-matmul FLOPs, parallelizing the forward and backward passes across sequence length, and partitioning work across warps.",
		keyContributions: [
			"Algorithmic tweaks to reduce non-matrix-multiplication FLOPs by eliminating unnecessary scaling factor recomputations.",
			"Improved parallelism across sequence length dimensions in addition to batch size and number of heads.",
			"Work partitioning between warps within a thread block that maximizes Tensor Core utilization."
		],
		methodology: [
			"Online softmax computation with running maximum statistics maintained in fast SRAM registers.",
			"Optimized warp-level matrix multiply-accumulate (MMA) instructions.",
			"Split forward and backward kernel loops minimizing synchronization barriers."
		],
		results: ["Reaches up to 73% of theoretical peak GPU FLOPs on A100 GPUs (up from 35-50% in original FlashAttention).", "Achieves 2x faster end-to-end wall-clock training throughput for 8k-32k sequence context windows."]
	}
];
/**
* PaperAtlas Persistent Data Store
* 
* 100% Self-Contained, Local-First Architecture:
* - All research papers, analyses, claims, and Q&A history are stored locally in the user's browser.
* - Zero Google Cloud or third-party cloud dependencies.
* - Full JSON backup export and import for complete data ownership and portability.
*/
var LOCAL_STORAGE_PAPERS = "paperatlas_local_papers";
var LOCAL_STORAGE_ANALYSES = "paperatlas_local_analyses";
var LOCAL_STORAGE_QUESTIONS = "paperatlas_local_questions";
function getSeedPapers() {
	return mockPapers.map((p) => ({
		id: p.id,
		title: p.title,
		authors: p.authors,
		publicationYear: p.year,
		pageCount: p.pages,
		fileName: `${p.id}.pdf`,
		uploadedAt: p.addedAt || (/* @__PURE__ */ new Date()).toISOString(),
		processedAt: p.addedAt || (/* @__PURE__ */ new Date()).toISOString(),
		processingStatus: "completed",
		summary: p.abstract,
		researchObjective: "Investigate sequence-to-sequence neural architectures and multi-head attention.",
		keyContributions: p.keyContributions,
		methodology: p.methodology.join(" "),
		dataset: "WMT 2014 English-to-German / English-to-French",
		results: p.results.join(" "),
		limitations: ["High memory usage during long sequence generation", "Fixed positional encoding scaling"],
		keywords: p.tags,
		sourceReferences: [{
			title: "Attention Mechanisms in Deep Learning",
			year: 2017
		}, {
			title: "Sequence-to-Sequence Learning with Neural Networks",
			year: 2014
		}]
	}));
}
/**
* Get locally cached papers
*/
function getLocalPapers() {
	if (typeof window === "undefined") return getSeedPapers();
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_PAPERS);
		if (!raw) {
			const initial = getSeedPapers();
			localStorage.setItem(LOCAL_STORAGE_PAPERS, JSON.stringify(initial));
			return initial;
		}
		return JSON.parse(raw);
	} catch {
		return getSeedPapers();
	}
}
/**
* Save papers to local cache
*/
function setLocalPapers(papers) {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(LOCAL_STORAGE_PAPERS, JSON.stringify(papers));
	} catch (err) {
		console.warn("Failed to write papers to local storage:", err);
	}
}
/**
* Save analysis to local cache
*/
function setLocalAnalysis(analysis) {
	if (typeof window === "undefined") return;
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_ANALYSES) || "{}";
		const map = JSON.parse(raw);
		map[analysis.paperId] = analysis;
		localStorage.setItem(LOCAL_STORAGE_ANALYSES, JSON.stringify(map));
	} catch (err) {
		console.warn("Failed to write analysis to local storage:", err);
	}
}
/**
* Get all locally cached analyses map
*/
function getLocalAnalyses() {
	if (typeof window === "undefined") return {};
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_ANALYSES);
		if (!raw) return {};
		return JSON.parse(raw) || {};
	} catch {
		return {};
	}
}
/**
* Get locally cached questions for a paper (or all questions if paperId omitted)
*/
function getLocalQuestions(paperId) {
	if (typeof window === "undefined") return [];
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_QUESTIONS);
		if (!raw) return [];
		const map = JSON.parse(raw);
		if (paperId) return map[paperId] || [];
		const all = [];
		Object.values(map).forEach((list) => {
			if (Array.isArray(list)) all.push(...list);
		});
		return all;
	} catch {
		return [];
	}
}
/**
* Save question to local cache
*/
function appendLocalQuestion(question) {
	if (typeof window === "undefined") return;
	try {
		const raw = localStorage.getItem(LOCAL_STORAGE_QUESTIONS) || "{}";
		const map = JSON.parse(raw);
		const list = map[question.paperId] || [];
		list.push(question);
		map[question.paperId] = list;
		localStorage.setItem(LOCAL_STORAGE_QUESTIONS, JSON.stringify(map));
	} catch (err) {
		console.warn("Failed to append question to local storage:", err);
	}
}
/**
* Load all papers from local vault and backend
*/
async function loadAllPapersWithSync() {
	const local = getLocalPapers();
	try {
		const apiPapers = await getPapers();
		if (apiPapers && apiPapers.length > 0) {
			const mappedApiPapers = apiPapers.map((ap) => ({
				id: ap.id,
				title: ap.title,
				authors: ap.authors ? [ap.authors] : [],
				publicationYear: ap.publication_year,
				pageCount: ap.page_count || 10,
				fileName: ap.file_name,
				uploadedAt: ap.created_at,
				processedAt: ap.updated_at,
				processingStatus: ap.status === "READY" ? "completed" : ap.status.toLowerCase(),
				summary: ap.abstract || ""
			}));
			const mergedMap = /* @__PURE__ */ new Map();
			for (const p of local) mergedMap.set(p.id, p);
			for (const p of mappedApiPapers) if (!mergedMap.has(p.id)) mergedMap.set(p.id, p);
			const combined = Array.from(mergedMap.values());
			setLocalPapers(combined);
			return {
				source: "backend",
				papers: combined,
				driveConnected: false
			};
		}
	} catch {}
	return {
		source: "local",
		papers: local,
		driveConnected: false
	};
}
/**
* Persist paper to Local Vault
*/
async function persistPaper(paper) {
	const papers = getLocalPapers();
	const idx = papers.findIndex((p) => p.id === paper.id);
	if (idx >= 0) papers[idx] = {
		...papers[idx],
		...paper
	};
	else papers.unshift(paper);
	setLocalPapers(papers);
	return { driveSaved: false };
}
/**
* Persist paper analysis to Local Vault
*/
async function persistAnalysis(analysis) {
	setLocalAnalysis(analysis);
	return { driveSaved: false };
}
/**
* Persist Q&A item to Local Vault
*/
async function persistQuestion(question) {
	appendLocalQuestion(question);
	return { driveSaved: false };
}
/**
* Load questions for a paper from Local Vault
*/
async function loadPaperQuestions(paperId) {
	return getLocalQuestions(paperId);
}
/**
* Delete paper from Local Vault
*/
async function deletePaperCompletely(paperId) {
	setLocalPapers(getLocalPapers().filter((p) => p.id !== paperId));
	return { driveDeleted: false };
}
/**
* Export all user data as a formatted JSON string for backup/portability
*/
function exportAllUserDataAsJson() {
	const papers = getLocalPapers();
	const analyses = getLocalAnalyses();
	const questions = getLocalQuestions();
	const exportPayload = {
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		version: "2.0",
		appName: "PaperAtlas",
		storageType: "Local Vault (Offline & Private)",
		summary: {
			papersCount: papers.length,
			analysesCount: Object.keys(analyses).length,
			questionsCount: questions.length
		},
		data: {
			papers,
			analyses,
			questions
		}
	};
	return JSON.stringify(exportPayload, null, 2);
}
/**
* Clear all local data
*/
async function clearAllAppData() {
	if (typeof window !== "undefined") {
		localStorage.removeItem(LOCAL_STORAGE_PAPERS);
		localStorage.removeItem(LOCAL_STORAGE_ANALYSES);
		localStorage.removeItem(LOCAL_STORAGE_QUESTIONS);
	}
}
//#endregion
export { getSystemHealth as A, uploadPaper as B, getPaper as C, getPaperMethodology as D, getPaperContributions as E, persistPaper as F, persistQuestion as I, reanalyzePaper as L, loadAllPapersWithSync as M, loadPaperQuestions as N, getPaperRecommendations as O, persistAnalysis as P, retryPaperPipeline as R, getLocalQuestions as S, getPaperChatHistory as T, getAdminPapers as _, DialogHeader as a, getLocalAnalyses as b, Input as c, clearAllAppData as d, deleteAdminUser as f, getAdminActivity as g, exportAllUserDataAsJson as h, DialogFooter as i, getUserAnalyses as j, getPaperStatus as k, Sidebar as l, evaluatePaperBenchmark as m, DialogContent as n, DialogTitle as o, deletePaperCompletely as p, DialogDescription as r, DriveSyncIndicator as s, Dialog as t, askPaperQuestion as u, getAdminStats as v, getPaperAnalysis as w, getLocalPapers as x, getAdminUsers as y, updateAdminUserStatus as z };
