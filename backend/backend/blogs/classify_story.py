from bs4 import BeautifulSoup
from sentence_transformers import SentenceTransformer, util
import torch

model = SentenceTransformer("all-MiniLM-L6-v2")

GENRES = [
    "horror", "fantasy", "sci-fi", "mystery", "thriller",
    "romance", "literary", "historical", "speculative", "weird"
]
GENRE_EMB = model.encode(GENRES, convert_to_tensor=True, normalize_embeddings=True)

def strip_html(html: str) -> str:
    return BeautifulSoup(html or "", "html.parser").get_text(" ", strip=True)

def top_3_genres(text: str) -> list[str]:
    if not isinstance(text, str):
        text = str(text)
    clean = strip_html(text)
    emb = model.encode([clean], convert_to_tensor=True, normalize_embeddings=True)
    scores = util.cos_sim(emb, GENRE_EMB)[0]
    topk = torch.topk(scores, k=3)
    return [GENRES[i] for i in topk.indices.tolist()]
