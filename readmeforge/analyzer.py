from readmeforge.clone_repo import clone_repository
from readmeforge.ingest import ingest_repository
from readmeforge.query import search_code
from readmeforge.llm import ask_llm
from readmeforge.readme_generator import generate_readme
import os
from readmeforge.dependency_analyzer import analyze_dependencies
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

        # Filter and rank chunks based on basic keyword overlap
        query_terms = set(question.lower().split())
        scored_docs = []

        for i in range(len(documents)):
            source = metadatas[i]["source"].lower()
            if any(ignore in source for ignore in ["test", "spec", "mock", "fixture"]):
                continue
            
            doc_lower = documents[i].lower()
            priority = metadatas[i].get(
    "priority",
    0
)

            keyword_score = sum(
                1 for term in query_terms
                if term in doc_lower
            )

            score = keyword_score + (priority * 3)
            scored_docs.append({
                "score": score,
                "source": metadatas[i]["source"],
                "content": documents[i]
            })

        # Sort by score descending and take top 5 for context
        scored_docs.sort(key=lambda x: x["score"], reverse=True)
        top_docs = scored_docs[:5]

        context = ""
        for doc in top_docs:
            context += f"""
    FILE:
    {doc["source"]}

    CODE:
    {doc["content"]}
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
    def analyze_dependencies(self):

        return analyze_dependencies(
            self.repo_path
        )
    def export_dependency_report(self):

        dependencies = self.analyze_dependencies()

        dependency_content = "\n".join(
            dependencies
        )

        export_report(
            "DEPENDENCIES.md",
            dependency_content
        )

    def health_score(self):

        security_issues = len(
            self.security_scan()
        )

        dependencies = len(
            self.analyze_dependencies()
        )

        dead_code = len(
            self.find_dead_code()
        )

        security_score = max(
            50,
            100 - (security_issues * 10)
        )

        dependency_score = max(
            60,
            100 - dependencies
        )

        code_quality = max(
            50,
            100 - (dead_code * 5)
        )

        architecture_score = 80
        documentation_score = 88

        overall = int(
            (
                security_score +
                dependency_score +
                code_quality +
                architecture_score +
                documentation_score
            ) / 5
        )

        return {
            "overall": overall,
            "security": security_score,
            "architecture": architecture_score,
            "documentation": documentation_score,
            "dependencies": dependency_score,
            "code_quality": code_quality
        }