from groq import Groq
from dotenv import load_dotenv

import os

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def ask_llm(context, question):

    prompt = f"""
You are a senior software engineer analyzing a repository.

Use repository context carefully.

REPOSITORY CONTEXT:
{context}

QUESTION:
{question}

Provide:
1. direct answer
2. relevant files
3. concise technical explanation
"""

    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content