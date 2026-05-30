def chunk_text(text, chunk_size=500):

    chunks = []

    start = 0

    while start < len(text):

        end = start + chunk_size

        chunk = text[start:end]

        chunks.append(chunk)

        start = end

    return chunks


if __name__ == "__main__":

    sample_text = "A" * 2000

    chunks = chunk_text(sample_text)

    print(f"Total chunks: {len(chunks)}")

    for i, chunk in enumerate(chunks):

        print(f"\nChunk {i+1}")

        print(chunk[:50])