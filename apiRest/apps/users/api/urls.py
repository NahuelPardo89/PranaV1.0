from django.urls import path
from apps.users.api.views import UserAPIView

urlpatterns=[
    path('usuario/',UserAPIView.as_view(), name='usuario_api'),
]