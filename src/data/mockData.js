// ---------------------------------------------------------------------------
// mockData.js
//
// Centralized mock data for FairMatch. Every shape here is written to mirror
// what a FastAPI backend would eventually return, so pages can later swap a
// call to `mockAnalyzeResume(...)` for `fetch("/api/analyze", ...)` without
// changing how the data is consumed. See src/data/api.js for the thin async
// wrapper functions pages actually import.
// ---------------------------------------------------------------------------

// A single, reusable weighting model used across the app and shown on the
// Methodology page.
export const scoreWeights = [
  { key: "skillMatch", label: "Skill Match", weight: 0.5 },
  { key: "tfidf", label: "TF-IDF Similarity", weight: 0.2 },
  { key: "experience", label: "Experience", weight: 0.15 },
  { key: "education", label: "Education", weight: 0.075 },
  { key: "projects", label: "Projects", weight: 0.075 },
];

// Result of analyzing a single resume against a single job description.
// This is what POST /api/analyze would return in a real backend.
export const mockAnalysisResult = {
  matchScore: 82,
  metrics: {
    skillMatch: 88,
    tfidf: 74,
    experience: 80,
    education: 90,
  },
  matchedSkills: ["React", "JavaScript", "Node.js", "PostgreSQL", "Git", "REST APIs"],
  missingSkills: ["Docker", "AWS", "Redis"],
  scoreBreakdown: [
    { key: "skillMatch", label: "Skill Match", value: 50 },
    { key: "tfidf", label: "TF-IDF Similarity", value: 20 },
    { key: "experience", label: "Experience", value: 15 },
    { key: "education", label: "Education", value: 7.5 },
    { key: "projects", label: "Projects", value: 7.5 },
  ],
  explanation:
    "The candidate demonstrates strong alignment with the required technical skills. Resume content also shows relevant web-development experience and project exposure.",
};

