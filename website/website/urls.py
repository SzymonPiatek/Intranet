from django.contrib import admin
from django.urls import path, include
from .views import home_view


urlpatterns = [
    path("", home_view, name="home_page"),
    path('admin/', admin.site.urls),
    path('auth/', include("users.urls")),
    path('parkings/', include("parkings.urls")),
    path('applications/', include("applications.urls")),
]
