from django.core.management.base import BaseCommand
from applications.models import Status


class Command(BaseCommand):
    help = "Create basic statuses for applications"

    def handle(self, *args, **kwargs):
        statuses = [
            "New", "Sent to signed", "Signed", "Sent to verification", "Verified", "Completed"
        ]

        for status in statuses:
            Status.objects.create(name=status)

        print("All statuses created")
