# Generated by Django 5.0.3 on 2024-03-24 08:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0002_remove_report_file_report_status_reportdata'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reportdata',
            name='task_category',
        ),
    ]
