import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json({ limit: "10mb" }));
app.use(express.static(__dirname));

app.get("/health", (req, res) => {
  res.json({ status: "StoryForge is running" });
});

app.post("/api/generate", async (req, res) => {
  try {
    const { story } = req.body;

    if (!story || !story.trim()) {
      return res.status(400).json({ error: "Story is required." });
    }

    res.json({
      scenes: [
        {
          description: story.trim(),
          duration: 20
        }
      ]
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Generation failed." });
  }
});

app.post("/api/regenerate-scene", async (req, res) => {
  try {
    const { description, scene } = req.body;

    res.json({
      scene: {
        ...(scene || {}),
        description: description || scene?.description || "Updated scene",
        duration: scene?.duration || 20
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Scene regeneration failed." });
  }
});

app.post("/api/render", async (req, res) => {
  try {
    const { scenes } = req.body;

    res.json({
      videoUrl: null,
      status: "ready",
      scenes: scenes || []
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Render failed." });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`StoryForge running on port ${PORT}`);
});
