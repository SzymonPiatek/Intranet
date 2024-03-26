from django.http import JsonResponse
from .models import ParkingBooking


def get_parking_bookings_from_date(request):
    if 'date' in request.GET:
        date = request.GET.get('date')
        parking_bookings = ParkingBooking.objects.filter(date=date, tenant=request.user)
        if parking_bookings:
            bookings_data = [{'spot': booking.spot.name, 'tenant': str(booking.tenant)} for booking in parking_bookings]
            return JsonResponse({'parking_bookings': bookings_data})
        else:
            return JsonResponse({'info': 'No bookings'})
