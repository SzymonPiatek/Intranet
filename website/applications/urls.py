from django.urls import path
from .views import create_application_view


urlpatterns = [
    path('create/', create_application_view, name="create_application_page"),
]
