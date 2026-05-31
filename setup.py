from setuptools import setup, find_packages

setup(
    name="codememoryai",
    version="0.2.0",
    packages=find_packages(),
    install_requires=[
        "sentence-transformers",
        "chromadb",
        "gitpython",
        "python-dotenv",
        "groq",
        "streamlit"
    ],
    author="Anushka Dutta",
    description="AI-powered GitHub repository analyzer and README generator",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
)