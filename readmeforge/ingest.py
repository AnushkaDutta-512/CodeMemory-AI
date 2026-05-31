from readmeforge.read_repo import read_repository
from readmeforge.chunker import chunk_text
from readmeforge.embedder import create_embedding
from readmeforge.vector_store import collection

import uuid


def ingest_repository(repo_path):

    print("Reading repository...")

    files = read_repository(repo_path)

    print(f"Found {len(files)} files")

    total_chunks = 0

    for file in files:

        file_path = file["path"]

        content = file["content"]

        priority = file.get(
            "priority",
            0
        )

        chunks = chunk_text(content)

        for chunk in chunks:

            try:

                embedding = create_embedding(chunk)

                chunk_id = str(uuid.uuid4())

                collection.add(
                    ids=[chunk_id],
                    documents=[chunk],
                    embeddings=[embedding.tolist()],
                    metadatas=[
    {
        "source": file_path,
        "priority": priority
    }
]
                )
                print(collection.count())
                total_chunks += 1

                print(f"Stored chunk {total_chunks}")

            except Exception as e:

                print("Error:", e)

    print("\nINGESTION COMPLETE")
    print(f"Total chunks stored: {total_chunks}")


if __name__ == "__main__":

    repo_path = input("Enter repo path: ")

    ingest_repository(repo_path)