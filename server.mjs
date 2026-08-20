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

// StoryForge movie endpoint
app.post("/api/movie", async (req, res) => {
  try {
    const { story } = req.body;

    if (!story || !story.trim()) {
      return res.status(400).json({
        error: "Please provide a story."
      });
    }

    console.log("Movie request received:", story);

    // Temporary movie result
    // This confirms the frontend can communicate with the backend.
    res.json({
      success: true,
      message: "Story received by StoryForge backend.",
      story: story,
      movie: {
        title: "StoryForge Movie",
        duration: 20,
        status: "ready"
      }
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "StoryForge backend error."
    });
  }
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`StoryForge running on port ${PORT}`);
});
