import streamlit as st
import re
import math
import random
from collections import Counter


# ============================================================
# PAGE CONFIG
# ============================================================

st.set_page_config(
    page_title="FairMatch",
    page_icon="📄",
    layout="wide"
)


# ============================================================
# CSS
# ============================================================

st.markdown("""
<style>

.block-container {
    max-width: 1450px;
    padding-top: 2rem;
    padding-bottom: 3rem;
}

.hero {
    padding: 2.5rem;
    border-radius: 22px;
    background: linear-gradient(135deg, #0f172a, #1e293b);
    color: white;
    margin-bottom: 2rem;
}

.hero h1 {
    font-size: 3.2rem;
    margin: 0;
}

.hero p {
    color: #cbd5e1;
}

.metric {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 18px;
    padding: 1.4rem;
    text-align: center;
}

.metric-number {
    font-size: 2rem;
    font-weight: 800;
}

.metric-label {
    color: #64748b;
}

.skill {
    display: inline-block;
    padding: 7px 12px;
    margin: 4px;
    border-radius: 20px;
    background: #dcfce7;
    color: #166534;
    font-size: 0.85rem;
    font-weight: 600;
}

.missing {
    display: inline-block;
    padding: 7px 12px;
    margin: 4px;
    border-radius: 20px;
    background: #fee2e2;
    color: #991b1b;
    font-size: 0.85rem;
    font-weight: 600;
}

.info-box {
    padding: 1.3rem;
    border-radius: 15px;
    background: #eff6ff;
    border-left: 5px solid #2563eb;
}

.formula {
    background: #0f172a;
    color: #e2e8f0;
    padding: 1.3rem;
    border-radius: 14px;
    font-family: monospace;
}

</style>
""", unsafe_allow_html=True)


# ============================================================
# SKILLS
# ============================================================

SKILLS = [
    "python",
    "java",
    "javascript",
    "typescript",
    "c",
    "c++",
    "react",
    "react.js",
    "reactjs",
    "node",
    "node.js",
    "nodejs",
    "express",
    "express.js",
    "expressjs",
    "next.js",
    "nextjs",
    "html",
    "css",
    "tailwind",
    "tailwind css",
    "mongodb",
    "postgresql",
    "mysql",
    "sql",
    "git",
    "github",
    "docker",
    "aws",
    "azure",
    "machine learning",
    "deep learning",
    "data science",
    "data analysis",
    "data analytics",
    "pandas",
    "numpy",
    "scikit-learn",
    "tensorflow",
    "pytorch",
    "nlp",
    "power bi",
    "tableau",
    "excel",
    "rest api",
    "rest apis",
    "api",
    "fastapi",
    "flask",
    "django",
    "streamlit",
    "linux",
    "statistics",
    "matplotlib",
    "seaborn",
    "plotly",
    "postman",
    "figma",
    "bootstrap",
    "firebase",
    "vercel",
    "supabase"
]


# ============================================================
# STOP WORDS
# ============================================================

STOP_WORDS = {
    "the", "a", "an", "and", "or", "but", "if",
    "then", "is", "are", "was", "were", "be",
    "been", "being", "to", "of", "in", "on",
    "for", "with", "as", "by", "from", "at",
    "this", "that", "these", "those", "it",
    "its", "their", "they", "them", "we",
    "our", "you", "your", "will", "can",
    "should", "have", "has", "had", "do",
    "does", "did"
}


# ============================================================
# TEXT FUNCTIONS
# ============================================================

def clean_text(text):

    text = text.lower()

    text = re.sub(
        r'[\w\.-]+@[\w\.-]+\.\w+',
        ' ',
        text
    )

    text = re.sub(
        r'\b\d{10}\b',
        ' ',
        text
    )

    text = re.sub(
        r'\s+',
        ' ',
        text
    )

    return text.strip()


def tokenize(text):

    words = re.findall(
        r"[a-zA-Z][a-zA-Z0-9+#.-]*",
        clean_text(text)
    )

    return [
        word
        for word in words
        if word not in STOP_WORDS
    ]


# ============================================================
# TF-IDF
# ============================================================

