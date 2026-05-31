# CodeMemoryAI

[![PyPI version](https://img.shields.io/pypi/v/codememoryai.svg)](https://pypi.org/project/codememoryai/)

AI-powered GitHub repository analyzer and README generator.

## Features

* AI repository Q&A
* Semantic code search
* Automatic README generation
* Tech stack detection
* Repository architecture understanding

## Installation

```bash
pip install readmeforge
```

## Usage

```python
from readmeforge import RepoAnalyzer

repo = RepoAnalyzer(
    "https://github.com/user/repository"
)

repo.ingest()

answer = repo.ask(
    "Where is authentication handled?"
)

print(answer)
```

## README Generation

```python
readme = repo.generate_readme(
    save=True
)
```

## CLI Usage

```bash
python main.py
```

## Technologies Used

* Python
* ChromaDB
* Sentence Transformers
* Groq API
* Streamlit

## Author

Anushka Dutta
