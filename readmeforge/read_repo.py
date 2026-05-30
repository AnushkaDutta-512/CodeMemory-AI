import os

IGNORE_FOLDERS = [
    "node_modules",
    ".git",
    "venv",
    "__pycache__",
    "build",
    "dist"
]

VALID_EXTENSIONS = [
    ".py",
    ".js",
    ".ts",
    ".java",
    ".md",
    ".json"
]


def read_repository(repo_path):

    all_files = []

    for root, dirs, files in os.walk(repo_path):

        # Ignore useless folders
        dirs[:] = [
            d for d in dirs
            if d not in IGNORE_FOLDERS
        ]

        for file in files:

            if file.endswith(tuple(VALID_EXTENSIONS)):

                full_path = os.path.join(root, file)

                try:
                    with open(
                        full_path,
                        "r",
                        encoding="utf-8"
                    ) as f:

                        content = f.read()

                        all_files.append({
                            "path": full_path,
                            "content": content
                        })

                except Exception as e:
                    print(f"Error reading {full_path}: {e}")

    return all_files


if __name__ == "__main__":

    repo_path = input("Enter repo folder path: ")

    files = read_repository(repo_path)

    print(f"\nTotal files read: {len(files)}")

    for file in files[:5]:

        print("\n====================")
        print("FILE:", file["path"])
        print("====================")

        print(file["content"][:500])