def calculate_tf(words):

    if not words:
        return {}

    counts = Counter(words)

    total = len(words)

    return {
        word: count / total
        for word, count in counts.items()
    }


def calculate_idf(documents):

    total_documents = len(documents)

    vocabulary = set()

    for document in documents:
        vocabulary.update(document)

    idf = {}

    for word in vocabulary:

        document_count = sum(
            1
            for document in documents
            if word in document
        )

        idf[word] = (
            math.log(
                (total_documents + 1) /
                (document_count + 1)
            )
            + 1
        )

    return idf


def calculate_tfidf(words, idf):

    tf = calculate_tf(words)

    return {
        word: value * idf.get(word, 0)
        for word, value in tf.items()
    }


def cosine_similarity(vector_a, vector_b):

    vocabulary = (
        set(vector_a) |
        set(vector_b)
    )

    dot = sum(
        vector_a.get(word, 0) *
        vector_b.get(word, 0)
        for word in vocabulary
    )

    magnitude_a = math.sqrt(
        sum(
            value ** 2
            for value in vector_a.values()
        )
    )

    magnitude_b = math.sqrt(
        sum(
            value ** 2
            for value in vector_b.values()
        )
    )

    if magnitude_a == 0 or magnitude_b == 0:
        return 0

    return dot / (
        magnitude_a * magnitude_b
    )


def calculate_similarity(resume, job):

    resume_tokens = tokenize(resume)

    job_tokens = tokenize(job)

    documents = [
        resume_tokens,
        job_tokens
    ]

    idf = calculate_idf(documents)

    resume_vector = calculate_tfidf(
        resume_tokens,
        idf
    )

    job_vector = calculate_tfidf(
        job_tokens,
        idf
    )

    return cosine_similarity(
        resume_vector,
        job_vector
    )


# ============================================================
# SKILL EXTRACTION
# ============================================================

def extract_skills(text):

    text = clean_text(text)

    found = []

    for skill in SKILLS:

        pattern = (
            r"(?<!\w)" +
            re.escape(skill) +
            r"(?!\w)"
        )

        if re.search(pattern, text):
            found.append(skill)

    return sorted(set(found))


# ============================================================
# EXPERIENCE
# ============================================================

def detect_experience(text):

    text = clean_text(text)

    patterns = [
        r'(\d+(?:\.\d+)?)\+?\s*years?',
        r'(\d+(?:\.\d+)?)\+?\s*yrs?'
    ]

    years = []

    for pattern in patterns:

        matches = re.findall(
            pattern,
            text
        )

        for value in matches:

            try:
                years.append(float(value))
            except:
                pass

    if years:
        return max(years)

    if "internship" in text or "intern" in text:
        return 0.5

    return 0


# ============================================================
# EDUCATION
# ============================================================

def education_score(text):

    text = clean_text(text)

    keywords = [
        "b.tech",
        "btech",
        "bachelor",
        "b.sc",
        "bsc",
        "bca",
        "m.tech",
        "mtech",
        "master",
        "mca",
        "computer science",
        "information technology"
    ]

    matches = sum(
        1
        for keyword in keywords
        if keyword in text
    )

    return min(matches / 3, 1)


# ============================================================
# PROJECTS
# ============================================================

def project_score(text):

    text = clean_text(text)

    keywords = [
        "project",
        "developed",
        "built",
        "implemented",
        "application",
        "website",
        "system"
    ]

    matches = sum(
        1
        for keyword in keywords
        if keyword in text
    )

    return min(matches / 5, 1)


# ============================================================
# MAIN ANALYSIS
# ============================================================

def analyze_resume(resume, job):

    resume_skills = set(
        extract_skills(resume)
    )

    job_skills = set(
        extract_skills(job)
    )

    matched = sorted(
        resume_skills & job_skills
    )

    missing = sorted(
        job_skills - resume_skills
    )

    if job_skills:
        skill_match = (
            len(matched) /
            len(job_skills)
        )
    else:
        skill_match = 0

    similarity = calculate_similarity(
        resume,
        job
    )

    experience = detect_experience(
        resume
    )

    experience_score = min(
        experience / 3,
        1
    )

    education = education_score(
        resume
    )

    projects = project_score(
        resume
    )

    final_score = (

        skill_match * 0.50 +
        similarity * 0.20 +
        experience_score * 0.15 +
        education * 0.075 +
        projects * 0.075

    ) * 100

    return {
        "final_score": round(final_score, 2),
        "skill_match": round(skill_match * 100, 2),
        "similarity": round(similarity * 100, 2),
        "experience_score": round(
            experience_score * 100, 2
        ),
        "education_score": round(
            education * 100, 2
        ),
        "project_score": round(
            projects * 100, 2
        ),
        "experience": experience,
        "matched": matched,
        "missing": missing,
        "resume_skills": sorted(resume_skills),
        "job_skills": sorted(job_skills)
    }