// 10 mock candidates for the comparison table. No real personal data —
// candidates are anonymized by design, consistent with the Fairness page.
export const mockCandidates = [
  {
    id: "C-01",
    name: "Candidate 01",
    matchScore: 91,
    skillMatch: 94,
    experience: 88,
    education: 92,
    projects: 85,
    matchedSkills: ["React", "TypeScript", "Node.js", "GraphQL", "Git"],
    missingSkills: ["Kubernetes"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 47 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 19 },
      { key: "experience", label: "Experience", value: 14 },
      { key: "education", label: "Education", value: 7 },
      { key: "projects", label: "Projects", value: 6.4 },
    ],
  },
  {
    id: "C-02",
    name: "Candidate 02",
    matchScore: 85,
    skillMatch: 82,
    experience: 90,
    education: 78,
    projects: 88,
    matchedSkills: ["Python", "Django", "PostgreSQL", "Docker"],
    missingSkills: ["AWS", "Redis"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 44 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 18 },
      { key: "experience", label: "Experience", value: 15 },
      { key: "education", label: "Education", value: 6 },
      { key: "projects", label: "Projects", value: 7.2 },
    ],
  },
  {
    id: "C-03",
    name: "Candidate 03",
    matchScore: 79,
    skillMatch: 76,
    experience: 70,
    education: 85,
    projects: 74,
    matchedSkills: ["React", "JavaScript", "CSS", "Git"],
    missingSkills: ["Node.js", "AWS"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 40 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 16 },
      { key: "experience", label: "Experience", value: 11 },
      { key: "education", label: "Education", value: 6.8 },
      { key: "projects", label: "Projects", value: 5.5 },
    ],
  },
  {
    id: "C-04",
    name: "Candidate 04",
    matchScore: 73,
    skillMatch: 70,
    experience: 68,
    education: 80,
    projects: 71,
    matchedSkills: ["Java", "Spring Boot", "MySQL"],
    missingSkills: ["Docker", "Kubernetes", "AWS"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 36 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 15 },
      { key: "experience", label: "Experience", value: 10 },
      { key: "education", label: "Education", value: 6.5 },
      { key: "projects", label: "Projects", value: 5.3 },
    ],
  },
  {
    id: "C-05",
    name: "Candidate 05",
    matchScore: 88,
    skillMatch: 90,
    experience: 84,
    education: 86,
    projects: 82,
    matchedSkills: ["React", "Node.js", "MongoDB", "REST APIs", "Git"],
    missingSkills: ["GraphQL"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 45 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 18.5 },
      { key: "experience", label: "Experience", value: 13 },
      { key: "education", label: "Education", value: 6.7 },
      { key: "projects", label: "Projects", value: 6.1 },
    ],
  },
  {
    id: "C-06",
    name: "Candidate 06",
    matchScore: 64,
    skillMatch: 58,
    experience: 62,
    education: 70,
    projects: 60,
    matchedSkills: ["HTML", "CSS", "JavaScript"],
    missingSkills: ["React", "Node.js", "Git"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 30 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 13 },
      { key: "experience", label: "Experience", value: 9.5 },
      { key: "education", label: "Education", value: 6 },
      { key: "projects", label: "Projects", value: 5.5 },
    ],
  },
  {
    id: "C-07",
    name: "Candidate 07",
    matchScore: 82,
    skillMatch: 85,
    experience: 76,
    education: 82,
    projects: 79,
    matchedSkills: ["React", "JavaScript", "Node.js", "PostgreSQL"],
    missingSkills: ["Docker", "AWS"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 43 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 17 },
      { key: "experience", label: "Experience", value: 11.8 },
      { key: "education", label: "Education", value: 6.4 },
      { key: "projects", label: "Projects", value: 5.9 },
    ],
  },
  {
    id: "C-08",
    name: "Candidate 08",
    matchScore: 70,
    skillMatch: 66,
    experience: 72,
    education: 74,
    projects: 68,
    matchedSkills: ["Python", "Flask", "SQL"],
    missingSkills: ["Docker", "AWS", "Redis"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 33 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 14 },
      { key: "experience", label: "Experience", value: 10.8 },
      { key: "education", label: "Education", value: 6.2 },
      { key: "projects", label: "Projects", value: 5.1 },
    ],
  },
  {
    id: "C-09",
    name: "Candidate 09",
    matchScore: 76,
    skillMatch: 74,
    experience: 78,
    education: 68,
    projects: 77,
    matchedSkills: ["React", "TypeScript", "Git", "REST APIs"],
    missingSkills: ["Node.js", "AWS"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 38 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 15.5 },
      { key: "experience", label: "Experience", value: 11.7 },
      { key: "education", label: "Education", value: 5.1 },
      { key: "projects", label: "Projects", value: 5.9 },
    ],
  },
  {
    id: "C-10",
    name: "Candidate 10",
    matchScore: 60,
    skillMatch: 55,
    experience: 58,
    education: 66,
    projects: 62,
    matchedSkills: ["HTML", "CSS", "Git"],
    missingSkills: ["React", "JavaScript", "Node.js"],
    scoreBreakdown: [
      { key: "skillMatch", label: "Skill Match", value: 28 },
      { key: "tfidf", label: "TF-IDF Similarity", value: 12 },
      { key: "experience", label: "Experience", value: 8.7 },
      { key: "education", label: "Education", value: 5.5 },
      { key: "projects", label: "Projects", value: 5.3 },
    ],
  },
];

