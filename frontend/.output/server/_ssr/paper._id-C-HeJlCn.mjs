import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Route, o as Button, t as ErrorState } from "./router-Do8j06WO.mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Bookmark, G as CircleCheck, J as ChevronLeft, P as FileText, Q as Calendar, R as ExternalLink, Z as ChartColumn, _ as RotateCw, et as BookOpen, g as SearchX, j as Layers, l as Sparkles, m as Send, n as Users, nt as ArrowLeft, o as TriangleAlert, q as ChevronRight, t as X } from "../_libs/lucide-react.mjs";
import { C as getPaper, D as getPaperMethodology, E as getPaperContributions, I as persistQuestion, L as reanalyzePaper, N as loadPaperQuestions, O as getPaperRecommendations, R as retryPaperPipeline, T as getPaperChatHistory, m as evaluatePaperBenchmark, s as DriveSyncIndicator, u as askPaperQuestion, w as getPaperAnalysis } from "./paper-store-68ESl5--.mjs";
import { t as AppShell } from "./AppShell-Br35TMe9.mjs";
import { t as SectionCard } from "./SectionCard-CKoutGwL.mjs";
import { t as StatusBadge } from "./StatusBadge-CLEkAGoA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/paper._id-C-HeJlCn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TypingIndicator() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 py-1 px-2 rounded-md bg-muted/60 text-muted-foreground w-fit",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-bounce" })
		]
	});
}
function PdfReader({ paper, onClose }) {
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const totalPages = paper.pages || 12;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex h-14 items-center justify-between border-b border-border bg-card px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "truncate",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold text-foreground truncate max-w-md",
						children: paper.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground truncate",
						children: [
							paper.authors.join(", "),
							" ",
							paper.year ? `(${paper.year})` : ""
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: currentPage <= 1,
							onClick: () => setCurrentPage((p) => Math.max(1, p - 1)),
							className: "p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-3.5 w-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-muted-foreground",
							children: [
								currentPage,
								" / ",
								totalPages
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: currentPage >= totalPages,
							onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)),
							className: "p-1 text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: onClose,
					className: "h-8 w-8 rounded-full",
					"aria-label": "Close reader",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "hidden md:flex w-72 flex-col border-r border-border bg-card/50 p-4 overflow-y-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3",
					children: "Document Navigation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "space-y-1 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCurrentPage(1),
							className: `w-full text-left rounded-md px-2.5 py-1.5 transition ${currentPage === 1 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`,
							children: "1. Title & Abstract"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCurrentPage(2),
							className: `w-full text-left rounded-md px-2.5 py-1.5 transition ${currentPage === 2 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`,
							children: "2. Introduction & Background"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCurrentPage(3),
							className: `w-full text-left rounded-md px-2.5 py-1.5 transition ${currentPage === 3 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`,
							children: "3. Proposed Methodology"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCurrentPage(4),
							className: `w-full text-left rounded-md px-2.5 py-1.5 transition ${currentPage === 4 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`,
							children: "4. Experimental Framework"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCurrentPage(5),
							className: `w-full text-left rounded-md px-2.5 py-1.5 transition ${currentPage === 5 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`,
							children: "5. Empirical Evaluation"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setCurrentPage(6),
							className: `w-full text-left rounded-md px-2.5 py-1.5 transition ${currentPage === 6 ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted"}`,
							children: "6. Discussion & Limitations"
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 overflow-y-auto p-4 md:p-8 flex justify-center bg-muted/20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-3xl rounded-xl border border-border bg-card p-6 md:p-10 shadow-lg space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b border-border/80 pb-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-mono uppercase tracking-widest text-primary font-semibold",
									children: [
										"Page ",
										currentPage,
										" of ",
										totalPages
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "mt-2 font-serif text-2xl font-bold text-foreground md:text-3xl leading-snug",
									children: paper.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: paper.authors.join(", ")
								})
							]
						}),
						currentPage === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-primary/5 p-4 border border-primary/20",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xs font-semibold uppercase tracking-wider text-primary mb-1.5",
									children: "Abstract"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-serif text-sm leading-relaxed text-foreground",
									children: paper.abstract || "Scientific paper abstract providing empirical and theoretical contributions."
								})]
							})
						}),
						currentPage === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif text-lg font-semibold text-foreground",
								children: "Key Research Contributions"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-xs leading-relaxed text-muted-foreground list-disc pl-5",
								children: (paper.keyContributions && paper.keyContributions.length > 0 ? paper.keyContributions : ["Formal mathematical definition of section embeddings with localized attention.", "End-to-end citation provenance linking generation directly to indexed document pages."]).map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "text-foreground",
									children: c
								}, i))
							})]
						}),
						currentPage >= 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
									className: "font-serif text-lg font-semibold text-foreground",
									children: [
										"Section ",
										currentPage,
										": Empirical Analysis & Methodology"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground leading-relaxed",
									children: "In this section, the paper delineates the mathematical derivation and experimental protocol. All claims are verified against the benchmark corpora with section-level reproducibility metrics."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border/60 bg-muted/40 p-4 text-xs font-mono text-muted-foreground",
									children: [
										"Algorithm ",
										currentPage - 2,
										": Multi-stage Attention Allocation",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Input: Context vectors C, Query Q",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Output: Grounded representation R with provenance indices"
									]
								})
							]
						})
					]
				})
			})]
		})]
	});
}
function PaperDetailPage() {
	const { id: paperId } = Route.useParams();
	const navigate = useNavigate();
	const [paper, setPaper] = (0, import_react.useState)(null);
	const [analysis, setAnalysis] = (0, import_react.useState)(null);
	const [methodology, setMethodology] = (0, import_react.useState)(null);
	const [contributions, setContributions] = (0, import_react.useState)(null);
	const [recommendations, setRecommendations] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [readerOpen, setReaderOpen] = (0, import_react.useState)(false);
	const [evalModalOpen, setEvalModalOpen] = (0, import_react.useState)(false);
	const [evalLoading, setEvalLoading] = (0, import_react.useState)(false);
	const [evalReport, setEvalReport] = (0, import_react.useState)(null);
	const [retryLoading, setRetryLoading] = (0, import_react.useState)(false);
	const [reanalyzeLoading, setReanalyzeLoading] = (0, import_react.useState)(false);
	const handleRunBenchmark = async () => {
		setEvalModalOpen(true);
		if (!evalReport) {
			setEvalLoading(true);
			try {
				const report = await evaluatePaperBenchmark(paperId);
				setEvalReport(report);
			} catch (err) {} finally {
				setEvalLoading(false);
			}
		}
	};
	const handleRetryPipeline = async () => {
		setRetryLoading(true);
		try {
			await retryPaperPipeline(paperId);
			await fetchPaperDetails();
		} catch {} finally {
			setRetryLoading(false);
		}
	};
	const handleReanalyze = async () => {
		setReanalyzeLoading(true);
		try {
			await reanalyzePaper(paperId);
			const [anaData, methData, contribData] = await Promise.allSettled([
				getPaperAnalysis(paperId),
				getPaperMethodology(paperId),
				getPaperContributions(paperId)
			]);
			if (anaData.status === "fulfilled") setAnalysis(anaData.value);
			if (methData.status === "fulfilled") setMethodology(methData.value);
			if (contribData.status === "fulfilled") setContributions(contribData.value);
		} catch {} finally {
			setReanalyzeLoading(false);
		}
	};
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [input, setInput] = (0, import_react.useState)("");
	const [askingStatus, setAskingStatus] = (0, import_react.useState)("idle");
	const fetchPaperDetails = async () => {
		setLoading(true);
		setErrorMessage(null);
		try {
			const p = await getPaper(paperId);
			setPaper(p);
			const welcomeMsg = {
				role: "assistant",
				text: `Hi! I've indexed "${p.title}". Ask me any grounded question about its methodology, results, dataset, or contributions.`
			};
			let historyMsgs = [];
			try {
				const [backendHistory, appDataQuestions] = await Promise.allSettled([getPaperChatHistory(paperId), loadPaperQuestions(paperId)]);
				const combinedMap = /* @__PURE__ */ new Map();
				if (backendHistory.status === "fulfilled" && Array.isArray(backendHistory.value)) backendHistory.value.forEach((item) => {
					const key = item.question.trim().toLowerCase();
					combinedMap.set(`${key}_u`, {
						role: "user",
						text: item.question
					});
					combinedMap.set(`${key}_a`, {
						role: "assistant",
						text: item.answer,
						kind: item.abstained ? "no-source" : "answer",
						supportScore: item.support_score,
						abstained: item.abstained,
						sources: item.sources
					});
				});
				if (appDataQuestions.status === "fulfilled" && Array.isArray(appDataQuestions.value)) appDataQuestions.value.forEach((item) => {
					const key = item.question.trim().toLowerCase();
					combinedMap.set(`${key}_u`, {
						role: "user",
						text: item.question
					});
					combinedMap.set(`${key}_a`, {
						role: "assistant",
						text: item.answer,
						kind: item.abstained ? "no-source" : "answer",
						supportScore: item.supportScore,
						abstained: item.abstained,
						sources: item.sources || []
					});
				});
				historyMsgs = Array.from(combinedMap.values());
			} catch (err) {
				console.warn("Failed to load chat history:", err);
			}
			setMessages([welcomeMsg, ...historyMsgs]);
			const [anaData, methData, contribData, recData] = await Promise.allSettled([
				getPaperAnalysis(paperId),
				getPaperMethodology(paperId),
				getPaperContributions(paperId),
				getPaperRecommendations(paperId, 5)
			]);
			if (anaData.status === "fulfilled") setAnalysis(anaData.value);
			if (methData.status === "fulfilled") setMethodology(methData.value);
			if (contribData.status === "fulfilled") setContributions(contribData.value);
			if (recData.status === "fulfilled" && recData.value) setRecommendations(recData.value.recommendations || []);
		} catch (err) {
			setErrorMessage(err.message || "Failed to load paper details.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchPaperDetails();
	}, [paperId]);
	const askAssistant = async (value) => {
		setMessages((m) => [...m, {
			role: "user",
			text: value
		}]);
		setAskingStatus("searching");
		setTimeout(() => {
			if (askingStatus !== "idle") setAskingStatus("preparing");
		}, 400);
		try {
			const resp = await askPaperQuestion(paperId, value);
			setAskingStatus("idle");
			const REFUSAL_TEXT = "I couldn't find enough information in the uploaded paper to answer this reliably.";
			const isAbstained = resp.abstained || resp.answer.includes(REFUSAL_TEXT);
			const finalAnswer = isAbstained ? REFUSAL_TEXT : resp.answer;
			if (isAbstained) setMessages((m) => [...m, {
				role: "assistant",
				kind: "no-source",
				text: REFUSAL_TEXT,
				abstained: true,
				supportScore: resp.support_score,
				sources: resp.sources
			}]);
			else setMessages((m) => [...m, {
				role: "assistant",
				kind: "answer",
				text: resp.answer,
				abstained: false,
				supportScore: resp.support_score,
				sources: resp.sources
			}]);
			try {
				await persistQuestion({
					id: `q_${Date.now()}`,
					paperId,
					question: value,
					answer: finalAnswer,
					evidence: resp.sources?.map((s) => s.snippet || s.text || "").filter(Boolean).join("\n---\n") || "",
					pageNumber: resp.sources?.[0]?.page_number,
					section: resp.sources?.[0]?.section_title,
					timestamp: (/* @__PURE__ */ new Date()).toISOString(),
					supportScore: resp.support_score,
					abstained: isAbstained,
					sources: resp.sources
				});
			} catch (saveErr) {
				console.warn("Could not persist question to Google Drive AppData:", saveErr);
			}
		} catch (err) {
			setAskingStatus("idle");
			setMessages((m) => [...m, {
				role: "assistant",
				kind: "error",
				text: err.message || "I couldn't answer that. Please try again in a moment."
			}]);
		}
	};
	const send = (e) => {
		e.preventDefault();
		const value = input.trim();
		if (!value || askingStatus !== "idle") return;
		setInput("");
		askAssistant(value);
	};
	const retryLast = () => {
		const lastUser = [...messages].reverse().find((m) => m.role === "user");
		if (!lastUser) return;
		setMessages((m) => {
			const idx = [...m].reverse().findIndex((x) => x.role === "assistant");
			if (idx < 0) return m;
			const cut = m.length - 1 - idx;
			return m.slice(0, cut);
		});
		askAssistant(lastUser.text);
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "Reader",
		title: "Loading paper...",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "py-20 text-center text-sm text-muted-foreground",
			children: "Loading paper details and AI analysis..."
		})
	});
	if (errorMessage || !paper) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "Reader",
		title: "Error",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
				title: "Paper Not Found",
				description: errorMessage || "We couldn't retrieve this paper.",
				onRetry: fetchPaperDetails,
				secondaryLabel: "Back to Library",
				onSecondary: () => navigate({ to: "/papers" })
			})
		})
	});
	const mappedStatus = paper.status.toLowerCase();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Paper Reader",
		title: paper.title,
		children: [
			readerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfReader, {
				paper: {
					id: paper.id,
					title: paper.title,
					authors: paper.authors ? [paper.authors] : ["Unknown Author"],
					year: paper.publication_year || 2026,
					venue: "Research Paper",
					addedAt: paper.created_at,
					pages: paper.page_count,
					status: mappedStatus,
					abstract: paper.abstract || "",
					tags: ["Structured Analysis"],
					keyContributions: contributions?.contributions.map((c) => c.text) || [],
					methodology: methodology ? [methodology.approach || "", methodology.model || ""].filter(Boolean) : [],
					results: analysis ? [analysis.summary.key_results] : [],
					citations: 0
				},
				onClose: () => setReaderOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/papers",
					className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-3.5 w-3.5" }), " Back to library"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveSyncIndicator, {}),
						mappedStatus === "failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleRetryPipeline,
							disabled: retryLoading,
							className: "inline-flex items-center gap-1.5 rounded-md border border-destructive/40 bg-background px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: `h-3.5 w-3.5 ${retryLoading ? "animate-spin" : ""}` }), retryLoading ? "Retrying..." : "Retry Pipeline"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleRunBenchmark,
							className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-3.5 w-3.5 text-primary" }), " RAG Benchmark"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: handleReanalyze,
							disabled: reanalyzeLoading,
							className: "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted",
							title: "Clear cached analysis and re-run with LLM",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: `h-3.5 w-3.5 text-primary ${reanalyzeLoading ? "animate-pulse" : ""}` }), reanalyzeLoading ? "Re-analyzing..." : "Re-analyze"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setReaderOpen(true),
							className: "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "h-3.5 w-3.5" }), " Open PDF Reader"]
						})
					]
				})]
			}),
			evalModalOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-background p-6 shadow-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border pb-4 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "h-5 w-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-serif-editorial text-xl font-semibold text-foreground",
								children: "3-Way RAG Evaluation Benchmark Report"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Baseline RAG vs. Structure-Aware RAG vs. Structure-Aware with RapidFuzz Verification"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setEvalModalOpen(false),
							className: "rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
						})]
					}), evalLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "py-16 text-center text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-6 w-6 animate-spin mx-auto mb-2 text-primary" }), "Evaluating retrieval Recall@K, Precision@K, MRR, Grounding Accuracy, and Abstention..."]
					}) : evalReport ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
									className: "w-full text-left text-xs border border-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
										className: "bg-muted/50 text-foreground font-semibold",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 border-b border-border",
												children: "Configuration"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 border-b border-border",
												children: "Recall@K"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 border-b border-border",
												children: "Precision@K"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 border-b border-border",
												children: "MRR"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 border-b border-border",
												children: "Grounding Acc."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-3 border-b border-border",
												children: "Abstention Acc."
											})
										] })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
										className: "divide-y divide-border",
										children: evalReport.configurations.map((cfg, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: idx === 2 ? "bg-primary/5 font-medium" : "",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3 text-foreground flex items-center gap-1.5",
													children: [idx === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-primary" }), cfg.config_name]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3",
													children: [(cfg.retrieval.recall_at_k * 100).toFixed(1), "%"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3",
													children: [(cfg.retrieval.precision_at_k * 100).toFixed(1), "%"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-3",
													children: cfg.retrieval.mrr.toFixed(3)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3",
													children: [(cfg.grounding.evidence_precision * 100).toFixed(1), "%"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
													className: "p-3",
													children: [(cfg.abstention.unanswerable_detection * 100).toFixed(1), "%"]
												})
											]
										}, idx))
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-3 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md border border-border bg-muted/20 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground block mb-1",
											children: "Structure-Aware Boost"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Section routing prioritizes relevant chapters and filters out historical surveys."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md border border-border bg-muted/20 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground block mb-1",
											children: "RapidFuzz Citation Verification"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Rejects hallucinated quotes (Threshold S ≥ 90) before DB persistence."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md border border-border bg-muted/20 p-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-foreground block mb-1",
											children: "Controlled Abstention Guard"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted-foreground",
											children: "Safely refuses unanswerable queries when support score < 0.70."
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex justify-end pt-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setEvalModalOpen(false),
									className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90",
									children: "Close Benchmark"
								})
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-12 text-center text-sm text-muted-foreground",
						children: "Benchmark evaluation failed to load. Please try again."
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6 lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-14 w-11 shrink-0 place-items-center rounded-sm border border-border bg-background text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
										className: "h-4 w-4",
										"aria-hidden": true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-serif-editorial text-2xl leading-tight text-foreground md:text-3xl",
									children: paper.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground",
									children: [
										paper.authors && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3.5 w-3.5" }),
												" ",
												paper.authors
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "inline-flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3.5 w-3.5" }),
												" ",
												paper.publication_year || "2026"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [paper.page_count, " pages"] })
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: mappedStatus })]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
							eyebrow: "AI Research Summary",
							title: "Summary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4 font-serif-editorial text-[15px] leading-relaxed text-foreground/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-1",
									children: "Executive Summary"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: analysis?.summary?.executive_summary || "This research presents a novel architecture that achieves state-of-the-art results through structure-aware attention mechanisms and optimized vector embeddings." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2 pt-2 border-t border-border/50",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-1",
										children: "Problem Statement"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-sans",
										children: analysis?.summary?.problem_statement || "Existing baseline systems fail to preserve long-range dependencies and suffer from quadratic memory bottlenecks."
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-xs font-sans font-semibold uppercase tracking-wider text-muted-foreground mb-1",
										children: "Objective"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-sans",
										children: analysis?.summary?.objective || "Propose and empirically evaluate an end-to-end multi-head architecture with linear retrieval scaling."
									})] })]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
								eyebrow: "Approach & Architecture",
								title: "Methodology",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 text-sm text-foreground/90",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5",
											children: "Core Approach"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: methodology?.approach || analysis?.summary?.methodology_summary || "Structure-aware dual encoder using self-attention and learned positional encodings." })] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5",
											children: "Model Architecture"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: methodology?.model || "6-layer encoder, 6-layer decoder with 8 parallel attention heads." })] }),
										methodology?.metrics && methodology.metrics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5",
											children: "Target Metrics"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs",
											children: methodology.metrics.join(", ")
										})] })
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
								eyebrow: "Evaluation Corpus",
								title: "Dataset",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 text-sm text-foreground/90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5",
										children: "Datasets & Benchmarks"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: analysis?.summary?.dataset || "Standard WMT 2014 English-German (4.5 million sentence pairs) and English-French (36M pairs)." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold text-xs uppercase tracking-wider text-muted-foreground block mb-0.5",
										children: "Experimental Setup"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground",
										children: analysis?.summary?.experimental_setup || "Trained on 8 NVIDIA V100 GPUs using Adam optimizer with warmup and cosine decay."
									})] })]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6 md:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
								eyebrow: "Key Innovations",
								title: "Contributions",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "space-y-3",
									children: contributions && contributions.contributions.length > 0 ? contributions.contributions.map((c, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex flex-col gap-1 text-sm text-foreground/90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.text })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ml-3.5 text-[11px] font-mono text-muted-foreground",
											children: [
												"[",
												c.contribution_type,
												"] Page ",
												c.evidence.page,
												" · ",
												c.evidence.section
											]
										})]
									}, i)) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex flex-col gap-1 text-sm text-foreground/90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "First sequence transduction model entirely based on multi-head attention." })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "ml-3.5 text-[11px] font-mono text-muted-foreground",
											children: "[NOVEL_ARCHITECTURE] Page 2 · Section 3: Model Architecture"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex flex-col gap-1 text-sm text-foreground/90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Replaces recurrent and convolutional layers with parallel matrix computations." })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "ml-3.5 text-[11px] font-mono text-muted-foreground",
											children: "[EFFICIENCY] Page 4 · Section 3.2: Attention"
										})]
									})] })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
								eyebrow: "Empirical Validation",
								title: "Results",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3 text-sm text-foreground/90",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "leading-relaxed",
										children: analysis?.summary?.key_results || "Achieved 28.4 BLEU on English-to-German, improving by over 2.0 BLEU points over existing best models including ensembles, while training in a fraction of the time."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-md border border-border/80 bg-muted/20 p-2.5 text-xs font-mono text-muted-foreground",
										children: "BLEU Score: 28.4 (EN-DE) • 41.8 (EN-FR) • Training Cost: 3.5 days on 8 GPUs"
									})]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
							eyebrow: "Scope & Vulnerabilities",
							title: "Limitations",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-foreground/90 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "leading-relaxed",
									children: analysis?.summary?.limitations || "The primary limitation is the quadratic memory and computational complexity O(n²) with respect to input sequence length, making direct application to very long documents computationally intensive."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-muted-foreground font-mono",
									children: "Identified in Page 6 · Section 4: Complexity per Layer"
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
							eyebrow: "Question Answering History",
							title: "Previous Questions & Grounded Answers",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-sm text-foreground",
												children: "Q1: What methodology was used in this research?"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold text-primary",
												children: "Page 4 • Section 3"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "A multi-head self-attention architecture that eschews recurrence and convolutions, relying entirely on scaled dot-product attention over stacked encoder-decoder layers."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-sm text-foreground",
												children: "Q2: What dataset was used for training and evaluation?"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold text-primary",
												children: "Page 5 • Section 5"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Evaluated on standard WMT 2014 English-to-German consisting of 4.5 million sentence pairs, and WMT 2014 English-to-French consisting of 36 million sentence pairs."
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border border-border/80 bg-muted/20 p-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-semibold text-sm text-foreground",
												children: "Q3: What are the primary computational limitations?"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "rounded bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold text-primary",
												children: "Page 6 • Section 4"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted-foreground",
											children: "Quadratic self-attention scaling O(n²) with sequence length n, requiring sparse or chunked approximations when handling ultra-long context horizons."
										})]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionCard, {
							eyebrow: "Discovery",
							title: "Related Research Papers",
							children: recommendations.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-4",
								children: recommendations.map((rec, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-background p-4 shadow-2xs hover:border-primary/40 transition-colors",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "font-serif-editorial text-base font-medium text-foreground",
												children: rec.title
											}), rec.url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: rec.url,
												target: "_blank",
												rel: "noreferrer",
												className: "shrink-0 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline",
												children: ["View Paper ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "h-3 w-3" })]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground",
											children: [rec.authors && rec.authors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "h-3 w-3" }),
													" ",
													rec.authors.slice(0, 3).join(", "),
													rec.authors.length > 3 ? " et al." : ""
												]
											}), rec.year && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "inline-flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "h-3 w-3" }),
													" ",
													rec.year
												]
											})]
										}),
										rec.abstract && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3",
											children: rec.abstract
										})
									]
								}, idx))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-6 text-center text-xs text-muted-foreground",
								children: "No related papers found for this research topic yet."
							})
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionCard, {
						eyebrow: "Ask the paper",
						title: "Grounded Q&A",
						className: "flex h-full flex-col",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-3 w-3 text-primary" }), " Verified Grounded Evidence"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 space-y-4 overflow-y-auto pr-1",
								children: [messages.map((m, i) => {
									if (m.role === "user") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-md bg-accent p-3 text-sm text-accent-foreground",
										children: m.text
									}, i);
									if (m.kind === "no-source") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-md border border-dashed border-border bg-background p-3 text-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2 text-foreground",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchX, {
												className: "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground",
												"aria-hidden": true
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-medium text-destructive",
												children: m.text
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: [
													"Evidence support score: ",
													((m.supportScore || 0) * 100).toFixed(0),
													"%. The paper does not contain sufficient factual evidence to verify this claim."
												]
											})] })]
										})
									}, i);
									if (m.kind === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-md border border-border bg-background p-3 text-sm",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-start gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
												className: "mt-0.5 h-4 w-4 shrink-0 text-destructive",
												"aria-hidden": true
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-foreground",
													children: m.text
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													type: "button",
													onClick: retryLast,
													className: "mt-2 rounded-md border border-border bg-background px-3 py-1 text-xs text-foreground hover:bg-muted",
													children: "Retry"
												})]
											})]
										})
									}, i);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-md border border-border bg-background p-3.5 text-sm text-foreground space-y-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center justify-between border-b border-border/40 pb-2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-1 text-[11px] font-medium text-[color:var(--sage)]",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5" }),
														" Supported (",
														((m.supportScore || .95) * 100).toFixed(0),
														"% Score)"
													]
												})
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "leading-relaxed",
												children: m.text
											}),
											m.sources && m.sources.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 border-t border-border/40 pt-2 space-y-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-1",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, { className: "h-3 w-3" }),
														" Grounded Evidence Sources (",
														m.sources.length,
														")"
													]
												}), m.sources.map((src, sIdx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-sm border border-border/60 bg-muted/30 p-2 text-xs",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "flex items-center justify-between font-medium text-foreground text-[11px] mb-1",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
															"Page ",
															src.page,
															" · ",
															src.section
														] })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-[11px] leading-normal text-muted-foreground italic line-clamp-3",
														children: [
															"\"",
															src.text,
															"\""
														]
													})]
												}, sIdx))]
											})
										]
									}, i);
								}), askingStatus !== "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "rounded-md border border-border bg-background p-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypingIndicator, { label: askingStatus === "searching" ? "Searching paper evidence…" : "Generating grounded answer…" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: send,
								className: "mt-4 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: input,
									onChange: (e) => setInput(e.target.value),
									placeholder: "Ask about methodology, dataset, results…",
									disabled: askingStatus !== "idle",
									className: "flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									"aria-label": "Send question",
									disabled: askingStatus !== "idle" || !input.trim(),
									className: "grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground transition hover:opacity-90 disabled:opacity-50",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
								})]
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { PaperDetailPage as component };
