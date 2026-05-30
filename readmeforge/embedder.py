from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    'all-MiniLM-L6-v2'
)


def create_embedding(text):

    embedding = model.encode(text)

    return embedding


if __name__ == "__main__":

    text = """
    def login():
        print("authentication")
    """

    embedding = create_embedding(text)

    print("Embedding length:", len(embedding))

    print(embedding[:10])