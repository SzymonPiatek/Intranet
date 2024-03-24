from django.contrib import admin
from .models import Status, Application, ApplicationStatusHistory, Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
    )


@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = (
        "name",
    )


@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "file",
        "user",
        "status",
        "created_date",
    )

    list_filter = (
        "user",
        "status",
    )


@admin.register(ApplicationStatusHistory)
class ApplicationStatusHistoryAdmin(admin.ModelAdmin):
    list_display = (
        "application",
        "status",
        "edit_date",
        "user",
    )

    list_filter = (
        "application",
        "status",
        "user",
    )
