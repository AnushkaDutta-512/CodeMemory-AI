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

dead = repo.find_dead_code()

print(dead)

repo.export_architecture_report()

repo.export_dead_code_report()
security = repo.security_scan()

print(security)