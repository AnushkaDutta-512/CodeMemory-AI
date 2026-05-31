from readmeforge import RepoAnalyzer


repo_url = input("Enter GitHub repository URL: ")

repo = RepoAnalyzer(repo_url)

repo.ingest()

choice = input(
    "1. Ask Question\n2. Generate README\nChoose: "
)

if choice == "1":

    question = input("Ask question: ")

    answer = repo.ask(question)

    print(answer)

elif choice == "2":

    readme = repo.generate_readme(
        save=True
    )

    print(readme)