from django.http import JsonResponse
from .models import Status


def get_all_statuses_view(request):
    all_statuses = Status.objects.all()
    app_statuses = []
    for status in all_statuses:
        app_statuses.append(status.name)
    return JsonResponse({'app_statuses': app_statuses})
