from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NewletterViewSet

router = DefaultRouter()
router.register(r'newsletters', NewletterViewSet)

urlpatterns = [
    path('', include(router.urls)),
]