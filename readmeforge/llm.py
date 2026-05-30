from openai import OpenAI
from dotenv import load_dotenv

import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("GROQ_API_KEY"),
    base_url="https://api.groq.com/openai/v1"
)


def ask_llm(context, question):

    prompt = f"""
You are a senior software engineer analyzing a repository.

Use the repository context carefully.

Prioritize:
- implementation files
- actual source code
- architecture-related files

Avoid depending mainly on:
- test files
- mock files
- examples

REPOSITORY CONTEXT:
{context}

QUESTION:
{question}

Provide:
1. direct answer
2. relevant files
3. technical explanation
4. concise architecture understanding
"""
    response = client.chat.completions.create(

        model="llama-3.3-70b-versatile",

        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],

        temperature=0.3
    )

    return response.choices[0].message.content