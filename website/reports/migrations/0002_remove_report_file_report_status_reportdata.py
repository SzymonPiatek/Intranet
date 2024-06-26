# Generated by Django 5.0.3 on 2024-03-24 06:07

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='report',
            name='file',
        ),
        migrations.AddField(
            model_name='report',
            name='status',
            field=models.CharField(blank=True, choices=[('open', 'Open'), ('closed', 'Closed'), ('deleted', 'Deleted')], max_length=50),
        ),
        migrations.CreateModel(
            name='ReportData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task', models.CharField(max_length=255)),
                ('task_category', models.CharField(max_length=255)),
                ('task_date', models.DateField()),
                ('status', models.CharField(blank=True, choices=[('in_progress', 'In Progress'), ('completed', 'Completed'), ('permanent', 'Permanent')], max_length=50)),
                ('description', models.TextField()),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('report', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reports.report')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Report data',
                'verbose_name_plural': 'Reports data',
            },
        ),
    ]
