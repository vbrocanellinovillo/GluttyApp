# Generated by Django 5.0.6 on 2024-05-27 22:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='dateBirth',
            field=models.DateField(default=datetime.date(2024, 5, 27)),
        ),
    ]
