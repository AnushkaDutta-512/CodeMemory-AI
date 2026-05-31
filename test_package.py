from readmeforge import RepoAnalyzer


repo = RepoAnalyzer(
    "https://github.com/pallets/flask"
)

repo.ingest()

readme = repo.generate_readme(
    save=True
)

print(readme)
architecture = repo.analyze_architecture()

print(architecture)