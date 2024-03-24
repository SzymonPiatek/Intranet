from django.core.management.base import BaseCommand
from django.contrib.auth.hashers import make_password
import getpass
import re
from users.models import CustomUser


class Command(BaseCommand):
    help = "Create new basic user"

    def handle(self, *args, **kwargs):
        def is_valid_email(email_value):
            email_regex = re.compile(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
            return email_regex.match(email_value)

        username = input("Username: ")
        email = input("Email: ")

        while not is_valid_email(email):
            self.stdout.write(self.style.ERROR('Invalid email address. Please enter a valid email address.'))
            email = input('Enter email: ')

        password = getpass.getpass("Password: ")

        if CustomUser.objects.filter(username=username).exists() or CustomUser.objects.filter(email=email).exists():
            self.stdout.write(self.style.ERROR('User with this username or email already exists.'))
            return

        new_user = CustomUser.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )

        self.stdout.write(self.style.SUCCESS(f'User "{username}" created successfully.'))
