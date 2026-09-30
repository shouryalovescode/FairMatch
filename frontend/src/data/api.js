// ---------------------------------------------------------------------------
// api.js
//
// Central API layer for FairMatch.
//
// Resume analysis is connected to the real FastAPI + Python Data Science
// backend. The remaining dashboard/evaluation functions continue using
// the existing mock data until we connect those sections later.
// ---------------------------------------------------------------------------

import {
  mockCandidates,
  mockEvaluation,
  scoreWeights,
} from "./mockData";


// ============================================================
// FASTAPI BACKEND
// ============================================================
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";



// ============================================================
// ANALYZE RESUME
// ============================================================

/**
 * Send a real PDF/DOCX resume and job description
 * to the Python Data Science engine.
 */
export async function analyzeResume(file, jobDescription) {

  if (!file) {
    throw new Error("Please select a resume file.");
  }

  if (!jobDescription || !jobDescription.trim()) {
    throw new Error("Please enter a job description.");
  }

  const formData = new FormData();

  formData.append("resume", file);

  formData.append(
    "job_description",
    jobDescription
  );

  try {

    const response = await fetch(
      `${API_BASE_URL}/analyze`,
      {
        method: "POST",
        body: formData,
      }
    );

    // Backend returned an error
    if (!response.ok) {

      let errorMessage =
        "Resume analysis failed.";

      try {

        const errorData =
          await response.json();

        if (errorData.detail) {
          errorMessage = errorData.detail;
        }

      } catch {
        // Keep default error message
      }

      throw new Error(errorMessage);
    }

    const data = await response.json();

    if (!data.success || !data.result) {
      throw new Error(
        "The backend returned an invalid analysis result."
      );
    }

    const result = data.result;


    // ========================================================
    // Convert FastAPI response into the shape expected by
    // ResumeAnalysis.jsx
    // ========================================================

    return {

      // Overall score
      matchScore: result.final_score,

      // Metric cards
      metrics: {

        skillMatch: result.skill_match,

        tfidf: result.similarity,

        experience: result.experience_score,

        education: result.education_score,

      },

      // Skills
      matchedSkills: result.matched || [],

      missingSkills: result.missing || [],

      // Score breakdown
      scoreBreakdown: [

        {
          label: "Technical Skills",
          value: result.skill_match,
          weight: "50%",
        },

        {
          label: "TF-IDF Similarity",
          value: result.similarity,
          weight: "20%",
        },

        {
          label: "Experience",
          value: result.experience_score,
          weight: "15%",
        },

        {
          label: "Education",
          value: result.education_score,
          weight: "7.5%",
        },

        {
          label: "Projects",
          value: result.project_score,
          weight: "7.5%",
        },

      ],

      // Explanation shown underneath the score breakdown
      explanation: [
        `${result.matched?.length || 0} required skill(s) matched.`,
        `${result.missing?.length || 0} required skill(s) were not detected.`,
        `TF-IDF text similarity is ${result.similarity}%.`,
        `Detected experience is ${result.experience} year(s).`,
      ],

      // Extra information available for future UI improvements
      experience: result.experience,

      resumeSkills: result.resume_skills || [],

      jobSkills: result.job_skills || [],

      filename: data.filename || file.name,

    };

  } catch (error) {

    console.error(
      "FairMatch API error:",
      error
    );

    throw new Error(
      error.message ||
      "Unable to connect to the FairMatch backend."
    );
  }
}


// ============================================================
// CANDIDATES
// ============================================================

/**
 * Candidate comparison currently uses the synthetic
 * demonstration dataset.
 */
export async function getCandidates() {

  return mockCandidates;

}


// ============================================================
// SINGLE CANDIDATE
// ============================================================

export async function getCandidateById(id) {

  return (
    mockCandidates.find(
      (candidate) =>
        candidate.id === id
    ) ?? null
  );

}


// ============================================================
// MODEL EVALUATION
// ============================================================

/**
 * Model Evaluation currently uses the synthetic
 * demonstration dataset.
 */
export async function getEvaluation() {

  return mockEvaluation;

}


// ============================================================
// SCORE WEIGHTS
// ============================================================

export function getScoreWeights() {

  return scoreWeights;

}