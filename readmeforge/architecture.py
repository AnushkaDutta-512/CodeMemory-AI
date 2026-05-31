from readmeforge.query import search_code
from readmeforge.llm import ask_llm


def analyze_architecture():

    results = search_code(
    "Flask Python application architecture routes authentication database"
)

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    context = ""

    for i in range(len(documents)):

        context += f"""
FILE:
{metadatas[i]["source"]}

CODE:
{documents[i]}
"""

    prompt = f"""
Analyze this repository architecture based on the provided context.

Include the following sections:
1. Overall Architecture Overview
2. Backend Structure & Frameworks
3. API Routes & Design
4. Authentication Flow (if any)
5. Database & Models
6. Key Modules & Services

CRITICAL REQUIREMENT:
You MUST generate a Mermaid flow diagram illustrating the system architecture (e.g., Frontend --> Backend/API --> Database). Enclose the Mermaid code in standard markdown code blocks with the language set to `mermaid`.
Example:
```mermaid
graph TD
  Client --> API
  API --> DB
```

REPOSITORY CONTEXT:
{context}
"""

    architecture = ask_llm(
        context,
        prompt
    )

    return architecture