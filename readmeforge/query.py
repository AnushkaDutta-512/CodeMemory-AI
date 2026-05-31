from readmeforge.embedder import create_embedding
from readmeforge.vector_store import collection


def search_code(query):

    query_embedding = create_embedding(query)

    results = collection.query(
        query_embeddings=[
            query_embedding.tolist()
        ],
        n_results=15
    )

    return results


if __name__ == "__main__":

    question = input("Ask question: ")

    results = search_code(question)

    print(results)