# ============================================================
# SYNTHETIC DATASET
# ============================================================

JOB_DESCRIPTION = """
We are looking for a Full Stack Developer with strong
knowledge of React, JavaScript, Node.js, Express.js,
PostgreSQL, HTML, CSS, Git and REST APIs.

The candidate should have experience developing web
applications, working with databases and building APIs.
"""


SYNTHETIC_CANDIDATES = [

    {
        "name": "Candidate 01",
        "skills": [
            "react", "javascript", "node.js",
            "express.js", "postgresql",
            "html", "css", "git", "rest api"
        ],
        "experience": 3
    },

    {
        "name": "Candidate 02",
        "skills": [
            "react", "javascript", "node.js",
            "postgresql", "git", "html", "css"
        ],
        "experience": 2
    },

    {
        "name": "Candidate 03",
        "skills": [
            "python", "pandas", "numpy",
            "machine learning", "sql"
        ],
        "experience": 2
    },

    {
        "name": "Candidate 04",
        "skills": [
            "react", "javascript", "html",
            "css", "git"
        ],
        "experience": 1
    },

    {
        "name": "Candidate 05",
        "skills": [
            "java", "spring", "sql",
            "git", "html", "css"
        ],
        "experience": 3
    },

    {
        "name": "Candidate 06",
        "skills": [
            "react", "node.js", "express.js",
            "mongodb", "javascript", "git"
        ],
        "experience": 2
    },

    {
        "name": "Candidate 07",
        "skills": [
            "python", "django", "postgresql",
            "html", "css", "git"
        ],
        "experience": 2
    },

    {
        "name": "Candidate 08",
        "skills": [
            "react", "javascript", "node.js",
            "express.js", "postgresql",
            "git", "rest api"
        ],
        "experience": 3
    },

    {
        "name": "Candidate 09",
        "skills": [
            "html", "css", "javascript",
            "bootstrap", "git"
        ],
        "experience": 1
    },

    {
        "name": "Candidate 10",
        "skills": [
            "react", "javascript", "node.js",
            "postgresql", "git"
        ],
        "experience": 2
    },

    {
        "name": "Candidate 11",
        "skills": [
            "python", "data science",
            "pandas", "numpy", "sql",
            "machine learning"
        ],
        "experience": 1
    },

    {
        "name": "Candidate 12",
        "skills": [
            "react", "node.js", "express.js",
            "javascript", "postgresql",
            "git", "html", "css"
        ],
        "experience": 2
    },

    {
        "name": "Candidate 13",
        "skills": [
            "java", "mysql", "html",
            "css", "javascript"
        ],
        "experience": 2
    },

    {
        "name": "Candidate 14",
        "skills": [
            "react", "javascript",
            "html", "css", "git",
            "tailwind"
        ],
        "experience": 1
    },

    {
        "name": "Candidate 15",
        "skills": [
            "node.js", "express.js",
            "javascript", "postgresql",
            "git", "rest api"
        ],
        "experience": 3
    },

    {
        "name": "Candidate 16",
        "skills": [
            "python", "flask", "sql",
            "git", "html", "css"
        ],
        "experience": 2
    },

    {
        "name": "Candidate 17",
        "skills": [
            "react", "node.js",
            "javascript", "mongodb",
            "git"
        ],
        "experience": 1
    },

    {
        "name": "Candidate 18",
        "skills": [
            "react", "javascript",
            "node.js", "express.js",
            "postgresql", "git",
            "rest api", "html", "css"
        ],
        "experience": 3
    },

    {
        "name": "Candidate 19",
        "skills": [
            "python", "java", "sql",
            "machine learning", "git"
        ],
        "experience": 2
    },

    {
        "name": "Candidate 20",
        "skills": [
            "react", "javascript",
            "html", "css",
            "git", "postgresql"
        ],
        "experience": 1
    }
]


