from django.urls import include, path
from rest_framework.routers import DefaultRouter
from apps.appointments.api.views import AppointmentListCreateView, AppointmentDetailView, PaymentMethodListCreateView, PaymentMethodRetrieveUpdateDestroyView, PatientAppointmentsListView, PatientAppointmentDeleteView

router = DefaultRouter()
router.register('', PatientAppointmentsListView, basename='patient')

urlpatterns = [
    path('', AppointmentListCreateView.as_view(),
         name='appointment-list-create'),
    path('<int:pk>/', AppointmentDetailView.as_view(),
         name='appointment-detail'),
    path('payment_method/', PaymentMethodListCreateView.as_view(),
         name='payment-method-list-create'),
    path('payment_method/<int:pk>/', PaymentMethodRetrieveUpdateDestroyView.as_view(),
         name='payment-method-retrieve-update-destroy'),
    path('patient/', include(router.urls)),
    path('patient/cancel/<int:pk>/',
         PatientAppointmentDeleteView.as_view(), name='appointment-cancel'),
]
