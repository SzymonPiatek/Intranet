from django.contrib import admin
from .models import ParkingSpot, ParkingBooking


@admin.register(ParkingSpot)
class ParkingSpotAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "owner",
    )


@admin.register(ParkingBooking)
class ParkingBookingAdmin(admin.ModelAdmin):
    list_display = (
        "spot",
        "tenant",
        "date",
    )
