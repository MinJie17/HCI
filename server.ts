import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely, using the recommended client config with User-Agent.
let ai: GoogleGenAI | null = null;
try {
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("GEMINI_API_KEY is not defined in the environment. AI suggestions will run in fallback mock mode.");
  }
} catch (error) {
  console.error("Failed to initialize GoogleGenAI:", error);
}

// -------------------------------------------------------------
// SECURE SERVER-SIDE API ENDPOINTS
// -------------------------------------------------------------

// Post request to get real Gemini-powered Skill recommendations
app.post("/api/recommend", async (req, res) => {
  const { interests, goal } = req.body;

  if (!interests || !goal) {
    return res.status(400).json({ error: "Missing interests or user goals" });
  }

  // Fallback if API key is not present
  if (!ai) {
    return res.json({
      recommendations: [
        {
          skill: "UI/UX Design",
          reason: "To build visually appealing projects with streamlined layouts that support high readability.",
          difficulty: "Beginner Friendly",
          nextSteps: "Learn Canva design basics, read about human-computer interaction principles (Visibility, Feedback), and peer-up with Emily Watson."
        },
        {
          skill: "Public Speaking",
          reason: "Essential for sharing biotechnology lab results or engineering project pitches convincingly.",
          difficulty: "Intermediate",
          nextSteps: "Practice vocal modulation with Jason Raj or dry-run slides to build confident body posture."
        }
      ],
      aiTips: "Tip (API Key Missing): Make sure to check standard visual hierarchies and seek peer help in the QIU SkillSwap Discussion board!"
    });
  }

  try {
    const prompt = `You are a helpful academic peer-advisor bot for 'QIU SkillSwap', a collaborative university peer-learning portal.
Given a student's interests and learning goals, recommend 2 relevant skill categories from this list:
[Programming, Graphic Design, Video Editing, Public Speaking, Photography, Language Learning, Microsoft Excel, Canva Design, PowerPoint Presentation, UI/UX Design].

Student Interests: "${interests}"
Student Learning Goal: "${goal}"

Format the response strictly as valid JSON matching this schema:
{
  "recommendations": [
    {
      "skill": "Name of recommended skill from catalog",
      "reason": "Why this specific skill aligns with their goals/interests",
      "difficulty": "Beginner, Intermediate, or Advanced",
      "nextSteps": "Actionable advice on how to get started on Campus"
    }
  ],
  "aiTips": "A short, encouraging university-themed tip (max 120 characters)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const recommendationData = JSON.parse(responseText.trim());
    return res.json(recommendationData);
  } catch (error: any) {
    console.error("Gemini recommendation error:", error);
    return res.status(500).json({
      error: "Failed to generate recommendation via Gemini",
      details: error.message
    });
  }
});

// -------------------------------------------------------------
// VITE OR STATIC WEB HANDLER
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