// Model evaluation metrics (clearly demonstration / synthetic).
export const mockEvaluation = {
  isSynthetic: true,
  summary:
    "This evaluation uses 20 synthetic test resumes generated for demonstration purposes. It illustrates how FairMatch behaves across a range of profiles, not real-world model accuracy. Production validation would require a larger, labeled, real-world dataset and formal fairness auditing.",
  metrics: {
    testResumes: 20,
    averageMatch: 78,
    skillDetection: 92,
    consistency: 89,
  },
  scoreDistribution: [
    { bucket: "0-20%", count: 0 },
    { bucket: "21-40%", count: 1 },
    { bucket: "41-60%", count: 3 },
    { bucket: "61-80%", count: 9 },
    { bucket: "81-100%", count: 7 },
  ],
  skillDetectionPerformance: [
    { skill: "React", detection: 96 },
    { skill: "JavaScript", detection: 98 },
    { skill: "Python", detection: 94 },
    { skill: "SQL", detection: 90 },
    { skill: "Docker", detection: 85 },
    { skill: "AWS", detection: 82 },
    { skill: "Git", detection: 97 },
  ],
};

// Fairness page content.
export const fairnessConfig = {
  excluded: ["Name", "Gender", "Age", "Photograph", "Religion", "Caste", "Home Address", "Marital Status"],
  included: [
    "Technical Skills",
    "Job-Relevant Experience",
    "Education",
    "Projects",
    "Resume-Job Text Similarity",
  ],
  guardrailTitle: "Fairness Guardrail",
  guardrailText:
    "Protected or demographic attributes are intentionally excluded from the scoring logic. The system is designed to evaluate job-relevant resume information rather than personal characteristics.",
  disclaimer:
    "This prototype is an academic decision-support system and should not be used as the sole basis for employment decisions.",
};

// Methodology pipeline steps, in order.
export const pipelineSteps = [
  {
    key: "resume",
    title: "Resume",
    description: "Candidate submits a resume in PDF or DOCX format.",
  },
  {
    key: "extraction",
    title: "Text Extraction",
    description: "Raw text is extracted from the uploaded PDF/DOCX file.",
  },
  {
    key: "preprocessing",
    title: "Preprocessing",
    description: "Text is cleaned, tokenized, lowercased and normalized.",
  },
  {
    key: "skills",
    title: "Skill Extraction",
    description: "Relevant technical and domain skills are identified from the text.",
  },
  {
    key: "tfidf",
    title: "TF-IDF",
    description: "Resume and job description are vectorized using TF-IDF.",
  },
  {
    key: "cosine",
    title: "Cosine Similarity",
    description: "Similarity between resume and job vectors is computed.",
  },
  {
    key: "score",
    title: "Explainable Weighted Score",
    description: "Component scores are combined into one transparent match score.",
  },
  {
    key: "fairness",
    title: "Fairness Checks",
    description: "Protected attributes are confirmed absent from the scoring inputs.",
  },
  {
    key: "insights",
    title: "Candidate Insights",
    description: "Results are presented with a full explanation of the score.",
  },
];

// Longer-form cards describing each methodology stage.
export const methodologyCards = [
  {
    key: "extraction",
    title: "PDF/DOCX Extraction",
    description:
      "Resume files are parsed to plain text, preserving section structure like experience, education and skills where possible.",
  },
  {
    key: "preprocessing",
    title: "Text Preprocessing",
    description:
      "Text is lowercased, stripped of stop words and punctuation, and tokenized to prepare it for consistent comparison.",
  },
  {
    key: "skills",
    title: "Skill Extraction",
    description:
      "A curated skill taxonomy is matched against resume tokens to identify technical and job-relevant skills present in the text.",
  },
  {
    key: "tfidf",
    title: "TF-IDF",
    description:
      "Term Frequency–Inverse Document Frequency weighs words by how distinctive they are, reducing the influence of common filler terms.",
  },
  {
    key: "cosine",
    title: "Cosine Similarity",
    description:
      "The resume and job description vectors are compared using cosine similarity to measure overall textual alignment.",
  },
  {
    key: "weighting",
    title: "Weighted Scoring",
    description:
      "Skill match, similarity, experience, education and project signals are combined using fixed, documented weights.",
  },
  {
    key: "guardrails",
    title: "Fairness Guardrails",
    description:
      "Protected and demographic attributes are excluded from every stage of scoring by design, not filtered after the fact.",
  },
];
