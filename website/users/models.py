from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=50, blank=True, null=False)
    last_name = models.CharField(max_length=50, blank=True, null=False)
    full_name = models.CharField(max_length=100, blank=True, null=False)

    username = models.CharField(max_length=50, unique=True, blank=False, null=False)
    email = models.EmailField(unique=True, blank=False, null=False)

    title = models.CharField(max_length=100, blank=True, null=True)

    groups = models.ManyToManyField(Group, blank=True)
    user_permissions = models.ManyToManyField(Permission, blank=True)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

    def __str__(self):
        return self.full_name if self.full_name else self.username if self.username else self.email

    def save(self, *args, **kwargs):
        if self.first_name and self.last_name and not self.full_name:
            self.full_name = f"{self.first_name} {self.last_name}"
        super().save(*args, **kwargs)
