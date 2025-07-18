from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import RegisterSerializer

class RegisterView(CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def onboarding_status(request):
    onboarded = getattr(request.user.userprofile, 'onboarded', False)
    return Response({'onboarded': onboarded})
