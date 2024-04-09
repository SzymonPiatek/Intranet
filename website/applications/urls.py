from django.urls import path
from .views import create_application_view, show_my_applications_view, show_all_applications_view


urlpatterns = [
    path('create/', create_application_view, name="create_application_page"),
    path('my/', show_my_applications_view, name="show_my_applications_page"),
    path('all/', show_all_applications_view, name="show_all_applications_page"),
]