def create_synthetic_resume(candidate):

    skills = ", ".join(
        candidate["skills"]
    )

    return f"""
    Candidate profile.

    Education: Bachelor of Technology
    in Computer Science and Information Technology.

    Technical Skills:
    {skills}

    Professional Experience:
    {candidate["experience"]} years of software development experience.

    Projects:
    Developed multiple web applications and software systems.
    Implemented practical programming projects.
    Built applications using the listed technical skills.

    Experience includes software development,
    application development and problem solving.
    """


# ============================================================
# EVALUATION
# ============================================================

def run_evaluation():

    results = []

    for candidate in SYNTHETIC_CANDIDATES:

        resume = create_synthetic_resume(
            candidate
        )

        result = analyze_resume(
            resume,
            JOB_DESCRIPTION
        )

        expected_skills = set(
            candidate["skills"]
        )

        job_skills = set(
            extract_skills(JOB_DESCRIPTION)
        )

        expected_matches = (
            expected_skills &
            job_skills
        )

        detected_matches = set(
            result["matched"]
        )

        if expected_matches:

            skill_accuracy = (
                len(
                    expected_matches &
                    detected_matches
                ) /
                len(expected_matches)
            )

        else:

            skill_accuracy = 1

        results.append({
            "Candidate": candidate["name"],
            "Match Score": result["final_score"],
            "Skill Match": result["skill_match"],
            "TF-IDF Similarity": result["similarity"],
            "Expected Skills": len(expected_matches),
            "Detected Skills": len(detected_matches),
            "Skill Accuracy": skill_accuracy * 100
        })

    return results


# ============================================================
# HEADER
# ============================================================

st.markdown("""
<div class="hero">

<h1>📄 FairMatch</h1>

<p>
Explainable Resume Screening & Job Matching System
</p>

<p>
NLP • TF-IDF • Skill Extraction • Evaluation • Fairness
</p>

</div>
""", unsafe_allow_html=True)


# ============================================================
# SIDEBAR NAVIGATION
# ============================================================

with st.sidebar:

    st.title("📄 FairMatch")

    st.caption(
        "Data Science Minor Project"
    )

    st.divider()

    page = st.radio(
        "Navigation",
        [
            "🔍 Resume Screening",
            "👥 Candidate Comparison",
            "📊 Model Evaluation",
            "⚖️ Fairness",
            "🧠 Methodology"
        ]
    )

    st.divider()

    st.write("### Core Methods")

    st.write("🐍 Python")
    st.write("🧠 NLP")
    st.write("📊 TF-IDF")
    st.write("📐 Cosine Similarity")
    st.write("🎯 Feature Engineering")
    st.write("⚖️ Explainable Scoring")

    st.divider()

    st.caption("FairMatch v2.0")


# ============================================================
# PAGE 1 — RESUME SCREENING
# ============================================================

