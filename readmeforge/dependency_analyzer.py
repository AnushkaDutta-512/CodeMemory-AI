import os
import json


def analyze_dependencies(repo_path):

    dependencies = []

    for root, dirs, files in os.walk(repo_path):

        # Python dependencies
        if "requirements.txt" in files:

            path = os.path.join(
                root,
                "requirements.txt"
            )

            try:

                with open(
                    path,
                    "r",
                    encoding="utf-8"
                ) as f:

                    packages = f.readlines()

                    for package in packages:

                        dependencies.append(
                            f"Python: {package.strip()}"
                        )

            except:
                pass

        # Node.js dependencies
        if "package.json" in files:

            path = os.path.join(
                root,
                "package.json"
            )

            try:

                with open(
                    path,
                    "r",
                    encoding="utf-8"
                ) as f:

                    data = json.load(f)

                    deps = data.get(
                        "dependencies",
                        {}
                    )

                    for dep in deps:

                        dependencies.append(
                            f"Node.js: {dep}"
                        )

            except:
                pass

    return dependencies