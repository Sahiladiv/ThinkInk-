from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Onboarding
from .serializers import OnboardingSerializer
from accounts.models import UserProfile

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

            # Mark user as onboarded
            profile, created = UserProfile.objects.get_or_create(user=request.user)
            profile.onboarded = True
            profile.save()

            return Response({'message': 'Preferences saved and onboarding marked complete'})
        
        return Response(serializer.errors, status=400)