if page == "🔍 Resume Screening":

    st.header("📥 Candidate Resume Screening")

    col1, col2 = st.columns(2)

    with col1:

        st.subheader("📄 Upload Resume")

        uploaded_file = st.file_uploader(
            "PDF or DOCX",
            type=["pdf", "docx"]
        )

    with col2:

        st.subheader("💼 Job Description")

        job_description = st.text_area(
            "Paste job requirements",
            height=230,
            value=JOB_DESCRIPTION
        )

    analyze = st.button(
        "🔍 ANALYZE CANDIDATE",
        type="primary",
        use_container_width=True
    )

    if analyze:

        if uploaded_file is None:

            st.warning(
                "Please upload a resume."
            )

        elif not job_description.strip():

            st.warning(
                "Please enter a job description."
            )

        else:

            from pypdf import PdfReader
            from docx import Document

            filename = uploaded_file.name.lower()

            resume_text = ""

            try:

                if filename.endswith(".pdf"):

                    reader = PdfReader(
                        uploaded_file
                    )

                    for page_data in reader.pages:

                        page_text = page_data.extract_text()

                        if page_text:
                            resume_text += (
                                page_text + "\n"
                            )

                elif filename.endswith(".docx"):

                    document = Document(
                        uploaded_file
                    )

                    for paragraph in document.paragraphs:

                        resume_text += (
                            paragraph.text + "\n"
                        )

            except Exception as error:

                st.error(
                    f"Could not read resume: {error}"
                )

                st.stop()

            if not resume_text.strip():

                st.error(
                    "No readable text was found."
                )

                st.stop()

            result = analyze_resume(
                resume_text,
                job_description
            )

            st.success(
                "Analysis completed successfully."
            )

            st.header("📊 Candidate Match")

            c1, c2, c3, c4 = st.columns(4)

            with c1:

                st.markdown(
                    f"""
                    <div class="metric">
                    <div class="metric-number">
                    {result["final_score"]}%
                    </div>
                    <div class="metric-label">
                    Overall Match
                    </div>
                    </div>
                    """,
                    unsafe_allow_html=True
                )

            with c2:

                st.markdown(
                    f"""
                    <div class="metric">
                    <div class="metric-number">
                    {result["skill_match"]}%
                    </div>
                    <div class="metric-label">
                    Skill Match
                    </div>
                    </div>
                    """,
                    unsafe_allow_html=True
                )

            with c3:

                st.markdown(
                    f"""
                    <div class="metric">
                    <div class="metric-number">
                    {result["similarity"]}%
                    </div>
                    <div class="metric-label">
                    TF-IDF Similarity
                    </div>
                    </div>
                    """,
                    unsafe_allow_html=True
                )

            with c4:

                st.markdown(
                    f"""
                    <div class="metric">
                    <div class="metric-number">
                    {result["experience"]}
                    </div>
                    <div class="metric-label">
                    Experience Years
                    </div>
                    </div>
                    """,
                    unsafe_allow_html=True
                )

            st.header("📈 Score Breakdown")

            components = [
                (
                    "Technical Skills",
                    result["skill_match"],
                    "50%"
                ),
                (
                    "TF-IDF Similarity",
                    result["similarity"],
                    "20%"
                ),
                (
                    "Experience",
                    result["experience_score"],
                    "15%"
                ),
                (
                    "Education",
                    result["education_score"],
                    "7.5%"
                ),
                (
                    "Projects",
                    result["project_score"],
                    "7.5%"
                )
            ]

            for name, value, weight in components:

                st.write(
                    f"**{name}** — {weight} — {value:.1f}%"
                )

                st.progress(
                    min(
                        max(
                            int(value),
                            0
                        ),
                        100
                    )
                )

            st.header("🧠 Skill Analysis")

            col1, col2 = st.columns(2)

            with col1:

                st.subheader(
                    "✅ Matched Skills"
                )

                for skill in result["matched"]:

                    st.markdown(
                        f'<span class="skill">{skill}</span>',
                        unsafe_allow_html=True
                    )

                if not result["matched"]:

                    st.info(
                        "No matching skills found."
                    )

            with col2:

                st.subheader(
                    "⚠️ Missing Skills"
                )

                for skill in result["missing"]:

                    st.markdown(
                        f'<span class="missing">{skill}</span>',
                        unsafe_allow_html=True
                    )

                if not result["missing"]:

                    st.success(
                        "No missing detected skills."
                    )

            st.header("💡 Explanation")

            st.write(
                f"• {len(result['matched'])} required "
                f"skill(s) matched."
            )

            st.write(
                f"• {len(result['missing'])} skill(s) "
                f"were not detected."
            )

            st.write(
                f"• Text similarity is "
                f"{result['similarity']}%."
            )

            st.write(
                f"• Detected experience is "
                f"{result['experience']} year(s)."
            )

            st.header("🧮 Scoring Formula")

            st.markdown(
                """
                <div class="formula">

                Final Score =

                0.50 × Skill Match

                + 0.20 × TF-IDF Similarity

                + 0.15 × Experience

                + 0.075 × Education

                + 0.075 × Projects

                </div>
                """,
                unsafe_allow_html=True
            )

            with st.expander(
                "🔎 View Extracted Resume"
            ):

                st.text_area(
                    "Extracted Text",
                    resume_text,
                    height=350
                )


