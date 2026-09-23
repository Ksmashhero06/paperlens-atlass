/**
 * PaperAtlas Persistent Data Store
 * 
 * 100% Self-Contained, Local-First Architecture:
 * - All research papers, analyses, claims, and Q&A history are stored locally in the user's browser.
 * - Zero Google Cloud or third-party cloud dependencies.
 * - Full JSON backup export and import for complete data ownership and portability.
 */

import { mockPapers } from "./mock-papers";
import { getPapers as getApiPapers, type PaperResponse } from "./api";

export interface AppDataPaper {
  id: string;
  title: string;
  authors?: string[];
  publicationYear?: number;
  pageCount?: number;
  fileName?: string;
  uploadedAt: string;
  processedAt?: string;
  processingStatus: "completed" | "processing" | "failed";
  summary?: string;
  researchObjective?: string;
  keyContributions?: string[];
  methodology?: string;
  dataset?: string;
  results?: string;
  limitations?: string[];
  keywords?: string[];
  sourceReferences?: Array<{ title: string; year?: number }>;
}

export interface AppDataAnalysis {
  paperId: string;
  analyzedAt: string;
  summary: {
    tldr: string;
    background: string;
    problem: string;
    key_solution: string;
    main_results: string;
    significance: string;
  };
  claims: Array<{
    claim_id: string;
    claim_text: string;
    confidence_score: number;
    evidence_items: Array<{
      evidence_id: string;
      page: number;
      section: string;
      text: string;
    }>;
  }>;
  methodology: {
    approach: string;
    model: string;
    algorithms: string;
    dataset: string;
    preprocessing: string;
    training: string;
    experimental_setup: string;
    metrics: string[];
    evidence: Array<{
      evidence_id: string;
      section: string;
      page: number;
      text: string;
    }>;
  };
  dataset: {
    name: string;
    size: string;
    splits: string;
    features: string;
  };
  results: {
    primary_metric: string;
    value: string;
    baseline_comparison: string;
    statistical_significance: string;
  };
  limitations: string[];
}

export interface AppDataQuestionItem {
  id: string;
  paperId: string;
  question: string;
  answer: string;
  evidence?: string;
  pageNumber?: number;
  section?: string;
  timestamp: string;
  supportScore?: number;
  abstained?: boolean;
  sources?: any[];
}

export type AppDataQuestion = AppDataQuestionItem;

const LOCAL_STORAGE_PAPERS = "paperatlas_local_papers";
const LOCAL_STORAGE_ANALYSES = "paperatlas_local_analyses";
const LOCAL_STORAGE_QUESTIONS = "paperatlas_local_questions";

// Convert mock papers into AppDataPaper format as seed fallback
function getSeedPapers(): AppDataPaper[] {
  return mockPapers.map((p) => ({
    id: p.id,
    title: p.title,
    authors: p.authors,
    publicationYear: p.year,
    pageCount: p.pages,
    fileName: `${p.id}.pdf`,
    uploadedAt: p.addedAt || new Date().toISOString(),
    processedAt: p.addedAt || new Date().toISOString(),
    processingStatus: "completed" as const,
    summary: p.abstract,
    researchObjective: "Investigate sequence-to-sequence neural architectures and multi-head attention.",
    keyContributions: p.keyContributions,
    methodology: p.methodology.join(" "),
    dataset: "WMT 2014 English-to-German / English-to-French",
    results: p.results.join(" "),
    limitations: ["High memory usage during long sequence generation", "Fixed positional encoding scaling"],
    keywords: p.tags,
    sourceReferences: [
      { title: "Attention Mechanisms in Deep Learning", year: 2017 },
      { title: "Sequence-to-Sequence Learning with Neural Networks", year: 2014 },
    ],
  }));
}

/**
 * Get locally cached papers
 */
export function getLocalPapers(): AppDataPaper[] {
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
export function setLocalPapers(papers: AppDataPaper[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LOCAL_STORAGE_PAPERS, JSON.stringify(papers));
  } catch (err) {
    console.warn("Failed to write papers to local storage:", err);
  }
}

/**
 * Get locally cached analysis for a paper
 */
export function getLocalAnalysis(paperId: string): AppDataAnalysis | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_ANALYSES);
    if (!raw) return null;
    const map = JSON.parse(raw);
    return map[paperId] || null;
  } catch {
    return null;
  }
}

/**
 * Save analysis to local cache
 */
export function setLocalAnalysis(analysis: AppDataAnalysis): void {
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
export function getLocalAnalyses(): Record<string, AppDataAnalysis> {
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
export function getLocalQuestions(paperId?: string): AppDataQuestionItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_QUESTIONS);
    if (!raw) return [];
    const map = JSON.parse(raw);
    if (paperId) {
      return map[paperId] || [];
    }
    const all: AppDataQuestionItem[] = [];
    Object.values(map).forEach((list: any) => {
      if (Array.isArray(list)) {
        all.push(...list);
      }
    });
    return all;
  } catch {
    return [];
  }
}

/**
 * Save question to local cache
 */
