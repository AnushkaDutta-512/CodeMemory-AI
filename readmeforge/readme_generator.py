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
Generate a highly professional, beautifully formatted README.md for this repository.

DETECTED TECH STACK:
{tech_stack}

Instructions:
1. Detect any frameworks, APIs, and authentication systems used in the code.
2. Include shields.io badges at the top for the detected languages/frameworks.
3. Write a compelling project title and overview.
4. List the key features clearly.
5. Provide specific, step-by-step Installation and Setup commands inferred from the tech stack (e.g., `npm install`, `pip install -r requirements.txt`).
6. Provide a Usage section with examples if applicable.
7. Provide a concise Architecture summary.

Write in a professional, modern GitHub README format. Do NOT wrap the entire output in a markdown block, just output the raw markdown text.

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