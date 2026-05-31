from readmeforge.query import search_code
from readmeforge.llm import ask_llm


def analyze_architecture():

    results = search_code(
        "Explain the architecture of this repository"
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
Analyze this repository architecture.

Explain:

1. Overall architecture
2. Backend structure
3. API structure
4. Authentication flow
5. Database usage
6. Important modules

REPOSITORY CONTEXT:
{context}
"""

    architecture = ask_llm(
        context,
        prompt
    )

    return architecture