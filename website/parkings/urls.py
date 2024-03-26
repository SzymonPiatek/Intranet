from django.urls import path
from .views import get_parking_booking_from_date, get_shared_parking_from_date

urlpatterns = [
    path('get_parking_booking_from_date/', get_parking_booking_from_date, name='get_parking_booking_from_date'),
    path('get_shared_parking_from_date/', get_shared_parking_from_date, name='get_shared_parking_from_date'),
]
