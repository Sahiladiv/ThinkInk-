from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Story, UserPreference
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recommend_stories(request):
    user = request.user
    preference, _ = UserPreference.objects.get_or_create(user=user)
    liked = preference.liked_stories.all()
    authors = preference.favorite_authors.all()

    if not liked:
        return Response({"message": "No preferences yet", "recommendations": []})

    liked_embeddings = np.array([s.embedding for s in liked if s.embedding])
    if liked_embeddings.size == 0:
        return Response({"message": "No embeddings found", "recommendations": []})

    mean_vector = np.mean(liked_embeddings, axis=0)
    candidates = Story.objects.exclude(id__in=liked.values_list('id', flat=True))
    scored = []
    for story in candidates:
        if not story.embedding:
            continue
        sim = cosine_similarity([mean_vector], [story.embedding])[0][0]
        author_bonus = 1.0 if story.author in authors else 0.0
        scored.append((story, sim + author_bonus))

    top_stories = sorted(scored, key=lambda x: x[1], reverse=True)[:10]
    data = [{
        'id': s.id,
        'title': s.title,
        'author': s.author.username,
        'score': round(score, 3)
    } for s, score in top_stories]

    return Response({"recommendations": data})