export function appendLocalQuestion(question: AppDataQuestionItem): void {
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

export interface SyncResult {
  source: "local" | "backend";
  papers: AppDataPaper[];
  driveConnected: boolean;
}

/**
 * Load all papers from local vault and backend
 */
export async function loadAllPapersWithSync(): Promise<SyncResult> {
  const local = getLocalPapers();

  try {
    const apiPapers = await getApiPapers();
    if (apiPapers && apiPapers.length > 0) {
      const mappedApiPapers: AppDataPaper[] = apiPapers.map((ap) => ({
        id: ap.id,
        title: ap.title,
        authors: ap.authors ? [ap.authors] : [],
        publicationYear: ap.publication_year,
        pageCount: ap.page_count || 10,
        fileName: ap.file_name,
        uploadedAt: ap.created_at,
        processedAt: ap.updated_at,
        processingStatus: ap.status === "READY" ? "completed" : (ap.status.toLowerCase() as any),
        summary: ap.abstract || "",
      }));

      const mergedMap = new Map<string, AppDataPaper>();
      for (const p of local) mergedMap.set(p.id, p);
      for (const p of mappedApiPapers) {
        if (!mergedMap.has(p.id)) mergedMap.set(p.id, p);
      }
      const combined = Array.from(mergedMap.values());
      setLocalPapers(combined);
      return { source: "backend", papers: combined, driveConnected: false };
    }
  } catch {
    // API not reachable
  }

  return { source: "local", papers: local, driveConnected: false };
}

/**
 * Persist paper to Local Vault
 */
export async function persistPaper(paper: AppDataPaper): Promise<{ driveSaved: boolean }> {
  const papers = getLocalPapers();
  const idx = papers.findIndex((p) => p.id === paper.id);
  if (idx >= 0) {
    papers[idx] = { ...papers[idx], ...paper };
  } else {
    papers.unshift(paper);
  }
  setLocalPapers(papers);
  return { driveSaved: false };
}

/**
 * Persist paper analysis to Local Vault
 */
export async function persistAnalysis(
  analysis: AppDataAnalysis
): Promise<{ driveSaved: boolean }> {
  setLocalAnalysis(analysis);
  return { driveSaved: false };
}

/**
 * Persist Q&A item to Local Vault
 */
export async function persistQuestion(
  question: AppDataQuestionItem
): Promise<{ driveSaved: boolean }> {
  appendLocalQuestion(question);
  return { driveSaved: false };
}

/**
 * Load questions for a paper from Local Vault
 */
export async function loadPaperQuestions(
  paperId: string
): Promise<AppDataQuestionItem[]> {
  return getLocalQuestions(paperId);
}

/**
 * Delete paper from Local Vault
 */
export async function deletePaperCompletely(
  paperId: string
): Promise<{ driveDeleted: boolean }> {
  const papers = getLocalPapers().filter((p) => p.id !== paperId);
  setLocalPapers(papers);
  return { driveDeleted: false };
}

/**
 * Export all user data as a formatted JSON string for backup/portability
 */
export function exportAllUserDataAsJson(): string {
  const papers = getLocalPapers();
  const analyses = getLocalAnalyses();
  const questions = getLocalQuestions();

  const exportPayload = {
    exportedAt: new Date().toISOString(),
    version: "2.0",
    appName: "PaperAtlas",
    storageType: "Local Vault (Offline & Private)",
    summary: {
      papersCount: papers.length,
      analysesCount: Object.keys(analyses).length,
      questionsCount: questions.length,
    },
    data: {
      papers,
      analyses,
      questions,
    },
  };

  return JSON.stringify(exportPayload, null, 2);
}

/**
 * Import user data from a previously exported JSON backup
 */
export function importUserDataFromJson(jsonStr: string): { success: boolean; count: number } {
  try {
    const parsed = JSON.parse(jsonStr);
    const data = parsed.data || parsed;

    if (data.papers && Array.isArray(data.papers)) {
      setLocalPapers(data.papers);
    }
    if (data.analyses && typeof data.analyses === "object") {
      localStorage.setItem(LOCAL_STORAGE_ANALYSES, JSON.stringify(data.analyses));
    }
    if (data.questions) {
      if (Array.isArray(data.questions)) {
        const map: Record<string, AppDataQuestionItem[]> = {};
        data.questions.forEach((q: AppDataQuestionItem) => {
          if (!map[q.paperId]) map[q.paperId] = [];
          map[q.paperId].push(q);
        });
        localStorage.setItem(LOCAL_STORAGE_QUESTIONS, JSON.stringify(map));
      } else if (typeof data.questions === "object") {
        localStorage.setItem(LOCAL_STORAGE_QUESTIONS, JSON.stringify(data.questions));
      }
    }
    return { success: true, count: data.papers?.length || 0 };
  } catch (err) {
    console.error("Failed to parse imported JSON:", err);
    return { success: false, count: 0 };
  }
}

/**
 * Clear all local data
 */
export async function clearAllAppData(): Promise<void> {
  if (typeof window !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_PAPERS);
    localStorage.removeItem(LOCAL_STORAGE_ANALYSES);
    localStorage.removeItem(LOCAL_STORAGE_QUESTIONS);
  }
}
