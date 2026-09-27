import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { o as Button, s as cn, t as ErrorState } from "./router-Do8j06WO.mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { P as FileText, V as CloudUpload, _ as RotateCw, s as Trash2, y as Pencil, z as Ellipsis } from "../_libs/lucide-react.mjs";
import { M as loadAllPapersWithSync, R as retryPaperPipeline, a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, p as deletePaperCompletely, r as DialogDescription, s as DriveSyncIndicator, t as Dialog } from "./paper-store-68ESl5--.mjs";
import { a as DropdownMenuSeparator, i as DropdownMenuItem, n as DropdownMenu, o as DropdownMenuTrigger, r as DropdownMenuContent, s as SearchInput, t as AppShell } from "./AppShell-Br35TMe9.mjs";
import { t as EmptyState } from "./EmptyState-B7AoScHc.mjs";
import { t as StatusBadge } from "./StatusBadge-CLEkAGoA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/papers-ZD9si6Sb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConfirmDialog({ open, onOpenChange, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", tone = "default", onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "font-serif text-lg",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
				className: "text-xs text-muted-foreground leading-relaxed",
				children: description
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
				className: "gap-2 sm:gap-0 mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => onOpenChange(false),
					children: cancelLabel
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: tone === "danger" ? "destructive" : "default",
					size: "sm",
					onClick: () => {
						onConfirm();
						onOpenChange(false);
					},
					children: confirmLabel
				})]
			})]
		})
	});
}
var FILTERS = [
	"All",
	"Ready",
	"Processing",
	"Failed"
];
var SORTS = [{
	id: "recent-added",
	label: "Recently added"
}, {
	id: "title-asc",
	label: "Title A–Z"
}];
function matchesFilter(status, filter) {
	if (filter === "All") return true;
	return status.toUpperCase() === filter.toUpperCase();
}
function formatDate(iso) {
	if (!iso) return "Recent";
	return new Date(iso).toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function PapersPage() {
	const [papers, setPapers] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [sort, setSort] = (0, import_react.useState)("recent-added");
	const [pendingDelete, setPendingDelete] = (0, import_react.useState)(null);
	const fetchPapersList = async () => {
		setLoading(true);
		setErrorMessage(null);
		try {
			const mapped = (await loadAllPapersWithSync()).papers.map((p) => ({
				id: p.id,
				title: p.title,
				authors: p.authors?.join(", ") || "",
				publication_year: p.publicationYear || 2026,
				abstract: p.summary || "",
				file_name: p.fileName || "paper.pdf",
				page_count: p.pageCount || 12,
				status: p.processingStatus === "completed" ? "READY" : p.processingStatus === "failed" ? "FAILED" : "PROCESSING",
				created_at: p.uploadedAt || (/* @__PURE__ */ new Date()).toISOString(),
				processing_error: void 0
			}));
			setPapers(mapped);
		} catch (err) {
			setErrorMessage(err.message || "Failed to load papers library.");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		fetchPapersList();
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		const sorted = [...papers.filter((p) => {
			return (!query || p.title.toLowerCase().includes(query) || p.authors && p.authors.toLowerCase().includes(query) || p.file_name.toLowerCase().includes(query)) && matchesFilter(p.status, filter);
		})];
		if (sort === "title-asc") sorted.sort((a, b) => a.title.localeCompare(b.title));
		else sorted.sort((a, b) => a.created_at < b.created_at ? 1 : -1);
		return sorted;
	}, [
		papers,
		q,
		filter,
		sort
	]);
	const isLibraryEmpty = papers.length === 0 && !loading && !errorMessage;
	const handleRename = (paper) => {
		const next = window.prompt("Rename paper", paper.title);
		if (!next || next.trim() === "" || next === paper.title) return;
		setPapers((prev) => prev.map((p) => p.id === paper.id ? {
			...p,
			title: next.trim()
		} : p));
		toast.success("Paper renamed successfully");
	};
	const confirmDelete = async () => {
		if (!pendingDelete) return;
		const id = pendingDelete.id;
		try {
			await deletePaperCompletely(id);
			setPapers((prev) => prev.filter((p) => p.id !== id));
			toast.success("Paper deleted successfully from workspace and Google Drive");
		} catch (err) {
			toast.error(err.message || "Failed to delete paper.");
		} finally {
			setPendingDelete(null);
		}
	};
	const handleRetry = async (paperId) => {
		try {
			await retryPaperPipeline(paperId);
			toast.success("Pipeline retry triggered in background.");
			fetchPapersList();
		} catch (err) {
			toast.error(err.message || "Failed to trigger retry.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		eyebrow: "Library",
		title: "My Papers",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-serif-editorial text-3xl leading-tight text-foreground",
					children: "My Papers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Your analyzed research papers backed up to Google Drive AppData."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriveSyncIndicator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/upload",
						className: "inline-flex items-center gap-2 self-start rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 sm:self-auto cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, { className: "h-4 w-4" }), "Upload Paper"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-full lg:max-w-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchInput, {
						placeholder: "Search papers...",
						value: q,
						onChange: (e) => setQ(e.target.value)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex rounded-md border border-border bg-background p-0.5 text-xs",
						children: FILTERS.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setFilter(f),
							className: cn("rounded-sm px-3 py-1.5 font-medium transition", filter === f ? "bg-accent text-accent-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"),
							children: f
						}, f))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: sort,
						onChange: (e) => setSort(e.target.value),
						className: "rounded-md border border-border bg-background px-3 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none",
						children: SORTS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: s.id,
							children: s.label
						}, s.id))
					})]
				})]
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 py-16 text-center text-sm text-muted-foreground",
				children: "Loading paper library..."
			}) : errorMessage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorState, {
					title: "Failed to load library",
					description: errorMessage,
					onRetry: fetchPapersList
				})
			}) : isLibraryEmpty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "No papers in library yet",
					description: "Upload your first research paper PDF to structure sections and enable grounded Q&A.",
					actionLabel: "Upload First Paper",
					onAction: () => window.location.href = "/upload"
				})
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 py-12 text-center text-sm text-muted-foreground",
				children: "No papers match your search criteria. Try adjusting filters or query."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: filtered.map((paper) => {
					const mappedStatus = paper.status.toLowerCase();
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative flex flex-col justify-between rounded-lg border border-border bg-surface p-5 transition hover:border-border/80 hover:shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border bg-background text-muted-foreground",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {
											className: "h-4 w-4",
											"aria-hidden": true
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-medium uppercase tracking-wider text-muted-foreground",
										children: formatDate(paper.created_at)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-xs text-muted-foreground",
										children: [paper.page_count, " pages"]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: mappedStatus })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 font-serif-editorial text-lg leading-snug text-foreground group-hover:text-primary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/paper/$id",
									params: { id: paper.id },
									children: paper.title
								})
							}),
							paper.authors && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 line-clamp-1 text-xs text-muted-foreground",
								children: paper.authors
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [paper.status === "FAILED" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => handleRetry(paper.id),
									className: "inline-flex items-center gap-1 text-destructive hover:underline",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCw, { className: "h-3 w-3" }), " Retry"]
								}), paper.status === "PROCESSING" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs text-[color:var(--ochre)] font-medium",
									children: [
										paper.progress,
										"% ",
										paper.stage
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								className: "rounded-md p-1 hover:bg-muted focus:outline-none",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => handleRename(paper),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "mr-2 h-3.5 w-3.5" }), " Rename"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => setPendingDelete(paper),
										className: "text-destructive focus:text-destructive",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-2 h-3.5 w-3.5" }), " Delete"]
									})
								]
							})] })]
						})]
					}, paper.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: Boolean(pendingDelete),
				onOpenChange: (open) => !open && setPendingDelete(null),
				title: "Delete paper?",
				description: `Are you sure you want to delete "${pendingDelete?.title}"? All extracted sections and embeddings will be permanently removed.`,
				confirmLabel: "Delete Paper",
				tone: "danger",
				onConfirm: confirmDelete
			})
		]
	});
}
//#endregion
export { PapersPage as component };
