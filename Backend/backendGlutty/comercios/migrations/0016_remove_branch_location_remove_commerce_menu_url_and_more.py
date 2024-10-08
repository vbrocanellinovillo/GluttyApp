# Generated by Django 5.0.6 on 2024-08-19 19:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comercios', '0015_menu'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='branch',
            name='location',
        ),
        migrations.RemoveField(
            model_name='commerce',
            name='menu_url',
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address', models.CharField(max_length=255)),
                ('latitude', models.FloatField()),
                ('longitude', models.FloatField()),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='location', to='comercios.branch')),
            ],
        ),
    ]
