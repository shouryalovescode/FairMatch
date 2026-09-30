from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pypdf import PdfReader
from docx import Document

import re
import math
from collections import Counter
from io import BytesIO


# ============================================================
# FAIRMatch API
# ============================================================

app = FastAPI(
    title="FairMatch API",
    description="Explainable Resume Screening & Job Matching API",
    version="1.0.0"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
# TEXT CLEANING
# ============================================================

def clean_text(text):

    text = text.lower()

    text = re.sub(
        r"\b[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}\b",
        " ",
        text
    )

    text = re.sub(
        r"\b\d{10}\b",
        " ",
        text
    )

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()


# ============================================================
# TOKENIZATION
# ============================================================

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
# TF
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


# ============================================================
# IDF
# ============================================================

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


# ============================================================
# TF-IDF
# ============================================================

def calculate_tfidf(words, idf):

    tf = calculate_tf(words)

    return {
        word: value * idf.get(word, 0)
        for word, value in tf.items()
    }


# ============================================================
# COSINE SIMILARITY
# ============================================================

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


# ============================================================
# TF-IDF SIMILARITY
# ============================================================

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
        r"(\d+(?:\.\d+)?)\+?\s*years?",
        r"(\d+(?:\.\d+)?)\+?\s*yrs?"
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
# MAIN DATA SCIENCE ENGINE
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

        "final_score": round(
            final_score,
            2
        ),

        "skill_match": round(
            skill_match * 100,
            2
        ),

        "similarity": round(
            similarity * 100,
            2
        ),

        "experience_score": round(
            experience_score * 100,
            2
        ),

        "education_score": round(
            education * 100,
            2
        ),

        "project_score": round(
            projects * 100,
            2
        ),

        "experience": experience,

        "matched": matched,

        "missing": missing,

        "resume_skills": sorted(
            resume_skills
        ),

        "job_skills": sorted(
            job_skills
        ),

        "weights": {
            "skill_match": 50,
            "similarity": 20,
            "experience": 15,
            "education": 7.5,
            "projects": 7.5
        }

    }


# ============================================================
# PDF / DOCX EXTRACTION
# ============================================================

def extract_resume_text(
    filename,
    file_bytes
):

    filename = filename.lower()

    resume_text = ""

    if filename.endswith(".pdf"):

        reader = PdfReader(
            BytesIO(file_bytes)
        )

        for page in reader.pages:

            page_text = page.extract_text()

            if page_text:

                resume_text += (
                    page_text + "\n"
                )

    elif filename.endswith(".docx"):

        document = Document(
            BytesIO(file_bytes)
        )

        for paragraph in document.paragraphs:

            resume_text += (
                paragraph.text + "\n"
            )

    else:

        raise ValueError(
            "Only PDF and DOCX files are supported."
        )

    return resume_text


# ============================================================
# API ROUTES
# ============================================================

@app.get("/")
def root():

    return {
        "status": "online",
        "project": "FairMatch",
        "version": "1.0.0"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


@app.post("/analyze")
async def analyze(

    resume: UploadFile = File(...),

    job_description: str = Form(...)

):

    if not resume.filename:

        raise HTTPException(
            status_code=400,
            detail="No resume file provided."
        )

    filename = resume.filename.lower()

    if not (
        filename.endswith(".pdf")
        or filename.endswith(".docx")
    ):

        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported."
        )

    if not job_description.strip():

        raise HTTPException(
            status_code=400,
            detail="Job description cannot be empty."
        )

    try:

        file_bytes = await resume.read()

        resume_text = extract_resume_text(
            filename,
            file_bytes
        )

        if not resume_text.strip():

            raise HTTPException(
                status_code=400,
                detail="No readable text found in the resume."
            )

        result = analyze_resume(
            resume_text,
            job_description
        )

        return {

            "success": True,

            "filename": resume.filename,

            "result": result

        }

    except HTTPException:

        raise

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )


# ============================================================
# DIRECT RUN
# ============================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True
    )