# ============================================================
# PAGE 2 — CANDIDATE COMPARISON
# ============================================================

elif page == "👥 Candidate Comparison":

    st.header(
        "👥 Candidate Comparison"
    )

    st.write(
        "Compare 20 synthetic candidate profiles "
        "against the same Full Stack Developer role."
    )

    results = run_evaluation()

    results = sorted(
        results,
        key=lambda x: x["Match Score"],
        reverse=True
    )

    st.subheader(
        "📋 Candidate Ranking by Match Score"
    )

    for index, candidate in enumerate(
        results,
        start=1
    ):

        col1, col2, col3, col4 = st.columns(
            [0.7, 2.5, 1.5, 1.5]
        )

        with col1:

            st.write(
                f"**#{index}**"
            )

        with col2:

            st.write(
                candidate["Candidate"]
            )

        with col3:

            st.write(
                f"{candidate['Skill Match']:.1f}% skills"
            )

        with col4:

            st.write(
                f"**{candidate['Match Score']:.1f}%**"
            )

    st.divider()

    st.subheader(
        "🔎 Candidate Details"
    )

    selected = st.selectbox(
        "Select candidate",
        [
            candidate["Candidate"]
            for candidate in results
        ]
    )

    candidate_data = next(
        candidate
        for candidate in SYNTHETIC_CANDIDATES
        if candidate["name"] == selected
    )

    resume = create_synthetic_resume(
        candidate_data
    )

    result = analyze_resume(
        resume,
        JOB_DESCRIPTION
    )

    st.write(
        f"### {selected}"
    )

    c1, c2, c3 = st.columns(3)

    with c1:

        st.metric(
            "Overall Match",
            f"{result['final_score']}%"
        )

    with c2:

        st.metric(
            "Skill Match",
            f"{result['skill_match']}%"
        )

    with c3:

        st.metric(
            "Experience",
            f"{result['experience']} years"
        )

    st.subheader(
        "Skills"
    )

    for skill in candidate_data["skills"]:

        if skill in result["job_skills"]:

            st.markdown(
                f'<span class="skill">{skill}</span>',
                unsafe_allow_html=True
            )


# ============================================================
# PAGE 3 — MODEL EVALUATION
# ============================================================

elif page == "📊 Model Evaluation":

    st.header(
        "📊 FairMatch Model Evaluation"
    )

    st.write(
        "Evaluation is performed on 20 synthetic candidate "
        "profiles with known technical skill sets."
    )

    results = run_evaluation()

    total_candidates = len(results)

    average_score = (
        sum(
            item["Match Score"]
            for item in results
        )
        / total_candidates
    )

    average_accuracy = (
        sum(
            item["Skill Accuracy"]
            for item in results
        )
        / total_candidates
    )

    consistency_scores = []

    for item in results:

        consistency_scores.append(
            100 -
            abs(
                item["Skill Accuracy"] -
                100
            )
        )

    consistency = (
        sum(consistency_scores) /
        len(consistency_scores)
    )

    c1, c2, c3, c4 = st.columns(4)

    with c1:

        st.metric(
            "Test Resumes",
            total_candidates
        )

    with c2:

        st.metric(
            "Average Match",
            f"{average_score:.1f}%"
        )

    with c3:

        st.metric(
            "Skill Detection",
            f"{average_accuracy:.1f}%"
        )

    with c4:

        st.metric(
            "Consistency",
            f"{consistency:.1f}%"
        )

    st.divider()

    st.subheader(
        "🧪 Evaluation Dataset"
    )

    st.write(
        "The test dataset contains 20 synthetic resumes "
        "covering different skill combinations and experience levels."
    )

    st.subheader(
        "📈 Candidate Evaluation"
    )

    for item in results:

        score = item["Match Score"]

        if score >= 80:

            label = "🟢 Strong"

        elif score >= 60:

            label = "🟡 Moderate"

        else:

            label = "🔴 Limited"

        st.write(
            f"**{item['Candidate']}** — "
            f"{score:.1f}% — {label}"
        )

        st.progress(
            min(
                int(score),
                100
            )
        )

    st.divider()

    st.subheader(
        "📐 Skill Detection Evaluation"
    )

    st.write(
        f"""
        Average skill detection consistency across
        the synthetic test set is approximately
        **{average_accuracy:.1f}%**.

        This metric measures how consistently the
        system detects job-relevant skills that are
        explicitly present in the synthetic profiles.
        """
    )

    st.info(
        "These are synthetic evaluation results created "
        "for demonstrating the methodology. They should "
        "not be interpreted as production hiring accuracy."
    )


