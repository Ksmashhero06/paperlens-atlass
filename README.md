# PaperAtlas — AI-Powered Research Paper Assistant with Google Drive AppData Ownership

PaperAtlas is an AI-powered research paper analysis platform with verified section-grounded citations, methodology extraction, empirical benchmarks, and **user-owned storage backed by Google Drive AppData (`https://www.googleapis.com/auth/drive.appdata`)**.

Instead of relying on a centralized proprietary database for personal research files, PaperAtlas implements a **Local-First + User-Owned Cloud Architecture**: your research papers, structured analyses, and Q&A chat history live in your own personal Google Account's hidden AppData folder.

---

## 1. Agentic Threat Modeling Summary (5 Threat Zones)

| Threat Zone | Identified Risk | Countermeasure Implemented |
|---|---|---|
| **Input Surfaces** | Malicious PDF files, oversized uploads, unvalidated query strings | Strict multipart size validation (20MB limit), MIME type filtering (`application/pdf`), and typed schema parsing with schema validation. |
| **Planning & Reasoning** | Prompt injection in research Q&A, instruction bypass, untrusted text execution | Context-bound system instructions treating uploaded PDF text and search snippets as passive evidence, never as executable instructions (OWASP LLM01). Grounded refusal text triggered if source evidence is insufficient. |
| **Tool Execution** | SSRF or dynamic code evaluation in analysis pipelines | Parameterized API queries, static route handling, and strict URL protocol validation. |
| **Memory & State** | Cross-user data leakage, unvalidated session tokens, token theft | Google OAuth tokens are kept **strictly in memory** (never in `localStorage`). Paper metadata and Q&A history are persisted directly to the user's private Google Drive AppData folder (`drive.appdata` scope), isolated per Google account. |
| **Inter-System Communication** | Gemini API quota exhaustion or transient outage; Google Drive API rate limits | Resilient 4-tier model fallback ladder (`gemini-3.6-flash` → `gemini-3.1-flash-lite` → `gemini-flash-latest` → `gemini-3.7-flash`). Google Drive AppData requests include optimistic local caching with automatic background retry and recovery. |

---

## 2. Architecture & Data Ownership Model

```text
                  User Upload / Q&A Interaction
                                │
                                ▼
                 Local-First Cache (Instant UI)
                                │
                                ▼
            Google Drive AppData Folder (User-Owned)
          ┌───────────────────────────────────────────┐
          │  https://www.googleapis.com/auth/         │
          │  drive.appdata                            │
          │                                           │
          │  - paperatlas_papers.json                 │
          │  - paperatlas_analyses.json               │
          │  - paperatlas_questions.json              │
          └───────────────────────────────────────────┘
```

- **Authentication**: Firebase Authentication with Google Sign-In provider and incremental OAuth scope request for `https://www.googleapis.com/auth/drive.appdata`.
- **Token Hygiene**: The Google OAuth `accessToken` is stored strictly in memory via `google-auth.ts`. On token expiry, a seamless popup refresh (`reconnectDrive()`) is provided.
- **AppData Isolation**: Files stored in `drive.appdata` are invisible in the user's standard Drive file list, preventing accidental deletion or clutter, while remaining 100% owned and controlled by the user.

---

## 3. Monorepo Project Structure

```text
├── frontend/
│   ├── src/
│   │   ├── routes/              # TanStack Start pages (/dashboard, /papers, /paper/$id, /upload, /activity, /settings, /help)
│   │   ├── components/          # Reusable UI cards, DriveSyncIndicator, AuthModal, SectionCard
│   │   ├── lib/                 # Core services:
│   │   │   ├── google-auth.ts   # Firebase Auth + Google OAuth token management
│   │   │   ├── google-drive.ts  # Google Drive AppData REST CRUD operations
│   │   │   ├── paper-store.ts   # Local-first synchronization engine
│   │   │   ├── auth-context.tsx # Reactive auth & sync state hook (useAuth)
│   │   │   └── api.ts           # Unified API client & Gemini endpoints
│   ├── vite-api-plugin.ts       # Unified API middleware with Gemini fallback ladder
│   ├── vite.config.ts           # Dev & preview server configuration
│   └── package.json             # Frontend dependencies
├── backend/                     # Python FastAPI & Alembic database services
├── metadata.json                # AI Studio application capabilities & metadata
└── README.md                    # Deployment, security, and verification guide
```

---

## 4. Environment & Prerequisites

### Prerequisites & Google Cloud APIs
- Node.js 20+ (Node 22 recommended)
- Google Cloud SDK (`gcloud` CLI)
- Enable required Google Cloud APIs for Cloud Run, Secret Manager, Cloud Build, and Firestore:
```bash
gcloud services enable \
  run.googleapis.com \
  secretmanager.googleapis.com \
  cloudbuild.googleapis.com \
  firestore.googleapis.com
```

### Configuration
Create `.env` from `.env.example`:
```bash
cp .env.example .env
```

Configure your environment variables:
```bash
GEMINI_API_KEY="your-gemini-api-key"
VITE_API_BASE_URL="/api/v1"
```

