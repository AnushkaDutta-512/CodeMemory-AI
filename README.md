# CodeMemoryAI

[![PyPI version](https://img.shields.io/pypi/v/codememoryai.svg)](https://pypi.org/project/codememoryai/)

AI-powered GitHub repository analyzer and README generator.

## Features

* AI-powered repository Q&A
* Semantic code search
* Automatic README generation
* Architecture analysis
* Dead code detection
* Automated report exporting
* Tech stack detection
* CLI support
* PyPI package support

## Installation

```bash
pip install codememoryai
```

## CLI Usage

```bash
python main.py
```

## Example Usage

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

## Reports Generated

* README.md
* ARCHITECTURE.md
* DEADCODE.md

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
