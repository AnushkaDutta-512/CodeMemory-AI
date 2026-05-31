from readmeforge.query import search_code
from readmeforge.llm import ask_llm


def generate_readme(save=False):

    results = search_code(
        "Explain this repository architecture and purpose"
    )

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    context = ""

    for i in range(len(documents)):

        source = metadatas[i]["source"]

        if "test" in source.lower():
            continue

        context += f"""
FILE:
{source}

CODE:
{documents[i]}
"""

    prompt = f"""
Generate a professional GitHub README.md for this repository.

Include:
1. Project title
2. Project overview
3. Features
4. Tech stack
5. Installation instructions
6. Usage
7. Architecture summary

Write it in professional GitHub README format.

REPOSITORY CONTEXT:
{context}
"""

    readme = ask_llm(
        context,
        prompt
    )

    if save:

        with open(
            "README_GENERATED.md",
            "w",
            encoding="utf-8"
        ) as file:

            file.write(readme)

    return readme