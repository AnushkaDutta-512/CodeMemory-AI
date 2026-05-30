import streamlit as st

from readmeforge.query import search_code
from readmeforge.llm import ask_llm
from readmeforge.clone_repo import clone_repository
from readmeforge.ingest import ingest_repository



st.title("🧠 Codebase Memory AI")
repo_url = st.text_input(
    "Enter GitHub Repository URL"
)

if st.button("Load Repository"):

    with st.spinner("Cloning and analyzing repository..."):

        repo_path = clone_repository(repo_url)

        ingest_repository(repo_path)

    st.success("Repository loaded successfully!")

st.write("Ask questions about a GitHub repository")

question = st.text_input(
    "Enter your question"
)

if st.button("Analyze Repository"):

    results = search_code(question)

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]

    context = ""

    for i in range(len(documents)):

        context += f"""
FILE:
{metadatas[i]["source"]}

CODE:
{documents[i]}
"""

    answer = ask_llm(context, question)

    st.subheader("AI Answer")

    st.write(answer)

    st.subheader("Relevant Files")

    for i in range(len(documents)):

        st.write(metadatas[i]["source"])