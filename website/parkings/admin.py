from django.contrib import admin
from .models import ParkingSpot, ParkingBooking


@admin.register(ParkingSpot)
class ParkingSpotAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "display_owners",
    )

    def display_owners(self, obj):
        return ", ".join([owner.username for owner in obj.owners.all()]) if obj.owners.exists() else "Empty"

    display_owners.short_description = "owners"


@admin.register(ParkingBooking)
class ParkingBookingAdmin(admin.ModelAdmin):
    list_display = (
        "spot",
        "tenant",
        "date",
    )
