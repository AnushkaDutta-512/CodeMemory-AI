from readmeforge.clone_repo import clone_repository
from readmeforge.ingest import ingest_repository
from readmeforge.query import search_code
from readmeforge.llm import ask_llm
from readmeforge.readme_generator import generate_readme
import os
from readmeforge.security import security_scan
from readmeforge.exporter import export_report
from readmeforge.dead_code import find_dead_code
from readmeforge.architecture import analyze_architecture
class RepoAnalyzer:

    def __init__(self, repo_url):

        self.repo_url = repo_url
        self.repo_path = None

    def ingest(self):

        print("Cloning repository...")

        self.repo_path = clone_repository(
            self.repo_url
        )

        if not os.path.exists("vector_db"):

            print("Creating repository memory...")

            ingest_repository(self.repo_path)

        else:

            print("Repository already embedded. Skipping ingestion.")

        print("Repository ready!")
        

        def ask(self, question):

            results = search_code(question)

            documents = results["documents"][0]
            metadatas = results["metadatas"][0]

            context = ""

            for i in range(len(documents)):

                source = metadatas[i]["source"]

                if "test" in source.lower():
                    continue

                context += f"""
    FILE:
    {metadatas[i]["source"]}

    CODE:
    {documents[i]}
    """

            answer = ask_llm(
                context,
                question
            )

            return answer
    def generate_readme(self,save=False):

        return generate_readme(
                    self.repo_path,
                    save
)
    def analyze_architecture(self):

            return analyze_architecture()
    def find_dead_code(self):

        return find_dead_code(
            self.repo_path
        )
    def export_architecture_report(self):

        architecture = self.analyze_architecture()

        export_report(
            "ARCHITECTURE.md",
            architecture
        )


    def export_dead_code_report(self):

        dead = self.find_dead_code()

        dead_content = "\n".join(dead)

        export_report(
            "DEADCODE.md",
            dead_content
        )
    def security_scan(self):

        return security_scan(
            self.repo_path
        )
    def export_security_report(self):

        security = self.security_scan()

        security_content = "\n".join(
            security
        )

        export_report(
            "SECURITY.md",
            security_content
        )