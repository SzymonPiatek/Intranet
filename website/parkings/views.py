from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import ParkingBooking, ParkingSpot


def prepare_json_data(data):
    my_parkings_data = []
    for parking in data:
        parking_data = model_to_dict(parking)

        user_name = parking.owner.username if parking.owner else "Unknown"
        parking_data['owner'] = user_name

        my_parkings_data.append(parking_data)
    return my_parkings_data


def get_parking_booking_from_date(request):
    if 'date' in request.GET:
        date = request.GET.get('date')
        if ParkingSpot.objects.filter(owner=request.user).exists():
            parking_bookings = ParkingBooking.objects.filter(spot__owner=request.user, date=date)
            if parking_bookings.exists():
                parking_booking = parking_bookings.first()
                if parking_booking.tenant:
                    booking_type = f"Shared for {parking_booking.tenant}"
                else:
                    booking_type = "Shared"
            else:
                booking_type = None
                info = "No shared parking spot"
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


def show_all_parking_spots(request):
    parking_spots = ParkingSpot.objects.all()
    data = prepare_json_data(parking_spots)
    return JsonResponse(data, safe=False)


def share_my_parking_spot(request):
    parking_spots = ParkingSpot.objects.all()
    data = prepare_json_data(parking_spots)
    return JsonResponse(data, safe=False)
