import os


def detect_tech_stack(repo_path):

    technologies = set()

    for root, dirs, files in os.walk(repo_path):

        for file in files:

            file_lower = file.lower()

            # Python
            if file_lower.endswith(".py"):
                technologies.add("Python")

            # Flask
            if "flask" in file_lower:
                technologies.add("Flask")

            # FastAPI
            if "fastapi" in file_lower:
                technologies.add("FastAPI")

            # React
            if file_lower == "package.json":
                technologies.add("JavaScript")

            # Docker
            if file_lower == "dockerfile":
                technologies.add("Docker")

            # Requirements
            if file_lower == "requirements.txt":

                path = os.path.join(root, file)

                try:
                    with open(
                        path,
                        "r",
                        encoding="utf-8"
                    ) as f:

                        content = f.read().lower()

                        if "flask" in content:
                            technologies.add("Flask")

                        if "fastapi" in content:
                            technologies.add("FastAPI")

                        if "django" in content:
                            technologies.add("Django")

                        if "torch" in content:
                            technologies.add("PyTorch")

                except:
                    pass

    return list(technologies)