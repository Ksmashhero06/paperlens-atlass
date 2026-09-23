/**
 * Google Drive AppData Storage Service Layer
 * 
 * Manages personal PaperAtlas data inside the authenticated user's private
 * Google Drive Application Data folder (spaces=appDataFolder).
 * 
 * Strictly follows the least-privilege principle:
 * Only accesses https://www.googleapis.com/auth/drive.appdata.
 * Cannot access or modify user visible files.
 */

export interface AppDataPaper {
  id: string;
  title: string;
  authors: string[];
  publicationYear?: number;
  pageCount: number;
  fileName: string;
  fileSize?: number;
  uploadedAt: string;
  processedAt: string;
  processingStatus: "uploaded" | "processing" | "completed" | "failed";
  summary: string;
  researchObjective?: string;
  keyContributions?: string[];
  methodology?: string;
  dataset?: string;
  results?: string;
  limitations?: string[];
  keywords?: string[];
  sourceReferences?: Array<{
    title: string;
    authors?: string[];
    year?: number;
    url?: string;
  }>;
}

export interface AppDataAnalysis {
  paperId: string;
  summary: {
    executive_summary: string;
    problem_statement: string;
    objective: string;
    methodology_summary: string;
    key_contributions: string[];
    dataset: string;
    experimental_setup: string;
    key_results: string;
    limitations: string;
    conclusion: string;
  };
  claims: Array<{
    claim_id: string;
    claim_text: string;
    section: string;
    page: number;
  }>;
  methodology?: any;
  contributions?: any;
  recommendations?: any[];
  analyzedAt: string;
}

export interface AppDataQuestionItem {
  id: string;
  paperId: string;
  question: string;
  questionType?: string;
  answer: string;
  evidence?: string;
  section?: string;
  page?: number;
  supportScore?: number;
  abstained?: boolean;
  sources?: Array<{
    page: number;
    section: string;
    chunk_id?: string;
    text: string;
  }>;
  timestamp: string;
}

export interface AppDataUserSettings {
  userId: string;
  email: string;
  displayName: string;
  theme: "light" | "dark" | "system";
  autoSaveToDrive: boolean;
  lastSyncedAt?: string;
}

export interface AppDataDriveFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime?: string;
  size?: string;
}

// Canonical file names used inside Google Drive AppData
export const APPDATA_FILES = {
  USER: "paperatlas_user.json",
  PAPERS: "paperatlas_papers.json",
  ANALYSES: "paperatlas_analyses.json",
  QUESTIONS: "paperatlas_questions.json",
  SETTINGS: "paperatlas_settings.json",
} as const;

const DRIVE_API_URL = "https://www.googleapis.com/drive/v3";
const DRIVE_UPLOAD_URL = "https://www.googleapis.com/upload/drive/v3";

/**
 * List all application data files in the user's AppData folder.
 */
export async function listAppDataFiles(accessToken: string): Promise<AppDataDriveFile[]> {
  const url = `${DRIVE_API_URL}/files?spaces=appDataFolder&fields=files(id,name,mimeType,modifiedTime,size)&pageSize=50`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Google Drive access token has expired or is invalid.");
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to list AppData files: ${res.statusText}`);
  }

  const data = await res.json();
  return data.files || [];
}

/**
 * Find a specific file by name in the AppData folder.
 */
export async function findAppDataFile(
  fileName: string,
  accessToken: string
): Promise<AppDataDriveFile | null> {
  const query = encodeURIComponent(`name='${fileName}' and trashed=false`);
  const url = `${DRIVE_API_URL}/files?spaces=appDataFolder&q=${query}&fields=files(id,name,mimeType,modifiedTime,size)&pageSize=1`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Google Drive access token has expired or is invalid.");
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to find AppData file: ${res.statusText}`);
  }

  const data = await res.json();
  const files: AppDataDriveFile[] = data.files || [];
  return files.length > 0 ? files[0] : null;
}

/**
 * Read and parse JSON content of a file in AppData.
 */
