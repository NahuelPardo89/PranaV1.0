from django.urls import path
from rest_framework.routers import DefaultRouter
from apps.appointments.api.views import AppointmentListCreateView, AppointmentDetailView, PaymentMethodListCreateView, PaymentMethodRetrieveUpdateDestroyView

router = DefaultRouter()

urlpatterns = [
    path('', AppointmentListCreateView.as_view(),
         name='appointment-list-create'),
    path('<int:pk>/', AppointmentDetailView.as_view(),
         name='appointment-detail'),
    path('payment_method/', PaymentMethodListCreateView.as_view(),
         name='payment-method-list-create'),
    path('payment_method/<int:pk>/', PaymentMethodRetrieveUpdateDestroyView.as_view(),
         name='payment-method-retrieve-update-destroy'),
]
