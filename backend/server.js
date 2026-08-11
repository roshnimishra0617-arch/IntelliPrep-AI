import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import { PDFParse } from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 5000;

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());

// ==========================================
// FILE UPLOAD
// ==========================================

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

// ==========================================
// GEMINI AI
// ==========================================

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "IntelliPrep-AI Backend is running 🚀",
  });
});

// ==========================================
// TEST GEMINI
// ==========================================

app.post("/api/test-ai", async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents:
        "Give me one simple software engineering interview question.",
    });

    console.log("Gemini response:", response.text);

    return res.json({
      success: true,
      question: response.text,
    });
  } catch (error) {
    console.error("Gemini Test Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to connect to Gemini API",
    });
  }
});

// ==========================================
// START INTERVIEW
// GENERATE ALL QUESTIONS IN ONE REQUEST
// ==========================================

app.post("/api/start-interview", async (req, res) => {
  const {
    role,
    interviewType,
    difficulty,
    questionCount,
  } = req.body;

  try {
    if (
      !role ||
      !interviewType ||
      !difficulty ||
      !questionCount
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Role, interview type, difficulty and question count are required.",
      });
    }

    const count = Number(questionCount);

    if (![5, 10, 15].includes(count)) {
      return res.status(400).json({
        success: false,
        message: "Question count must be 5, 10 or 15.",
      });
    }

    const prompt = `
You are an expert AI interviewer for IntelliPrep-AI.

Generate exactly ${count} interview questions.

Candidate Role:
${role}

Interview Type:
${interviewType}

Difficulty:
${difficulty}

Requirements:
- Generate exactly ${count} questions.
- Questions must be relevant to the candidate role.
- Questions must match the interview type.
- Questions must match the difficulty.
- Do not provide answers.
- Do not provide explanations.
- Do not repeat questions.
- Return ONLY valid JSON.

Required format:

{
  "questions": [
    "Question 1",
    "Question 2",
    "Question 3"
  ]
}

The questions array must contain exactly ${count} questions.
`;

    console.log(
      `Generating ${count} questions with Gemini...`
    );

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanedText);

    if (
      !result.questions ||
      !Array.isArray(result.questions) ||
      result.questions.length !== count
    ) {
      throw new Error(
        `Invalid Gemini response. Expected ${count} questions.`
      );
    }

    console.log(
      "Real Gemini questions generated successfully."
    );

    return res.json({
      success: true,
      source: "gemini",
      questions: result.questions,
    });

  } catch (error) {
    console.error(
      "Gemini Question Error:",
      error.message
    );

    const fallbackQuestions = [
      "Explain the difference between a stack and a queue.",
      "What is object-oriented programming and what are its main principles?",
      "What is the difference between == and === in JavaScript?",
      "Explain what an API is and how a REST API works.",
      "What is the purpose of a database in a software application?",
      "What is the difference between frontend and backend development?",
      "Explain the concept of exception handling.",
      "What is version control and why is Git commonly used?",
      "What is the difference between SQL and NoSQL databases?",
      "Explain what an algorithm is and why time complexity matters.",
      "What is a data structure? Give two examples.",
      "Explain the software development life cycle.",
      "What is the purpose of testing in software development?",
      "What is responsive web design?",
      "What is the difference between authentication and authorization?",
    ];

    const requestedCount =
      Number(questionCount) || 5;

    const safeCount = Math.min(
      requestedCount,
      fallbackQuestions.length
    );

    console.log(
      "Gemini unavailable. Using fallback questions."
    );

    return res.json({
      success: true,
      source: "fallback",
      questions: fallbackQuestions.slice(0, safeCount),
    });
  }
});

// ==========================================
// EVALUATE INTERVIEW ANSWER
// ==========================================

app.post("/api/evaluate-answer", async (req, res) => {
  const {
    role,
    interviewType,
    difficulty,
    question,
    answer,
  } = req.body;

  try {
    if (
      !role ||
      !interviewType ||
      !difficulty ||
      !question ||
      !answer
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Role, interview type, difficulty, question and answer are required.",
      });
    }

    const prompt = `
You are an expert AI interviewer evaluating a candidate's interview answer.

Candidate Role:
${role}

Interview Type:
${interviewType}

Difficulty:
${difficulty}

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer based on:

1. Technical correctness
2. Relevance
3. Clarity
4. Completeness
5. Communication

Give a score from 0 to 10.

Return ONLY valid JSON:

{
  "score": 8,
  "feedback": "Short and useful feedback.",
  "strengths": [
    "Strength 1",
    "Strength 2"
  ],
  "improvements": [
    "Improvement 1",
    "Improvement 2"
  ]
}

Rules:
- Score must be between 0 and 10.
- Give at least 2 strengths.
- Give at least 2 improvements.
- Do not use markdown.
- Do not use code fences.
- Do not add text outside JSON.
`;

    console.log(
      "Evaluating answer with Gemini..."
    );

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const evaluation = JSON.parse(cleanedText);

    console.log(
      "Real Gemini evaluation generated successfully."
    );

    return res.json({
      success: true,
      source: "gemini",
      score: evaluation.score,
      feedback: evaluation.feedback,
      strengths: evaluation.strengths || [],
      improvements: evaluation.improvements || [],
    });

  } catch (error) {
    console.error(
      "Gemini Evaluation Error:",
      error.message
    );

    const answerLength = answer
      ? answer.trim().length
      : 0;

    let score;

    if (answerLength >= 300) {
      score = 8;
    } else if (answerLength >= 150) {
      score = 7;
    } else if (answerLength >= 75) {
      score = 6;
    } else if (answerLength >= 30) {
      score = 5;
    } else {
      score = 4;
    }

    console.log(
      "Gemini unavailable. Using fallback evaluation."
    );

    return res.json({
      success: true,
      source: "fallback",
      score,
      feedback:
        "Your answer has been recorded successfully. Add more technical details, examples and explanations to improve your response.",
      strengths: [
        "Attempted the interview question",
        "Provided a direct response",
      ],
      improvements: [
        "Add more technical details",
        "Include a practical example",
        "Explain your reasoning more clearly",
      ],
    });
  }
});

