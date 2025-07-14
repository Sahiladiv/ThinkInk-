from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Onboarding
from .serializers import OnboardingSerializer

class OnboardingView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        onboarding, _ = Onboarding.objects.get_or_create(user=request.user)
        serializer = OnboardingSerializer(onboarding)
        return Response(serializer.data)

    def post(self, request):
        onboarding, _ = Onboarding.objects.get_or_create(user=request.user)
        serializer = OnboardingSerializer(onboarding, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Onboarding saved successfully'})
        return Response(serializer.errors, status=400)