export async function readAppDataFile<T>(fileId: string, accessToken: string): Promise<T> {
  const url = `${DRIVE_API_URL}/files/${fileId}?alt=media`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Google Drive access token has expired or is invalid.");
    }
    throw new Error(`Failed to read AppData file ${fileId}: HTTP ${res.status}`);
  }

  const text = await res.text();
  try {
    return JSON.parse(text) as T;
  } catch {
    return text as unknown as T;
  }
}

/**
 * Create a new JSON file inside the AppData folder using multipart upload.
 */
export async function createAppDataFile(
  fileName: string,
  content: any,
  accessToken: string
): Promise<string> {
  const boundary = `-------PaperAtlasBoundary${Date.now()}`;
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const metadata = {
    name: fileName,
    parents: ["appDataFolder"],
    mimeType: "application/json",
  };

  const serializedContent = typeof content === "string" ? content : JSON.stringify(content, null, 2);

  const multipartRequestBody =
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    JSON.stringify(metadata) +
    delimiter +
    "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
    serializedContent +
    closeDelimiter;

  const res = await fetch(`${DRIVE_UPLOAD_URL}/files?uploadType=multipart`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": `multipart/related; boundary=${boundary}`,
    },
    body: multipartRequestBody,
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Google Drive access token has expired or is invalid.");
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to create AppData file ${fileName}: HTTP ${res.status}`);
  }

  const data = await res.json();
  return data.id;
}

/**
 * Update content of an existing file in AppData folder.
 */
export async function updateAppDataFile(
  fileId: string,
  content: any,
  accessToken: string
): Promise<void> {
  const serializedContent = typeof content === "string" ? content : JSON.stringify(content, null, 2);

  const res = await fetch(`${DRIVE_UPLOAD_URL}/files/${fileId}?uploadType=media`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: serializedContent,
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Google Drive access token has expired or is invalid.");
    }
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error?.message || `Failed to update AppData file ${fileId}: HTTP ${res.status}`);
  }
}

/**
 * Delete a file from AppData folder.
 */
export async function deleteAppDataFile(fileId: string, accessToken: string): Promise<void> {
  const res = await fetch(`${DRIVE_API_URL}/files/${fileId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok && res.status !== 404) {
    if (res.status === 401) {
      throw new Error("Google Drive access token has expired or is invalid.");
    }
    throw new Error(`Failed to delete AppData file ${fileId}: HTTP ${res.status}`);
  }
}

/**
 * Convenience helper: Saves JSON data to AppData file.
 * Creates the file if it does not exist; updates it if it already exists.
 */
export async function saveJsonToAppData(
  fileName: string,
  data: any,
  accessToken: string
): Promise<string> {
  const existing = await findAppDataFile(fileName, accessToken);
  if (existing) {
    await updateAppDataFile(existing.id, data, accessToken);
    return existing.id;
  } else {
    return await createAppDataFile(fileName, data, accessToken);
  }
}

/**
 * Convenience helper: Loads JSON data from AppData file.
 * Returns null if the file does not exist.
 */
export async function loadJsonFromAppData<T>(
  fileName: string,
  accessToken: string
): Promise<T | null> {
  const existing = await findAppDataFile(fileName, accessToken);
  if (!existing) {
    return null;
  }
  return await readAppDataFile<T>(existing.id, accessToken);
}

// -------------------------------------------------------------
// High-Level Domain Operations for PaperAtlas
// -------------------------------------------------------------

/**
 * Load all user papers from Google Drive AppData.
 */
export async function loadPapersFromDrive(accessToken: string): Promise<AppDataPaper[]> {
  const data = await loadJsonFromAppData<AppDataPaper[]>(APPDATA_FILES.PAPERS, accessToken);
  return data || [];
}

/**
 * Save an entire list of papers to Google Drive AppData.
 */
export async function savePapersToDrive(
  papers: AppDataPaper[],
  accessToken: string
): Promise<void> {
  await saveJsonToAppData(APPDATA_FILES.PAPERS, papers, accessToken);
}

/**
 * Save or update a single paper in Google Drive AppData.
 */
