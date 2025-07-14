from rest_framework import serializers
from .models import Onboarding

class OnboardingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Onboarding
        fields = ['preferences', 'completed']

    def validate_preferences(self, value):
        allowed = {'adventure', 'romance', 'sci-fi', 'horror', 'mystery', 'fantasy'}
        if not all(pref in allowed for pref in value):
            raise serializers.ValidationError("Invalid story type selected.")
        return value
