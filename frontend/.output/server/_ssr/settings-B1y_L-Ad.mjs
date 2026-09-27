import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as useAuth } from "./router-Do8j06WO.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as Download, G as CircleCheck, M as HardDrive, T as LogIn, b as Moon, c as Sun, p as Server, rt as Activity, s as Trash2, v as RefreshCw, w as LogOut } from "../_libs/lucide-react.mjs";
import { A as getSystemHealth, S as getLocalQuestions, b as getLocalAnalyses, d as clearAllAppData, h as exportAllUserDataAsJson, s as DriveSyncIndicator, x as getLocalPapers } from "./paper-store-68ESl5--.mjs";
import { n as getStoredTheme, t as applyTheme } from "./theme-OmRUUPq1.mjs";
import { t as AppShell } from "./AppShell-Br35TMe9.mjs";
import { t as SectionCard } from "./SectionCard-CKoutGwL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-B1y_L-Ad.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var inputCls = "w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-foreground",
				children: label
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mt-0.5 block text-xs text-muted-foreground",
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children
			})
		]
	});
}
function Toggle({ checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		role: "switch",
		"aria-checked": checked,
		onClick: () => onChange(!checked),
		className: `relative h-5 w-9 rounded-full transition ${checked ? "bg-primary" : "bg-muted"}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-0.5 h-4 w-4 rounded-full bg-background transition ${checked ? "left-[1.125rem]" : "left-0.5"}` })
	});
}
function ToggleRow({ title, description, checked, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4 py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-sm text-foreground",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: description
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
			checked,
			onChange
		})]
	});
}
function SettingsPage() {
	const [theme, setThemeState] = (0, import_react.useState)("light");
	const [defaultView, setDefaultView] = (0, import_react.useState)("grid");
	const [autoOpen, setAutoOpen] = (0, import_react.useState)(true);
	const [showSources, setShowSources] = (0, import_react.useState)(true);
	const [chatHistory, setChatHistory] = (0, import_react.useState)(true);
	const { user: authUser, isAuthenticated, driveSyncStatus, signInWithGoogle, reconnectDrive, signOut } = useAuth();
	const [health, setHealth] = (0, import_react.useState)(null);
	const [healthLoading, setHealthLoading] = (0, import_react.useState)(false);
	const [storageStats, setStorageStats] = (0, import_react.useState)({
		papersCount: 0,
		analysesCount: 0,
		questionsCount: 0
	});
	const handleSetTheme = (mode) => {
		setThemeState(mode);
		applyTheme(mode);
	};
	const fetchHealth = async () => {
		setHealthLoading(true);
		try {
			const h = await getSystemHealth();
			setHealth(h);
		} catch {
			setHealth(null);
		} finally {
			setHealthLoading(false);
		}
	};
	const refreshStorageStats = () => {
		const papers = getLocalPapers();
		const analyses = getLocalAnalyses();
		const questions = getLocalQuestions();
		setStorageStats({
			papersCount: papers.length,
			analysesCount: Object.keys(analyses).length,
			questionsCount: questions.length
		});
	};
	(0, import_react.useEffect)(() => {
		const currentTheme = getStoredTheme();
		setThemeState(currentTheme);
		applyTheme(currentTheme);
		fetchHealth();
		refreshStorageStats();
	}, [authUser, driveSyncStatus]);
	const userName = authUser?.name || "Researcher";
	const userEmail = authUser?.email || "No Google Account connected";
	const initials = userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
	const handleExportData = () => {
		try {
			const jsonStr = exportAllUserDataAsJson();
			const blob = new Blob([jsonStr], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `paperatlas_backup_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
			toast.success("PaperAtlas workspace exported as JSON successfully.");
		} catch {
			toast.error("Failed to export data.");
		}
	};
	const handleClearData = async () => {
		if (!window.confirm("Are you sure you want to clear your local workspace cache and Google Drive AppData files? This action cannot be undone.")) return;
		try {
			await clearAllAppData();
			refreshStorageStats();
			toast.success("AppData files and workspace cache cleared.");
		} catch {
			toast.error("Failed to clear data.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "Account",
		title: "Settings & Storage",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					eyebrow: "Storage",
					title: "Google Account & Drive AppData",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-border bg-muted/20 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [authUser?.profile_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: authUser.profile_image,
									alt: userName,
									className: "h-14 w-14 rounded-full border border-border object-cover shrink-0"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-14 w-14 place-items-center rounded-full bg-primary text-base font-semibold text-primary-foreground shrink-0",
									children: initials
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-base font-semibold text-foreground",
										children: userName
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs text-muted-foreground",
										children: userEmail
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 flex items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveSyncIndicator, {})
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-2",
								children: isAuthenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => reconnectDrive(),
									className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "h-3 w-3 text-primary" }), "Reconnect Drive"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => signOut(),
									className: "inline-flex items-center gap-1.5 rounded-md border border-destructive/30 bg-background px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/10 cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3 w-3" }), "Sign Out"]
								})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => signInWithGoogle(),
									className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs cursor-pointer",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-3.5 w-3.5" }), "Connect Google Account"]
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border/80 bg-card p-4 space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-xs font-semibold text-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardDrive, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Google Drive AppData Storage Summary" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-medium",
										children: "drive.appdata Scope"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Your PaperAtlas files are stored exclusively in your Google Account’s application data directory. Third parties cannot inspect or modify these files."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-3 gap-3 pt-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border/60 bg-muted/30 p-3 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-lg font-bold font-mono text-foreground",
												children: storageStats.papersCount
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5",
												children: "Papers Stored"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border/60 bg-muted/30 p-3 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-lg font-bold font-mono text-foreground",
												children: storageStats.analysesCount
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5",
												children: "Saved Analyses"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-border/60 bg-muted/30 p-3 text-center",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-lg font-bold font-mono text-foreground",
												children: storageStats.questionsCount
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5",
												children: "Questions Asked"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 text-[11px] text-muted-foreground flex items-center justify-between border-t border-border/40 pt-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["AppData Sync Target: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: "drive.appdata" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-emerald-600 dark:text-emerald-400 font-medium",
										children: "✓ User-Owned Storage Active"
									})]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					eyebrow: "Profile",
					title: "Profile Details",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Full Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								value: userName,
								readOnly: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Google Account Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								className: inputCls,
								value: userEmail,
								readOnly: true
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					eyebrow: "Workspace",
					title: "Workspace settings",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Workspace name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: inputCls,
								defaultValue: `${userName.split(" ")[0]}'s Research Atlas`
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Default paper view",
							hint: "How papers appear in your library.",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								className: inputCls,
								value: defaultView,
								onChange: (e) => setDefaultView(e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "grid",
										children: "Grid"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "list",
										children: "List"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "compact",
										children: "Compact"
									})
								]
							})
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					eyebrow: "Appearance",
					title: "Theme",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: ["light", "dark"].map((mode) => {
							const active = theme === mode;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => handleSetTheme(mode),
								className: `flex items-center gap-3 rounded-md border px-4 py-3 text-left transition cursor-pointer ${active ? "border-primary bg-primary/5" : "border-border bg-background hover:bg-muted"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `grid h-9 w-9 place-items-center rounded-md ${active ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(mode === "light" ? Sun : Moon, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm font-medium capitalize text-foreground",
									children: [mode, " mode"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground",
									children: mode === "light" ? "Warm ivory editorial surface." : "Charcoal surface for low light."
								})] })]
							}, mode);
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					eyebrow: "Preferences",
					title: "Analysis behavior",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
								title: "Automatically open analysis after processing",
								description: "Jump straight into a paper once PaperAtlas finishes structuring it.",
								checked: autoOpen,
								onChange: setAutoOpen
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
								title: "Show source references",
								description: "Display citation cards with page and section for every answer.",
								checked: showSources,
								onChange: setShowSources
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRow, {
								title: "Enable chat history",
								description: "Keep your questions and answers in Google Drive AppData for review.",
								checked: chatHistory,
								onChange: setChatHistory
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					eyebrow: "Diagnostics",
					title: "System & AI Service Status",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-muted-foreground",
								children: "Live backend health check from FastAPI & Database"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: fetchHealth,
								disabled: healthLoading,
								className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1 text-xs text-foreground hover:bg-muted cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: `h-3 w-3 ${healthLoading ? "animate-spin" : ""}` }), "Check Status"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-background p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-3.5 w-3.5" }), " Backend Service"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-sm font-semibold text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-2 w-2 rounded-full ${health?.status === "ok" ? "bg-emerald-500" : "bg-amber-500"}` }), health?.status === "ok" ? "Healthy (Active)" : healthLoading ? "Checking..." : "Offline"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[11px] text-muted-foreground mt-0.5 capitalize",
											children: [health?.environment || "Development", " mode"]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-background p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "h-3.5 w-3.5" }), " Database Engine"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-sm font-semibold text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }), health?.database || "Connected (Active)"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground mt-0.5",
											children: "16 Relational Models"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-background p-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2 text-xs font-medium text-muted-foreground mb-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }), " AI Inference Engine"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-sm font-semibold text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-emerald-500" }), health?.ai_service || "Local + Gemini Fallback"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[11px] text-muted-foreground mt-0.5",
											children: "Structure-Aware Grounded"
										})
									]
								})
							]
						})]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					eyebrow: "Data",
					title: "Data Ownership & Export",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "divide-y divide-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium text-foreground",
									children: "Export PaperAtlas Data (JSON)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-xs text-muted-foreground",
									children: "Download a full backup of all your papers, analyses, and Q&A chat history."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleExportData,
								className: "inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm font-medium text-foreground hover:bg-muted cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "h-4 w-4 text-primary" }), "Export JSON"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-medium text-foreground",
									children: "Reset Workspace Cache"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-0.5 text-xs text-muted-foreground",
									children: "Clear local cache and Google Drive AppData files."
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: handleClearData,
								className: "inline-flex items-center gap-2 rounded-md border border-destructive/40 bg-background px-3 py-2 text-sm text-destructive hover:bg-destructive/10 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "h-4 w-4" }), "Clear AppData"]
							})]
						})]
					})
				})
			]
		})
	});
}
//#endregion
export { SettingsPage as component };
