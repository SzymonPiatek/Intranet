from django.http import JsonResponse
from .models import ParkingBooking


def get_parking_bookings_from_date(request):
    if 'date' in request.GET:
        date = request.GET.get('date')
        parking_booking = ParkingBooking.objects.filter(date=date, tenant=request.user).first()
        if parking_booking:
            booking_data = {'spot': parking_booking.spot.name}
            return JsonResponse({'parking_booking': booking_data})
        else:
            return JsonResponse({'info': 'No bookings'})
