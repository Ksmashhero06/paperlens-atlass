import path from "node:path";
import { preview } from "./frontend/node_modules/vite/dist/node/index.js";

const port = Number(process.env.PORT) || 3000;
const host = "0.0.0.0";

async function startServer() {
  console.log(`[PaperLens Server] Starting unified server on http://${host}:${port}...`);
  try {
    const previewServer = await preview({
      root: path.resolve("./frontend"),
      preview: {
        port,
        host,
        strictPort: false,
      },
    });

    console.log(`[PaperLens Server] PaperLens production server is active on port ${port}.`);
    previewServer.printUrls();
  } catch (err) {
    console.error("[PaperLens Server] Fatal error starting server:", err);
    process.exit(1);
  }
}

startServer();
