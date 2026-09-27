import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as SuccessState, s as cn, t as ErrorState } from "./router-Do8j06WO.mjs";
import { y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as FileText, V as CloudUpload, _ as RotateCw, t as X, tt as ArrowRight } from "../_libs/lucide-react.mjs";
import { B as uploadPaper, C as getPaper, F as persistPaper, P as persistAnalysis, R as retryPaperPipeline, k as getPaperStatus, w as getPaperAnalysis } from "./paper-store-68ESl5--.mjs";
import { t as AppShell } from "./AppShell-Br35TMe9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/upload-C1-s9-K3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_MB = 20;
var PIPELINE_STAGES = [
	{
		key: "UPLOAD",
		label: "PDF uploaded",
		description: "Binary payload stored & verified"
	},
	{
		key: "PDF_VALIDATION",
		label: "PDF validation",
		description: "Verifying document layout & academic structure"
	},
	{
		key: "TEXT_EXTRACTION",
		label: "Text extraction",
		description: "Extracting academic text, equations & tables"
	},
	{
		key: "SECTION_DETECTION",
		label: "Section detection",
		description: "Identifying scientific sections & hierarchy"
	},
	{
		key: "CHUNKING",
		label: "Structure chunking",
		description: "Structure-aware semantic chunking with overlap"
	},
	{
		key: "EMBEDDING",
		label: "Generating embeddings",
		description: "Computing 768-dim normalized representations"
	},
	{
		key: "VECTOR_INDEXING",
		label: "Vector indexing",
		description: "Building high-performance retrieval index"
	},
	{
		key: "PAPER_ANALYSIS",
		label: "Paper analysis",
		description: "Extracting claims, methodology & findings"
	},
	{
		key: "SAVE_APPDATA",
		label: "Save to Google Drive AppData",
		description: "Persisting encrypted paper & analysis to user Google Account"
	},
	{
		key: "READY",
		label: "Analysis Ready",
		description: "Saved to Google Drive & ready for grounded research"
	}
];
function formatSize(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(2)} MB`;
}
function UploadPage() {
	const navigate = useNavigate();
	const [phase, setPhase] = (0, import_react.useState)("idle");
	const [file, setFile] = (0, import_react.useState)(null);
	const [dragOver, setDragOver] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [paperId, setPaperId] = (0, import_react.useState)(null);
	const [statusResponse, setStatusResponse] = (0, import_react.useState)(null);
	const inputRef = (0, import_react.useRef)(null);
	const acceptFile = (rawFile) => {
		setErrorMessage(null);
		if (!(rawFile.name.toLowerCase().endsWith(".pdf") || rawFile.type === "application/pdf")) {
			setErrorMessage("Only PDF files are supported.");
			return;
		}
		if (rawFile.size > MAX_MB * 1024 * 1024) {
			setErrorMessage(`File size exceeds limit of ${MAX_MB}MB.`);
			return;
		}
		setFile({
			raw: rawFile,
			name: rawFile.name,
			sizeBytes: rawFile.size
		});
		setPhase("selected");
	};
	const onDrop = (e) => {
		e.preventDefault();
		setDragOver(false);
		const dropped = Array.from(e.dataTransfer.files);
		if (dropped.length > 0) acceptFile(dropped[0]);
	};
	const clearAll = () => {
		setFile(null);
		setPhase("idle");
		setErrorMessage(null);
		setPaperId(null);
		setStatusResponse(null);
		if (inputRef.current) inputRef.current.value = "";
	};
	const startUploadAndAnalyze = async () => {
		if (!file) return;
		setPhase("uploading");
		setErrorMessage(null);
		try {
			const uploadResp = await uploadPaper(file.raw);
			setPaperId(uploadResp.paper_id);
			setPhase("processing");
			toast.success("Document accepted", { description: "Executing 9-stage extraction & semantic indexing..." });
		} catch (err) {
			setPhase("processing-failed");
			setErrorMessage(err.message || "Failed to upload paper.");
		}
	};
	(0, import_react.useEffect)(() => {
		if (phase !== "processing" || !paperId) return;
		let isMounted = true;
		const interval = setInterval(async () => {
			try {
				const statusData = await getPaperStatus(paperId);
				if (!isMounted) return;
				setStatusResponse(statusData);
				if (statusData.status === "READY") {
					setPhase("done");
					clearInterval(interval);
					try {
						const [pDetails, pAnalysis] = await Promise.allSettled([getPaper(paperId), getPaperAnalysis(paperId)]);
						const resolvedPaper = {
							id: paperId,
							title: pDetails.status === "fulfilled" && pDetails.value.title ? pDetails.value.title : file?.name.replace(".pdf", "") || "Uploaded Paper",
							authors: pDetails.status === "fulfilled" && pDetails.value.authors ? [pDetails.value.authors] : [],
							publicationYear: pDetails.status === "fulfilled" ? pDetails.value.publication_year : 2026,
							pageCount: pDetails.status === "fulfilled" ? pDetails.value.page_count || 12 : 12,
							fileName: file?.name || "paper.pdf",
							fileSize: file?.sizeBytes,
							uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
							processedAt: (/* @__PURE__ */ new Date()).toISOString(),
							processingStatus: "completed",
							summary: pDetails.status === "fulfilled" ? pDetails.value.abstract || "" : ""
						};
						await persistPaper(resolvedPaper);
						if (pAnalysis.status === "fulfilled" && pAnalysis.value) await persistAnalysis({
							paperId,
							summary: pAnalysis.value.summary || {},
							claims: pAnalysis.value.claims || [],
							analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
						});
						toast.success("Saved to your Google Account", { description: "Paper and analysis securely stored in Google Drive AppData." });
					} catch (persistErr) {
						console.warn("Could not save to Google Drive AppData immediately:", persistErr);
					}
				} else if (statusData.status === "FAILED") {
					setPhase("processing-failed");
					setErrorMessage(statusData.processing_error || "Paper processing pipeline failed.");
					clearInterval(interval);
				}
			} catch (err) {
				if (!isMounted) return;
				setPhase("processing-failed");
				setErrorMessage(err.message || "Error checking paper processing status.");
				clearInterval(interval);
			}
		}, 1500);
		return () => {
			isMounted = false;
			clearInterval(interval);
		};
	}, [phase, paperId]);
	const handleRetry = async () => {
		if (!paperId) {
			if (file) startUploadAndAnalyze();
			return;
		}
		setPhase("processing");
		setErrorMessage(null);
		try {
			await retryPaperPipeline(paperId);
			toast.success("Pipeline resumed from checkpoint.");
		} catch (err) {
			setPhase("processing-failed");
			setErrorMessage(err.message || "Failed to launch pipeline retry.");
		}
	};
	const activeStageIndex = statusResponse?.stage_index ?? (phase === "uploading" ? 0 : 3);
	const currentStageInfo = PIPELINE_STAGES[activeStageIndex] || PIPELINE_STAGES[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		eyebrow: "Research Pipeline",
		title: "Analyze Paper",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border/60 pb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif-editorial text-3xl font-bold text-foreground",
					children: "Analyze a Research Paper"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Upload your paper to initiate section detection, vector embeddings, and evidence grounding."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6",
				children: [
					phase === "processing-failed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
						title: "Analysis could not be completed",
						description: errorMessage || "We ran into an issue while processing your paper.",
						onRetry: handleRetry,
						secondaryLabel: "Choose Another Paper",
						onSecondary: clearAll
					}),
					phase === "done" && paperId && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SuccessState, {
						title: "Research Analysis Ready!",
						description: "Paper structure, scientific sections, embeddings, and evidence index are fully verified and saved to your personal Google Drive AppData.",
						primary: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => navigate({
								to: "/paper/$id",
								params: { id: paperId }
							}),
							className: "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90 cursor-pointer",
							children: ["Open Paper Workspace ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						}),
						secondary: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: clearAll,
							className: "rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted cursor-pointer",
							children: "Upload Another Paper"
						})
					}),
					(phase === "uploading" || phase === "processing") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-6 md:p-8 space-y-6 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center space-y-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3.5 w-3.5 animate-spin" }), "Analyzing Your Research Paper"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-serif-editorial text-2xl font-bold text-foreground",
										children: "Processing Paper..."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground font-mono",
										children: file?.name ?? "Document.pdf"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border border-border/80 bg-muted/20 p-5 space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2",
									children: "Academic Pipeline Stages"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-2.5",
									children: PIPELINE_STAGES.map((stage, idx) => {
										const isCompleted = idx < activeStageIndex || phase === "done";
										const isActive = idx === activeStageIndex && phase !== "done";
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("flex items-center justify-between rounded-md px-3 py-2 text-xs transition-colors", isActive ? "bg-primary/10 border border-primary/30 text-foreground font-semibold" : isCompleted ? "text-muted-foreground hover:text-foreground" : "text-muted-foreground/60"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-3",
												children: [isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold",
													children: "✓"
												}) : isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold animate-pulse",
													children: "●"
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground text-[10px]",
													children: "○"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: cn("text-xs", isActive ? "text-primary font-bold" : "text-foreground"),
													children: stage.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-[10px] text-muted-foreground",
													children: stage.description
												})] })]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-[10px] font-mono",
												children: isCompleted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-emerald-600 dark:text-emerald-400 font-medium",
													children: "Verified"
												}) : isActive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-primary font-bold animate-pulse",
													children: "In Progress..."
												}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground/50",
													children: "Queued"
												})
											})]
										}, stage.key);
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center text-xs text-muted-foreground",
								children: ["Current Stage: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-foreground",
									children: currentStageInfo.label
								})]
							})
						]
					}),
					phase === "selected" && file && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-6 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-border bg-background text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-serif-editorial text-lg font-bold text-foreground",
									children: file.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [formatSize(file.sizeBytes), " • Ready to process"]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clearAll,
								className: "rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" })
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex items-center justify-end gap-3 border-t border-border/60 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: clearAll,
								className: "rounded-md px-4 py-2 text-sm text-muted-foreground hover:text-foreground",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: startUploadAndAnalyze,
								className: "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90",
								children: ["Start Research Pipeline ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})]
						})]
					}),
					phase === "idle" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						onDragOver: (e) => {
							e.preventDefault();
							setDragOver(true);
						},
						onDragLeave: () => setDragOver(false),
						onDrop,
						onClick: () => inputRef.current?.click(),
						className: cn("group relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 text-center transition cursor-pointer", dragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border/80 bg-card hover:border-primary/50 hover:bg-muted/30"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								ref: inputRef,
								type: "file",
								accept: ".pdf,application/pdf",
								className: "hidden",
								onChange: (e) => {
									if (e.target.files?.[0]) acceptFile(e.target.files[0]);
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-16 w-16 place-items-center rounded-full border border-border bg-background text-muted-foreground group-hover:text-primary group-hover:scale-110 transition",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-8 w-8" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-serif-editorial text-xl font-bold text-foreground",
								children: "Drop your research paper here"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: ["or ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary underline",
									children: "browse your files"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-border bg-background px-2.5 py-1",
										children: "PDF format"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-border bg-background px-2.5 py-1",
										children: "Up to 20 MB"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-border bg-background px-2.5 py-1",
										children: "9-stage index"
									})
								]
							})
						]
					})
				]
			})]
		})
	});
}
//#endregion
export { UploadPage as component };
