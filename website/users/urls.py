from django.urls import path
from django.contrib.auth.views import LogoutView
from .views import CustomLoginView


urlpatterns = [
    path("login/", CustomLoginView.as_view(), name="login_page"),
    path("logout/", LogoutView.as_view(), name="logout_page"),
]
