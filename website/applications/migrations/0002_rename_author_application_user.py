# Generated by Django 5.0.3 on 2024-03-22 16:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='application',
            old_name='author',
            new_name='user',
        ),
    ]