// ==========================================
// RESUME ANALYZER
// ==========================================

app.post(
  "/api/analyze-resume",
  upload.single("resume"),
  async (req, res) => {
    let parser = null;

    try {
      // --------------------------------------
      // CHECK FILE
      // --------------------------------------

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a PDF resume.",
        });
      }

      // --------------------------------------
      // CHECK FILE TYPE
      // --------------------------------------

      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({
          success: false,
          message: "Only PDF files are allowed.",
        });
      }

      console.log(
        "=========================================="
      );
      console.log(
        "Resume received:",
        req.file.originalname
      );
      console.log(
        "File size:",
        req.file.size,
        "bytes"
      );
      console.log(
        "=========================================="
      );

      // --------------------------------------
      // EXTRACT PDF TEXT
      // --------------------------------------

      console.log("Extracting PDF text...");

      parser = new PDFParse({
        data: req.file.buffer,
      });

      const pdfData = await parser.getText();

      const resumeText = pdfData.text
        ? pdfData.text.trim()
        : "";

      // --------------------------------------
      // CHECK EXTRACTED TEXT
      // --------------------------------------

      console.log(
        "Extracted resume text length:",
        resumeText.length
      );

      if (!resumeText) {
        return res.status(400).json({
          success: false,
          message:
            "Could not extract text from this PDF. Please upload a text-based resume.",
        });
      }

      // --------------------------------------
      // LIMIT TEXT SENT TO AI
      // --------------------------------------

      const MAX_RESUME_LENGTH = 30000;

      const limitedResumeText =
        resumeText.length > MAX_RESUME_LENGTH
          ? resumeText.substring(0, MAX_RESUME_LENGTH)
          : resumeText;

      console.log(
        "Text being sent to Gemini:",
        limitedResumeText.length,
        "characters"
      );

      // --------------------------------------
      // RESUME ANALYSIS PROMPT
      // --------------------------------------

      const prompt = `
You are an expert resume reviewer and ATS specialist.

Analyze the following resume carefully.

RESUME:

${limitedResumeText}

Provide a professional resume analysis.

Return ONLY valid JSON in exactly this structure:

{
  "atsScore": 85,
  "summary": "Short overall assessment of the resume.",
  "skills": [
    "JavaScript",
    "React",
    "Node.js"
  ],
  "strengths": [
    "Strong technical skills",
    "Good project experience"
  ],
  "weaknesses": [
    "Limited measurable achievements",
    "Some sections need improvement"
  ],
  "missingKeywords": [
    "REST API",
    "Testing"
  ],
  "improvements": [
    "Add measurable results to project descriptions",
    "Improve the professional summary"
  ],
  "sections": {
    "contact": "Good",
    "summary": "Needs improvement",
    "education": "Good",
    "experience": "Good",
    "projects": "Good",
    "skills": "Good"
  }
}

Rules:
- atsScore must be between 0 and 100.
- Identify skills that actually appear in the resume.
- Do not invent experience.
- Missing keywords should be useful industry keywords that could strengthen the resume.
- Keep feedback practical and concise.
- Return ONLY JSON.
- Do not use markdown.
- Do not use code fences.
`;

      // --------------------------------------
      // GEMINI REQUEST
      // --------------------------------------

      console.log(
        "Sending resume text to Gemini..."
      );

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
      });

      console.log(
        "Gemini responded successfully."
      );

      console.log(
        "Gemini resume response:",
        response.text
      );

      // --------------------------------------
      // CLEAN GEMINI RESPONSE
      // --------------------------------------

      const cleanedText = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const analysis = JSON.parse(cleanedText);

      // --------------------------------------
      // SUCCESS
      // --------------------------------------

      console.log(
        "Resume analysis completed successfully."
      );

      return res.json({
        success: true,
        source: "gemini",
        fileName: req.file.originalname,
        analysis,
      });

    } catch (error) {

      // --------------------------------------
      // FULL ERROR LOG
      // --------------------------------------

      console.error(
        "=========================================="
      );

      console.error(
        "FULL RESUME ANALYSIS ERROR"
      );

      console.error(
        "Error name:",
        error?.name
      );

      console.error(
        "Error message:",
        error?.message
      );

      console.error(
        "Full error:",
        error
      );

      console.error(
        "=========================================="
      );

      return res.status(500).json({
        success: false,
        message:
          error?.message ||
          "Failed to analyze resume.",
      });

    } finally {

      // --------------------------------------
      // CLEAN PDF PARSER
      // --------------------------------------

      if (parser) {
        try {
          await parser.destroy();
        } catch (cleanupError) {
          console.error(
            "PDF parser cleanup error:",
            cleanupError.message
          );
        }
      }
    }
  }
);

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, "127.0.0.1", () => {
  console.log(
    `Backend server running on http://localhost:${PORT}`
  );
});