### Run Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 5. Google Cloud Secret Manager Setup

Store your operational Gemini API key securely in Google Cloud Secret Manager instead of hardcoding:

```bash
# Create and populate the secret
gcloud secrets create GEMINI_API_KEY --replication-policy="automatic"
echo -n "YOUR_API_KEY" | gcloud secrets versions add GEMINI_API_KEY --data-file=-

# Grant the default Cloud Run service account access to read the secret
gcloud secrets add-iam-policy-binding GEMINI_API_KEY \
  --member="serviceAccount:YOUR_PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

---

## 6. Firestore Security Rules

When persistent database storage is attached, enforce strict user data isolation via owner-bound rules in `firestore.rules`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/interactions/{interactionId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 7. Google Cloud Run Deployment Flow

The project is configured with a unified `server.ts` entrypoint that automatically respects Cloud Run's dynamic `$PORT` environment variable and integrates with Vite preview and the `/api/v1` backend.

### Preventing Quota / Resource Exhaustion:
- `.gcloudignore` and `.dockerignore` ensure that local heavy folders (`node_modules`, `backend/Data`, test logs) are excluded from Cloud Build source archives, preventing Cloud Storage and build quota limits (`Resource has been exhausted (e.g. check quota)`).
- The Gemini generation engine uses a 4-tier fallback ladder with backoff retries and context synthesis to withstand API rate limits.

### Build and Deploy:
```bash
# Deploy to Google Cloud Run with secret bindings
gcloud run deploy paperatlas \
  --source . \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-secrets GEMINI_API_KEY=GEMINI_API_KEY:latest
```

---

## 8. Required Campaign Labeling

Apply the mandatory challenge verification label to register your Cloud Run deployment:

```bash
gcloud run services update paperatlas \
  --update-labels=dev-tutorial=cloud-run-ai-challenge \
  --region asia-southeast1
```

---

## 9. Comprehensive Functional Stability & Walkthrough Test Cases

Every user interaction has a corresponding verifiable test case:

| Test Case | Interaction / Trigger | Step-by-Step Flow | Expected Outcome |
|---|---|---|---|
| **TC-01: Google Authentication** | Click "Sign In with Google" in TopBar, Sidebar, or AuthModal | 1. Click button.<br>2. Google OAuth popup opens requesting Google Drive AppData permission.<br>3. Authenticate with Google account. | User profile badge renders with photo and name. `DriveSyncIndicator` switches to `Connected (Drive AppData)`. Auth modal closes. |
| **TC-02: Drive Sync Indicator** | Inspect status badge in TopBar or Paper Header | 1. View `DriveSyncIndicator`.<br>2. Click badge to inspect tooltip or modal details. | Badge reflects active status: `Connecting...`, `Connected (Drive AppData)`, `Saving...`, `Saved`, or `Reconnect Required`. |
| **TC-03: Paper Upload & Drive Backup** | Upload PDF file on `/upload` page | 1. Drag & drop or select a PDF.<br>2. Click "Analyze Paper".<br>3. Observe 9-stage analysis pipeline. | Stage 8 ("Saving to Google Drive AppData") completes. `paperatlas_papers.json` and `paperatlas_analyses.json` are created/updated in Google Drive AppData. |
| **TC-04: Grounded Q&A Persistence** | Ask a question on `/paper/:id` | 1. Enter question in Q&A input.<br>2. Click Send.<br>3. Assistant generates grounded answer with citations. | Question turn is rendered in chat and saved to `paperatlas_questions.json` in user's Google Drive AppData. Reloading the page reloads the saved Q&A history. |
| **TC-05: Library Exploration & AppData Sync** | Navigate to `/papers` | 1. Open `/papers`.<br>2. Search or filter by status. | Papers stored in Google Drive AppData folder are loaded alongside workspace papers. Status filters operate smoothly. |
| **TC-06: Activity & Analysis Log** | Navigate to `/activity` | 1. Open `/activity`.<br>2. View table of past analyses and question counts. | Preserved paper analyses and Q&A counts from Google Drive AppData are displayed. |
| **TC-07: Settings & Storage Summary** | Navigate to `/settings` | 1. Open `/settings`.<br>2. Review "Google Account & Drive AppData" card. | Displays signed-in Google user name, email, avatar, storage status, and counts of stored papers, analyses, and questions. |
| **TC-08: Export Workspace Data** | Click "Export JSON" on `/settings` | 1. Click "Export JSON". | Instant download of `paperatlas_backup_YYYY-MM-DD.json` containing all papers, analyses, and questions. |
| **TC-09: Reconnect Drive Flow** | Click "Reconnect Drive" in Settings or Indicator | 1. Trigger Reconnect Drive button.<br>2. Google OAuth prompt re-authenticates token in memory. | Sync state changes to `Connected (Drive AppData)`. In-memory access token is refreshed without page reload. |
| **TC-10: Reset / Clear AppData** | Click "Clear AppData" on `/settings` | 1. Click "Clear AppData".<br>2. Confirm the browser dialog. | Local storage cache and Drive AppData collections are safely cleared. Dashboard counters reset to zero. |
