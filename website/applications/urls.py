from django.urls import path
from .views import create_application_view, show_my_applications_view


urlpatterns = [
    path('create/', create_application_view, name="create_application_page"),
    path('my_applications/', show_my_applications_view, name="show_my_applications_page"),
]
