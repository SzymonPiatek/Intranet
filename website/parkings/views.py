from django.http import JsonResponse
from .models import ParkingBooking, ParkingSpot


def get_parking_booking_from_date(request):
    if 'date' in request.GET:
        date = request.GET.get('date')
        if ParkingSpot.objects.filter(owner=request.user).exists():
            parking_bookings = ParkingBooking.objects.filter(spot__owner=request.user, date=date)
            if parking_bookings.exists():
                parking_booking = parking_bookings.first()
                booking_type = f"Shared for {parking_booking.tenant if parking_booking.tenant else 'no one'}"
            else:
                booking_type = None
                info = "No shared parking spots"
        else:
            parking_bookings = ParkingBooking.objects.filter(date=date, tenant=request.user)
            if parking_bookings.exists():
                parking_booking = parking_bookings.first()
                booking_type = "Reserved"
            else:
                booking_type = None
                info = "No reserved parking spots"

        if booking_type:
            booking_data = {'spot': parking_booking.spot.name, 'type': booking_type}
            return JsonResponse({'parking_booking': booking_data})
        else:
            return JsonResponse({'info': info})


def get_user_parking_data(request):
    user_parking_spot = ParkingSpot.objects.filter(owner=request.user)
    if user_parking_spot.exists():
        user_parking_spot_json = {'spot': user_parking_spot.first().name}
        return JsonResponse({'user_parking_spot': user_parking_spot_json})

