from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.users.api.views import UserAPIView,LoginAPI,LogoutAPI

urlpatterns=[
    path('usuario/',UserAPIView.as_view(), name='usuario_api'),
    path('login/', LoginAPI.as_view(), name='login'),
    path('logout/', LogoutAPI.as_view(), name='logout'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]