from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.urls import reverse_lazy


class CustomLoginView(LoginView):
    template_name = 'users/login.html'

    def dispatch(self, request, *args, **kwargs):
        if self.request.user.is_authenticated:
            return redirect(reverse_lazy('home_page'))
        return super().dispatch(request, *args, **kwargs)
