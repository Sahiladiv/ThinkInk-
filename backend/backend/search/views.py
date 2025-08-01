from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .chroma_search import search_blogs
from rest_framework.permissions import AllowAny


class SearchContentView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        query = request.GET.get("q", "")
        if not query:
            return Response({"error": "Missing query"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            results = search_blogs(query, top_n=10) 
            print(results)
            return Response(results, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
