from django.urls import path
from .views import get_parking_booking_from_date, show_all_parking_spots

urlpatterns = [
    path('get_parking_booking_from_date/', get_parking_booking_from_date, name='get_parking_booking_from_date'),
    path('show_all_parking_spots/', show_all_parking_spots, name='show_all_parking_spots_page'),
]
