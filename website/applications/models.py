from django.db import models
from users.models import CustomUser
import uuid
import os


def upload_to(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('applications/', filename)


class Status(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False, unique=True)

    class Meta:
        verbose_name = "Status"
        verbose_name_plural = "Statuses"

    def __str__(self):
        return self.name


class Application(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False)
    file = models.FileField(upload_to=upload_to)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False, null=False)
    status = models.ForeignKey(Status, on_delete=models.CASCADE, blank=False, null=False)
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Application'
        verbose_name_plural = 'Applications'

    def __str__(self):
        return self.name


class ApplicationStatusHistory(models.Model):
    application = models.ForeignKey(Application, on_delete=models.CASCADE, blank=False, null=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False, null=False)
    status = models.ForeignKey(Status, on_delete=models.CASCADE, blank=False, null=False)
    edit_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Application status history'
        verbose_name_plural = 'Application status histories'

    def __str__(self):
        return f"{self.application} - {self.status} - {self.edit_date} - {self.user}"
