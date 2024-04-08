from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from parkings.models import ParkingSpot
from applications.models import Status


@login_required
def home_view(request):
    user = request.user
    user_have_parking_spot = ParkingSpot.objects.filter(owner=user).exists()

    application_statuses = Status.objects.all()

    context = {
        "user_have_parking_spot": user_have_parking_spot,
        "application_statuses": application_statuses,
    }

    return render(request, "home.html", context)
