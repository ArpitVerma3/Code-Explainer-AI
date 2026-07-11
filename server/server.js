import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), "..", ".env") });

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests !! please try again later",
});
app.use(limiter);
app.use(express.json({ limit: "10mb" }));

app.post("/api/explain-code", async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) {
      return res.status(400).json({ error: "Code is Required" });
    }
    const messages = [
      {
        role: "user",
        parts: [
          {
            text: `Please explain this ${language || ""} code in simple terms:\n\n\`\`\`${language || ""}\n${code}\n\`\`\``,
          },
        ],
      },
    ];
    const response = await model.generateContent({
      contents: messages,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 600,
      },
    });
    const resultText = response?.response?.text();

    if (!resultText) {
      return res.status(500).json({
        error: "Failed To Explain The Code !!",
      });
    }
    res.json({
      explanation: resultText,
      language: language || "unknown",
    });
  } catch (err) {
    console.error("CodeIQ API Error", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{
    console.log(`API server listening on http://localhost:${PORT}`);
})
