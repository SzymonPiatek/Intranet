from django.urls import path
from .views import get_all_statuses_view

urlpatterns = [
    path('get_all_statuses', get_all_statuses_view, name='get_all_statuses_page'),
]
