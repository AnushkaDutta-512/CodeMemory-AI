from readmeforge.query import search_code
from readmeforge.llm import ask_llm


def analyze_architecture():

    results = search_code(
   """
application architecture
backend structure
frontend structure
API routes
authentication
database models
services
controllers
dependencies
"""
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
IMPORTANT:
- Generate a Mermaid architecture diagram
- Include API flow if APIs exist
- Include authentication flow if detected
- Include database relationships if present
- Include module/service relationships
- Use clean Mermaid syntax
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