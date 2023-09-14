from django.urls import path
from .views import CopaymentReportView

urlpatterns = [
    path('copayment/', CopaymentReportView.as_view(),
         name='copayment-report'),
]