# ============================================================
# PAGE 4 — FAIRNESS
# ============================================================

elif page == "⚖️ Fairness":

    st.header(
        "⚖️ Fairness & Transparency"
    )

    st.write(
        "FairMatch is designed around job-relevant features "
        "rather than personal characteristics."
    )

    st.subheader(
        "🚫 Features Excluded From Scoring"
    )

    excluded = [
        "Name",
        "Gender",
        "Age",
        "Photograph",
        "Religion",
        "Caste",
        "Address",
        "Marital Status"
    ]

    for item in excluded:

        st.write(
            f"❌ {item}"
        )

    st.subheader(
        "✅ Features Used"
    )

    included = [
        ("Technical Skills", "50%"),
        ("Text Similarity", "20%"),
        ("Experience", "15%"),
        ("Education", "7.5%"),
        ("Projects", "7.5%")
    ]

    for feature, weight in included:

        st.write(
            f"✅ **{feature}** — {weight}"
        )

    st.divider()

    st.markdown(
        """
        <div class="info-box">

        <b>Transparency principle</b>

        <br><br>

        FairMatch does not produce an unexplained
        black-box score. The final result can be
        decomposed into technical skills, textual
        similarity, experience, education and projects.

        <br><br>

        This prototype is intended for academic and
        decision-support purposes. Real-world recruitment
        systems require extensive validation, privacy
        safeguards, bias testing and human oversight.

        </div>
        """,
        unsafe_allow_html=True
    )


# ============================================================
# PAGE 5 — METHODOLOGY
# ============================================================

elif page == "🧠 Methodology":

    st.header(
        "🧠 Data Science Methodology"
    )

    st.subheader(
        "1. Document Processing"
    )

    st.write(
        "PDF/DOCX resumes are converted into machine-readable text."
    )

    st.subheader(
        "2. Text Preprocessing"
    )

    st.write(
        "The system normalizes text, removes irrelevant "
        "information and tokenizes the content."
    )

    st.subheader(
        "3. Skill Extraction"
    )

    st.write(
        "A controlled technical vocabulary is used to identify "
        "job-relevant skills."
    )

    st.subheader(
        "4. TF-IDF"
    )

    st.write(
        "TF-IDF converts resume and job-description text "
        "into numerical representations based on term importance."
    )

    st.subheader(
        "5. Cosine Similarity"
    )

    st.write(
        "Cosine similarity measures the relationship between "
        "the resume and job-description vectors."
    )

    st.subheader(
        "6. Feature Engineering"
    )

    st.write(
        "Skills, experience, education and project evidence "
        "are converted into measurable features."
    )

    st.subheader(
        "7. Explainable Weighted Scoring"
    )

    st.code("""
Final Score =

50% × Skill Match
20% × TF-IDF Similarity
15% × Experience
7.5% × Education
7.5% × Projects
""")

    st.subheader(
        "8. Evaluation"
    )

    st.write(
        "Twenty synthetic candidate profiles are used to "
        "test skill detection consistency and score behavior."
    )

    st.subheader(
        "🔄 Complete Pipeline"
    )

    st.code("""
Resume
   ↓
Document Extraction
   ↓
Text Cleaning
   ↓
Tokenization
   ↓
Skill Extraction
   ↓
TF-IDF Vectorization
   ↓
Cosine Similarity
   ↓
Feature Engineering
   ↓
Weighted Scoring
   ↓
Explanation
   ↓
Evaluation
""")


# ============================================================
# FOOTER
# ============================================================

st.divider()

st.caption(
    "FairMatch v2.0 • Explainable Data-Driven Resume Screening System • College Minor Project"
)