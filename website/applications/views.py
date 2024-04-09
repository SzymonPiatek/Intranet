from django.conf import settings
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
import os
from uuid import uuid4
from .models import Application, Status


def find_status(name):
    try:
        new_status = Status.objects.get(name=name)
        return new_status
    except Status.DoesNotExist:
        return None


@csrf_exempt
def create_application_view(request):
    if request.method == 'POST':
        try:
            if 'name' in request.POST:
                name = request.POST['name']
            else:
                return JsonResponse({"error": "Name field is missing"}, status=400)

            if 'file' in request.FILES:
                file = request.FILES['file']
                file_name = str(uuid4()) + os.path.splitext(file.name)[-1]

                file_path = os.path.join(settings.MEDIA_ROOT, 'applications', file_name)

                with open(file_path, 'wb') as destination:
                    for chunk in file.chunks():
                        destination.write(chunk)
            else:
                return JsonResponse({"error": "File is missing"}, status=400)

            application = Application(name=name, file=file_name, status=find_status("New"), user=request.user)
            application.full_clean()
            application.save()

            return JsonResponse({"message": "Application created"}, status=201)
        except ValidationError as e:
            return JsonResponse({"error": e.message_dict}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Only POST method is allowed"}, status=405)


def show_my_applications_view(request):
    my_applications = Application.objects.filter(user=request.user)

    my_applications_data = []
    for application in my_applications:
        application_data = model_to_dict(application)
        if 'file' in application_data:
            file_url = request.build_absolute_uri(application.file.url)
            application_data['file'] = file_url

        user_name = application.user.username if application.user else "Unknown"
        status_name = application.status.name if application.status else "Unknown"

        application_data['user'] = user_name
        application_data['status'] = status_name

        my_applications_data.append(application_data)

    return JsonResponse(my_applications_data, safe=False)

