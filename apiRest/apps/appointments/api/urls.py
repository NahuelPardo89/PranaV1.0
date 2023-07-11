from django.urls import path
from rest_framework.routers import DefaultRouter
from apps.appointments.api.views import AppointmentListCreateView, AppointmentDetailView

router = DefaultRouter()

urlpatterns = [
    path('', AppointmentListCreateView.as_view(),
         name='appointment-list-create'),
    path('<int:pk>/', AppointmentDetailView.as_view(),
         name='appointment-detail'),
]
