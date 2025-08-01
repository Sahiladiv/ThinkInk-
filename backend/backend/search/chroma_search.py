from django.shortcuts import render
import chromadb
from sentence_transformers import SentenceTransformer

# Loading model once
model = SentenceTransformer("all-MiniLM-L6-v2")

# Loading Chroma client and collection
client = chromadb.PersistentClient(path="chroma_db")
collection = client.get_or_create_collection("news_articles_vectors")

def search_blogs(query_text: str, top_n: int = 5):
    # Generate embedding for the search query
    query_embedding = model.encode([query_text])[0].tolist()

    # Query ChromaDB
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_n
    )

    # Extract metadata and similarity scores
    metadatas = results.get("metadatas", [[]])[0]
    distances = results.get("distances", [[]])[0]

    recommendations = []
    for meta, score in zip(metadatas, distances):
        similarity = round(1 - score, 3)  # Convert distance to similarity
        recommendations.append({
            "id": meta.get("id"),
            "title": meta.get("title"),
            "author": meta.get("author"),
            "genres": meta.get("genres"),
            "similarity": similarity
        })

    return recommendations
