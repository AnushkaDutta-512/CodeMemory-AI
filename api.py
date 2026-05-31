from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from readmeforge import RepoAnalyzer


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RepoRequest(BaseModel):

    repo_url: str
    question: str = ""


@app.get("/")
def home():

    return {
        "message": "CodeMemoryAI API running"
    }


@app.post("/ask")
def ask_question(data: RepoRequest):

    repo = RepoAnalyzer(
        data.repo_url
    )

    repo.ingest()

    answer = repo.ask(
        data.question
    )

    return {
        "answer": answer
    }


@app.post("/readme")
def generate_readme(data: RepoRequest):

    repo = RepoAnalyzer(
        data.repo_url
    )

    repo.ingest()

    readme = repo.generate_readme()

    return {
        "readme": readme
    }


@app.post("/architecture")
def architecture(data: RepoRequest):

    repo = RepoAnalyzer(
        data.repo_url
    )

    repo.ingest()

    architecture = repo.analyze_architecture()

    return {
        "architecture": architecture
    }


@app.post("/deadcode")
def deadcode(data: RepoRequest):

    repo = RepoAnalyzer(
        data.repo_url
    )

    repo.ingest()

    dead = repo.find_dead_code()

    return {
        "dead_code": dead
    }


@app.post("/security")
def security(data: RepoRequest):

    repo = RepoAnalyzer(
        data.repo_url
    )

    repo.ingest()

    security = repo.security_scan()

    return {
        "security": security
    }


@app.post("/dependencies")
def dependencies(data: RepoRequest):

    repo = RepoAnalyzer(
        data.repo_url
    )

    repo.ingest()

    dependencies = repo.analyze_dependencies()

    return {
        "dependencies": dependencies
    }
    