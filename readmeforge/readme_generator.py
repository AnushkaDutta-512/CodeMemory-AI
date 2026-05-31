from readmeforge.query import search_code
from readmeforge.llm import ask_llm
from readmeforge.tech_stack import detect_tech_stack

def generate_readme(repo_path, save=False):

    results = search_code(
        "Explain this repository architecture and purpose"
    )

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    context = ""

    technologies = detect_tech_stack(
        repo_path
    )

    tech_stack = "\n".join(
        [f"- {tech}" for tech in technologies]
    )

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
Generate a professional README.md for this repository.

Use the detected technologies carefully.

DETECTED TECH STACK:
{tech_stack}

Include:

1. Project title
2. Project overview
3. Features
4. Tech stack
5. Installation instructions
6. Usage
7. Architecture summary

Write in professional GitHub README format.

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