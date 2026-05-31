from readmeforge.clone_repo import clone_repository
from readmeforge.ingest import ingest_repository
from readmeforge.query import search_code
from readmeforge.llm import ask_llm
from readmeforge.readme_generator import generate_readme
import os

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