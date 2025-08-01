from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('api/blogs/', include('blogs.urls')),
    path('api/onboarding/', include('onboarding.urls')),
    path('api/search/', include('search.urls')),


]
