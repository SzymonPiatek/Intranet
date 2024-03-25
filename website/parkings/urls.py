from django.urls import path
from .views import get_parking_bookings_from_date

urlpatterns = [
    path('get_parking_bookings_from_date/', get_parking_bookings_from_date, name='get_parking_bookings_from_date'),
]
