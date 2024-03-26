from django.urls import path
from .views import get_parking_booking_from_date, get_user_parking_data

urlpatterns = [
    path('get_parking_booking_from_date/', get_parking_booking_from_date, name='get_parking_booking_from_date'),
    path('get_user_parking_data/', get_user_parking_data, name='get_user_parking_data'),
]
