from readmeforge import RepoAnalyzer


repo = RepoAnalyzer(
    "https://github.com/pallets/flask"
)

repo.ingest()

readme = repo.generate_readme()

print(readme)