from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings


embedding_model = SentenceTransformer('all-MiniLM-L6-v2')

# Chroma client
chroma_client = chromadb.PersistentClient(path="chroma_db")
collection = chroma_client.get_or_create_collection(name="blog_embeddings")


def add_in_chroma_db(blog, content_to_embed):
    # Generate embedding
    embedding = embedding_model.encode(content_to_embed).tolist()

    # Add to ChromaDB
    collection.add(
                documents=[content_to_embed],
                metadatas=[{
                    "id": blog.id,
                    "title": blog.title,
                    "author": blog.user.username,
                    "genres": ", ".join(blog.genre_list),
                }],
                ids=[str(blog.id)],
                embeddings=[embedding]
            )
    
    print("Story added in vector database!")