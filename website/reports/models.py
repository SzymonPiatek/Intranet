from django.db import models
from users.models import CustomUser


class Category(models.Model):
    name = models.CharField(max_length=255, blank=False, null=False, unique=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Report(models.Model):
    STATUS_LIST = [
        ("open", "Open"),
        ("closed", "Closed"),
        ("deleted", "Deleted"),
    ]

    name = models.CharField(max_length=255, blank=False, null=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False, null=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS_LIST, blank=True)
    description = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Report"
        verbose_name_plural = "Reports"

    def __str__(self):
        return self.name


class ReportData(models.Model):
    STATUS_LIST = [
        ("in_progress", "In Progress"),
        ("completed", "Completed"),
        ("permanent", "Permanent")
    ]

    report = models.ForeignKey(Report, on_delete=models.CASCADE, blank=False, null=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, blank=False, null=False)
    task = models.CharField(max_length=255, blank=False, null=False)
    task_category = models.CharField(max_length=255, blank=False, null=False)
    task_date = models.DateField()
    status = models.CharField(max_length=50, choices=STATUS_LIST, blank=True)
    description = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Report data"
        verbose_name_plural = "Reports data"

    def __str__(self):
        return self.task
