from django.db.models.signals import post_save
from django.dispatch import receiver


@receiver(post_save, sender='applications.Application')
def create_application_status_history(sender, instance, created, **kwargs):
    if not created:
        from .models import ApplicationStatusHistory
        latest_status = instance.status
        previous_status = ApplicationStatusHistory.objects.filter(application=instance).order_by('-edit_date').first()

        if previous_status:
            previous_status.status = previous_status.status

        if latest_status != previous_status:
            ApplicationStatusHistory.objects.create(application=instance, status=latest_status, user=instance.user)
