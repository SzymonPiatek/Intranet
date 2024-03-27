from django.http import JsonResponse
from .models import ParkingBooking, ParkingSpot


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
                    booking_type = "Free spot"
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


def get_user_parking_data(request):
    user_parking_spot = ParkingSpot.objects.filter(owner=request.user).first()

    if user_parking_spot:
        user_parking_spot_json = {"spot": user_parking_spot.name,
                                  "date": "Permanently",
                                  "info": "Share your parking spot"}

        user_shared_spots = ParkingBooking.objects.filter(spot__owner=request.user).order_by('date')[:3]
        if user_shared_spots.exists():
            free_parking_spot_json = []
            for spot in user_shared_spots:
                if spot.tenant:
                    info = f"Shared for {spot.tenant}"
                else:
                    info = "Free spot"
                free_parking_spot_json.append({"spot": spot.spot.name,
                                               "date": spot.date,
                                               "info": info})
            return JsonResponse({'user_parking_spots': user_parking_spot_json,
                                 'free_parking_spots': free_parking_spot_json})
        else:
            return JsonResponse({'user_parking_spots': user_parking_spot_json,
                                 'second_info': "You have not shared any parking spot"})
    else:
        user_parking_spot = ParkingBooking.objects.filter(tenant=request.user).order_by('date')
        free_parking_spot = ParkingBooking.objects.filter(tenant=None).order_by('date')

        print(f"User: {user_parking_spot.count()}")
        print(f"Free: {free_parking_spot.count()}")

        if user_parking_spot.count() >= 2 and free_parking_spot.count() >= 2:
            user_parking_spot = user_parking_spot[:2]
            free_parking_spot = free_parking_spot[:2]
        elif user_parking_spot.count() < 2:
            free_parking_spot = free_parking_spot[:(4 - user_parking_spot.count())]
        elif free_parking_spot.count() < 2:
            user_parking_spot = user_parking_spot[:(4 - free_parking_spot.count())]

        if user_parking_spot.exists():
            user_parking_spot_json = []
            for spot in user_parking_spot:
                user_parking_spot_json.append({"spot": spot.spot.name,
                                               "date": spot.date,
                                               "info": "Reserved"})
        if free_parking_spot.exists():
            free_parking_spot_json = []
            for spot in free_parking_spot:
                free_parking_spot_json.append({"spot": spot.spot.name,
                                               "date": spot.date,
                                               "info": "Available"})

        if user_parking_spot.exists() and free_parking_spot.exists():
            return JsonResponse({"user_parking_spots": user_parking_spot_json,
                                 "free_parking_spots": free_parking_spot_json})
        elif user_parking_spot.exists() and not free_parking_spot.exists():
            return JsonResponse({"user_parking_spots": user_parking_spot_json,
                                 "second_info": "There are no available spots to book"})
        elif not user_parking_spot.exists() and free_parking_spot.exists():
            return JsonResponse({"first_info": "You do not have any parking spot reservation",
                                 "free_parking_spots": free_parking_spot_json})
        elif not user_parking_spot.exists() and not free_parking_spot.exists():
            return JsonResponse({"first_info": "You do not have any parking spot reservation",
                                 "second_info": "There are no available spots to book"})
