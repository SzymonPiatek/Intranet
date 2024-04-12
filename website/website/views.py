from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parkings.models import ParkingSpot


@login_required
def home_view(request):
    user = request.user
    user_parking_spot = ParkingSpot.objects.filter(owner=user).first()

    context = {
        "user_parking_spot": user_parking_spot,
    }

    return render(request, "home.html", context)
