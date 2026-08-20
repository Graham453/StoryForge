import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));

// Serve StoryForge
app.use(express.static(__dirname));

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "StoryForge is running" });
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`StoryForge running on port ${PORT}`);
});