export async function syncPaperToDrive(
  paper: AppDataPaper,
  accessToken: string
): Promise<void> {
  const papers = await loadPapersFromDrive(accessToken);
  const idx = papers.findIndex((p) => p.id === paper.id);
  if (idx >= 0) {
    papers[idx] = { ...papers[idx], ...paper, processedAt: new Date().toISOString() };
  } else {
    papers.unshift(paper);
  }
  await savePapersToDrive(papers, accessToken);
}

/**
 * Delete a paper and its associated analyses and questions from Google Drive AppData.
 */
export async function deletePaperFromDrive(
  paperId: string,
  accessToken: string
): Promise<void> {
  // 1. Remove from papers list
  const papers = await loadPapersFromDrive(accessToken);
  const filtered = papers.filter((p) => p.id !== paperId);
  await savePapersToDrive(filtered, accessToken);

  // 2. Remove from analyses map
  const analyses = (await loadJsonFromAppData<Record<string, AppDataAnalysis>>(
    APPDATA_FILES.ANALYSES,
    accessToken
  )) || {};
  if (analyses[paperId]) {
    delete analyses[paperId];
    await saveJsonToAppData(APPDATA_FILES.ANALYSES, analyses, accessToken);
  }

  // 3. Remove from questions map
  const questions = (await loadJsonFromAppData<Record<string, AppDataQuestionItem[]>>(
    APPDATA_FILES.QUESTIONS,
    accessToken
  )) || {};
  if (questions[paperId]) {
    delete questions[paperId];
    await saveJsonToAppData(APPDATA_FILES.QUESTIONS, questions, accessToken);
  }
}

/**
 * Load analysis for a specific paper from Google Drive AppData.
 */
export async function loadPaperAnalysisFromDrive(
  paperId: string,
  accessToken: string
): Promise<AppDataAnalysis | null> {
  const map = (await loadJsonFromAppData<Record<string, AppDataAnalysis>>(
    APPDATA_FILES.ANALYSES,
    accessToken
  )) || {};
  return map[paperId] || null;
}

/**
 * Save analysis for a specific paper to Google Drive AppData.
 */
export async function savePaperAnalysisToDrive(
  analysis: AppDataAnalysis,
  accessToken: string
): Promise<void> {
  const map = (await loadJsonFromAppData<Record<string, AppDataAnalysis>>(
    APPDATA_FILES.ANALYSES,
    accessToken
  )) || {};
  map[analysis.paperId] = analysis;
  await saveJsonToAppData(APPDATA_FILES.ANALYSES, map, accessToken);
}

/**
 * Load questions for a specific paper from Google Drive AppData.
 */
export async function loadQuestionsFromDrive(
  paperId: string,
  accessToken: string
): Promise<AppDataQuestionItem[]> {
  const map = (await loadJsonFromAppData<Record<string, AppDataQuestionItem[]>>(
    APPDATA_FILES.QUESTIONS,
    accessToken
  )) || {};
  return map[paperId] || [];
}

/**
 * Append or save a question and its evidence to Google Drive AppData.
 */
export async function saveQuestionToDrive(
  questionItem: AppDataQuestionItem,
  accessToken: string
): Promise<void> {
  const map = (await loadJsonFromAppData<Record<string, AppDataQuestionItem[]>>(
    APPDATA_FILES.QUESTIONS,
    accessToken
  )) || {};
  const list = map[questionItem.paperId] || [];
  list.push(questionItem);
  map[questionItem.paperId] = list;
  await saveJsonToAppData(APPDATA_FILES.QUESTIONS, map, accessToken);
}

/**
 * Synchronize user profile info to Google Drive AppData.
 */
export async function saveUserProfileToDrive(
  user: { id: string; email: string; name: string; profile_image?: string },
  accessToken: string
): Promise<void> {
  const userDoc = {
    ...user,
    last_login: new Date().toISOString(),
    storage_provider: "google_drive_appdata",
    storage_description: "Private Application Data Folder (drive.appdata)",
  };
  await saveJsonToAppData(APPDATA_FILES.USER, userDoc, accessToken);
}
