# FairMatch

**An Explainable Data-Driven Resume Screening & Job Matching System**
Academic Data Science project — presented as a decision-support and explainability
tool, not an autonomous hiring decision maker.

## Tech stack

- React 19 + Vite
- Tailwind CSS 3
- React Router
- lucide-react icons
- Plain JavaScript (no TypeScript)
- No backend yet — all data comes from a mock data layer designed to be swapped
  for a FastAPI backend later without touching the UI

## Folder structure

```
fairmatch/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Navbar.jsx
│   │   ├── MetricCard.jsx
│   │   ├── ScoreCircle.jsx
│   │   ├── ProgressBar.jsx
│   │   ├── SkillChip.jsx
│   │   ├── CandidateTable.jsx
│   │   ├── CandidateDetails.jsx
│   │   ├── UploadBox.jsx
│   │   ├── ScoreBreakdown.jsx
│   │   ├── PipelineStep.jsx
│   │   ├── ChartCard.jsx
│   │   ├── EmptyState.jsx
│   │   ├── LoadingState.jsx
│   │   ├── Toast.jsx
│   │   └── Tooltip.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx        (route: /)
│   │   ├── ResumeAnalysis.jsx   (route: /analyze)
│   │   ├── Candidates.jsx       (route: /candidates)
│   │   ├── Evaluation.jsx       (route: /evaluation)
│   │   ├── Fairness.jsx         (route: /fairness)
│   │   └── Methodology.jsx      (route: /methodology)
│   ├── data/
│   │   ├── mockData.js   ← all mock content lives here
│   │   └── api.js        ← thin async functions pages call (the backend seam)
│   ├── layouts/
│   │   └── Layout.jsx    (Sidebar + Navbar + page outlet)
│   ├── App.jsx            (routes)
│   ├── main.jsx            (entry point, router provider)
│   └── index.css           (Tailwind + design tokens)
├── tailwind.config.js       (white + light-green theme)
├── index.html
└── package.json
```

## Installation

```bash
cd fairmatch
npm install
```

## Run the project

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
npm run preview
```

## Design system

The interface uses a white + light-green palette only, defined as Tailwind
tokens in `tailwind.config.js`:

| Token           | Hex                    | Use                                   |
| --------------- | ----------------------- | -------------------------------------- |
| `surface`       | `#FFFFFF`               | Page background                        |
| `surface-soft`  | `#F7FEF9`               | Very light green section backgrounds   |
| `brand-100`     | `#F0FDF4`               | Light green surfaces / hover states    |
| `brand-200`     | `#DCFCE7`               | Borders                                |
| `brand-500/600` | `#22C55E` / `#16A34A`   | Primary buttons, progress bars         |
| `brand-700/800` | `#166534` / `#14532D`   | Headings, important accents            |
| `ink`           | `#1F2937`               | Body text                              |
| `ink-soft`      | `#6B7280`               | Secondary text                         |

Typography pairs a serif display face (Fraunces) for headings with Inter for
body text and UI copy.

## How to replace mock data with a FastAPI backend

All pages import data functions from **`src/data/api.js`** — never from
`mockData.js` directly. That file is the only seam you need to change:

1. Keep the same function names and return shapes (`analyzeResume`,
   `getCandidates`, `getCandidateById`, `getEvaluation`, `getScoreWeights`).
2. Replace each function body with a `fetch()` call to your FastAPI endpoint,
   e.g.:

   ```js
   export async function analyzeResume(file, jobDescription) {
     const formData = new FormData();
     formData.append("resume", file);
     formData.append("job_description", jobDescription);
     const res = await fetch("/api/analyze", { method: "POST", body: formData });
     if (!res.ok) throw new Error("Analysis failed");
     return res.json();
   }
   ```

3. Make sure your FastAPI response JSON matches the shape documented in
   `src/data/mockData.js` (e.g. `matchScore`, `metrics`, `matchedSkills`,
   `missingSkills`, `scoreBreakdown`, `explanation`). No component code needs
   to change if the shape matches.
4. Add a `vite.config.js` proxy (or `VITE_API_BASE_URL` env var) if your
   FastAPI server runs on a different port during development.

## Notes on scope

- Metrics on the Model Evaluation page are explicitly labeled as a
  demonstration / synthetic evaluation, not real-world model accuracy.
- The Fairness page documents which attributes are excluded from scoring by
  design (name, gender, age, photograph, religion, caste, address, marital
  status) and includes a disclaimer that this is an academic decision-support
  prototype, not a sole basis for employment decisions.
- Candidate data is fully anonymized mock data ("Candidate 01"–"Candidate 10").
