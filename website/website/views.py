from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parkings.models import ParkingSpot


@login_required
def home_view(request):
    user = request.user
    user_have_parking_spot = ParkingSpot.objects.filter(owners=user).exists()

    context = {
        "user_have_parking_spot": user_have_parking_spot,
    }

    return render(request, "home.html", context)
