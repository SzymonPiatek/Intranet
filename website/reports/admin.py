from django.contrib import admin
from .models import Category, Report, ReportData


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
    )


@admin.register(Report)
class ReportAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "user",
        "category",
        "status",
        "description",
        "created_date",
    )


@admin.register(ReportData)
class ReportDataAdmin(admin.ModelAdmin):
    list_display = (
        "report",
        "user",
        "task",
        "task_date",
        "status",
        "status",
        "description",
        "created_date",
    )
