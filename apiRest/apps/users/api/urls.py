from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.routers import DefaultRouter
from apps.users.api.views import LoginAPI,LogoutAPI,UserViewSet

router = DefaultRouter()

router.register('users', UserViewSet, basename="users")

urlpatterns=[
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+router.urls