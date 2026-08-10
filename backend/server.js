import express from "express";
import cors from "cors";
import dotenv from "dotenv";
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

    res.json({
      success: true,
      question: response.text,
    });
  } catch (error) {
    console.error("Gemini Test Error:", error.message);

    res.status(500).json({
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
    // --------------------------------------
    // VALIDATION
    // --------------------------------------

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

    // --------------------------------------
    // GEMINI PROMPT
    // --------------------------------------

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

    // --------------------------------------
    // ONE GEMINI REQUEST
    // --------------------------------------

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    console.log(
      "Gemini Questions Response:",
      response.text
    );

    // --------------------------------------
    // CLEAN RESPONSE
    // --------------------------------------

    const cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const result = JSON.parse(cleanedText);

    // --------------------------------------
    // VALIDATE RESPONSE
    // --------------------------------------

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
    // --------------------------------------
    // FALLBACK QUESTIONS
    // --------------------------------------

    console.error(
      "GEMINI QUESTION ERROR:",
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

    const count = Math.min(
      requestedCount,
      fallbackQuestions.length
    );

    console.log(
      "Gemini unavailable. Using fallback questions."
    );

    return res.json({
      success: true,
      source: "fallback",
      questions: fallbackQuestions.slice(0, count),
    });
  }
});

// ==========================================
// EVALUATE ANSWER
// ==========================================

app.post("/api/evaluate-answer", async (req, res) => {
  // IMPORTANT:
  // These variables are outside try so that
  // the catch block can also access "answer".

  const {
    role,
    interviewType,
    difficulty,
    question,
    answer,
  } = req.body;

  try {
    // --------------------------------------
    // VALIDATION
    // --------------------------------------

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

    // --------------------------------------
    // GEMINI PROMPT
    // --------------------------------------

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

    // --------------------------------------
    // GEMINI REQUEST
    // --------------------------------------

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    console.log(
      "Gemini Evaluation Response:",
      response.text
    );

    // --------------------------------------
    // CLEAN RESPONSE
    // --------------------------------------

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
    // --------------------------------------
    // FALLBACK EVALUATION
    // --------------------------------------

    console.error(
      "GEMINI EVALUATION ERROR:",
      error.message
    );

    // --------------------------------------
    // CALCULATE SIMPLE FALLBACK SCORE
    // --------------------------------------

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

      score: score,

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
// START SERVER
// ==========================================

app.listen(PORT, "127.0.0.1", () => {
  console.log(
    `Backend server running on http://localhost:${PORT}`
  );
});