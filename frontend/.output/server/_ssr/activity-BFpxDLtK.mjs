import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as LoaderCircle, H as Clock, Q as Calendar, q as ChevronRight, x as MessageSquare } from "../_libs/lucide-react.mjs";
import { M as loadAllPapersWithSync, S as getLocalQuestions, j as getUserAnalyses, s as DriveSyncIndicator } from "./paper-store-68ESl5--.mjs";
import { t as AppShell } from "./AppShell-Br35TMe9.mjs";
import { t as SectionCard } from "./SectionCard-CKoutGwL.mjs";
import { t as EmptyState } from "./EmptyState-B7AoScHc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activity-BFpxDLtK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ActivityPage() {
	const [analyses, setAnalyses] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		async function loadData() {
			try {
				const [backendData, localSync] = await Promise.allSettled([getUserAnalyses(), loadAllPapersWithSync()]);
				const items = [];
				const seenIds = /* @__PURE__ */ new Set();
				if (backendData.status === "fulfilled" && Array.isArray(backendData.value)) backendData.value.forEach((item) => {
					seenIds.add(item.paper_id);
					items.push(item);
				});
				if (localSync.status === "fulfilled" && localSync.value.papers) {
					const questions = getLocalQuestions();
					localSync.value.papers.forEach((p) => {
						if (!seenIds.has(p.id)) {
							seenIds.add(p.id);
							const pQuestions = questions.filter((q) => q.paperId === p.id);
							items.push({
								id: `act_${p.id}`,
								paper_id: p.id,
								paper_title: p.title,
								authors: p.authors?.join(", ") || "",
								year: p.publicationYear || 2026,
								analyzed_at: p.processedAt || p.uploadedAt || (/* @__PURE__ */ new Date()).toISOString(),
								questions_count: pQuestions.length,
								status: p.processingStatus === "completed" ? "READY" : "PROCESSING",
								stage: p.processingStatus === "completed" ? "READY" : "ANALYZING",
								summary: p.summary || "Structured paper analysis backed by Google Drive AppData.",
								recent_question: pQuestions[0]?.question
							});
						}
					});
				}
				setAnalyses(items);
			} catch {} finally {
				setLoading(false);
			}
		}
		loadData();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "Analysis History",
		title: "My Analysis",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl space-y-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary",
							children: "Google Drive Preserved"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-serif-editorial text-3xl font-bold leading-tight text-foreground md:text-4xl",
						children: "My Analysis"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Revisit your previously analyzed research papers. Questions, findings, and grounded citations are permanently preserved in your Google Drive AppData."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveSyncIndicator, {})]
			}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-center py-16 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin mb-3 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Loading your analysis history..."
				})]
			}) : analyses.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				icon: Clock,
				title: "No previous analyses found",
				description: "Upload a research paper PDF in the dashboard or upload page to begin logging structure-aware analyses."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto rounded-xl border border-border bg-card shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "border-b border-border bg-muted/40 uppercase tracking-wider text-[11px] text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3.5 font-semibold",
									children: "Paper"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3.5 font-semibold",
									children: "Analyzed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3.5 font-semibold text-right",
									children: "Questions"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3.5 font-semibold",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-5 py-3.5 font-semibold text-right",
									children: "Action"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
							className: "divide-y divide-border/60",
							children: analyses.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "hover:bg-muted/20 transition-colors",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
										className: "px-5 py-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-semibold text-foreground font-serif-editorial text-sm line-clamp-1 max-w-md",
												children: item.paper_title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-0.5 text-[11px] text-muted-foreground flex items-center gap-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.authors || "Research Group" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.year || 2026 })
												]
											}),
											item.recent_question && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1.5 flex items-center gap-1.5 text-[11px] text-primary/90 font-mono",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-3 w-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
													"Recent Q: \"",
													item.recent_question,
													"\""
												] })]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-4 text-muted-foreground whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.analyzed_at })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-4 text-right font-mono font-medium whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-md bg-muted px-2 py-1 text-foreground",
											children: item.questions_count
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-4 whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-emerald-500" }), item.status]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-5 py-4 text-right whitespace-nowrap",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/paper/$id",
											params: { id: item.paper_id },
											className: "inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors",
											children: ["Open Analysis", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })]
										})
									})
								]
							}, item.id))
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
					eyebrow: "Preserved Knowledge",
					title: "Recent Analysis Insights",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: analyses.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col justify-between rounded-lg border border-border bg-background p-4 shadow-2xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[11px] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: a.analyzed_at }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-emerald-600 dark:text-emerald-400 font-mono font-medium",
											children: [a.questions_count, " queries"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-serif-editorial text-sm font-semibold text-foreground line-clamp-1",
										children: a.paper_title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground line-clamp-3 leading-relaxed",
										children: a.summary
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 pt-3 border-t border-border/50",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/paper/$id",
									params: { id: a.paper_id },
									className: "text-xs font-medium text-primary hover:underline flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Revisit Evidence Q&A" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3 w-3" })]
								})
							})]
						}, a.id))
					})
				})]
			})]
		})
	});
}
//#endregion
export { ActivityPage as component };
