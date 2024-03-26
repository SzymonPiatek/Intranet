from django.http import JsonResponse
from .models import ParkingBooking


def get_parking_booking_from_date(request):
    if 'date' in request.GET:
        date = request.GET.get('date')
        parking_booking = ParkingBooking.objects.filter(date=date, tenant=request.user).first()
        if parking_booking:
            booking_data = {'spot': parking_booking.spot.name, 'type': "Reserved"}
            return JsonResponse({'parking_booking': booking_data})
        else:
            return JsonResponse({'info': 'No reserved parking spots'})


def get_shared_parking_from_date(request):
    if 'date' in request.GET:
        date = request.GET.get('date')
        parking_booking = ParkingBooking.objects.filter(spot__owners=request.user, date=date).first()
        if parking_booking:
            booking_data = {'spot': parking_booking.spot.name, 'type': "Shared"}
            return JsonResponse({'parking_booking': booking_data})
        else:
            return JsonResponse({'info': 'No shared parking spots'})
