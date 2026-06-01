# CodeMemoryAI 🚀

[![PyPI version](https://img.shields.io/pypi/v/codememoryai.svg)](https://pypi.org/project/codememoryai/)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge\&logo=python\&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge\&logo=fastapi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react)
![ChromaDB](https://img.shields.io/badge/ChromaDB-6E44FF?style=for-the-badge)

AI-powered repository intelligence platform for understanding, analyzing, and interacting with GitHub repositories using semantic retrieval and LLM-powered reasoning.

---

## 🌐 Live Demo

* Frontend: https://your-vercel-url.vercel.app
* Backend API: https://codememory-aibackend.onrender.com/docs
* PyPI Package: https://pypi.org/project/codememoryai/

---

## ✨ Features

* 🤖 AI-powered repository Q&A
* 🔍 Semantic code search
* 🧠 Retrieval-Augmented Generation (RAG)
* 📝 Automatic README generation
* 🏗️ Architecture analysis with Mermaid diagrams
* 🛡️ Security vulnerability scanning
* 📦 Dependency analysis
* 🧹 Dead code detection
* 📄 Automated report exporting
* ⚡ FastAPI + React full-stack architecture
* 💻 CLI support
* 📦 PyPI package support

---

## 🧠 How It Works

```text
GitHub Repository
        ↓
Repository Chunking
        ↓
Embedding Generation
        ↓
ChromaDB Vector Storage
        ↓
Semantic Retrieval
        ↓
LLM Reasoning
        ↓
AI-Generated Insights
```

---

## 🛠️ Technologies Used

### Backend

* Python
* FastAPI
* ChromaDB
* Sentence Transformers
* Groq API
* GitPython

### Frontend

* React
* Vite
* Axios
* Framer Motion

### AI / ML

* Semantic Embeddings
* Vector Databases
* Retrieval-Augmented Generation (RAG)

---

## 📦 Installation

```bash
pip install codememoryai
```

---

## 💻 CLI Usage

```bash
python main.py
```

---

## 🚀 Example Usage

```python
from readmeforge import RepoAnalyzer

repo = RepoAnalyzer(
    "https://github.com/pallets/flask"
)

repo.ingest()

answer = repo.ask(
    "Where is authentication handled?"
)

print(answer)
```

---

## 📄 Generated Reports

* README.md
* ARCHITECTURE.md
* SECURITY.md
* DEPENDENCIES.md
* DEADCODE.md

---

## 🚀 Future Roadmap

* [x] AI repository Q&A
* [x] Semantic code retrieval
* [x] README generation
* [x] Architecture analysis
* [x] Live SaaS deployment
* [ ] Multi-agent repository reasoning
* [ ] LangGraph workflows
* [ ] GitHub OAuth integration
* [ ] Autonomous AI code reviewers

---

## 👩‍💻 Author

Built by Anushka Dutta
