// ---------------------------------------------------------------------------
// api.js
//
// Every page in FairMatch calls the functions below instead of importing
// mockData.js directly. Right now each function resolves mock data after a
// short simulated delay. To connect a real FastAPI backend later, only this
// file needs to change: swap the mock resolution for a `fetch(...)` call
// that hits your backend and returns the same shape.
//
// Example future implementation:
//
//   export async function analyzeResume(file, jobDescription) {
//     const formData = new FormData();
//     formData.append("resume", file);
//     formData.append("job_description", jobDescription);
//     const res = await fetch("/api/analyze", { method: "POST", body: formData });
//     if (!res.ok) throw new Error("Analysis failed");
//     return res.json();
//   }
// ---------------------------------------------------------------------------

import {
  mockAnalysisResult,
  mockCandidates,
  mockEvaluation,
  scoreWeights,
} from "./mockData";

const SIMULATED_DELAY_MS = 900;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Analyze a resume against a job description. Returns a match result. */
export async function analyzeResume(_file, _jobDescription) {
  await delay(SIMULATED_DELAY_MS);
  return mockAnalysisResult;
}

/** Fetch the full candidate comparison list. */
export async function getCandidates() {
  await delay(400);
  return mockCandidates;
}

/** Fetch detail for a single candidate by id. */
export async function getCandidateById(id) {
  await delay(200);
  return mockCandidates.find((c) => c.id === id) ?? null;
}

/** Fetch model evaluation metrics. */
export async function getEvaluation() {
  await delay(400);
  return mockEvaluation;
}

/** Fetch the scoring weight model used across the app. */
export function getScoreWeights() {
  return scoreWeights;
}
