# Generated by Django 5.0.6 on 2024-11-30 19:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comercios', '0024_rename_branchviews_branchview'),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('day', models.PositiveSmallIntegerField(choices=[(1, 'Lunes'), (2, 'Martes'), (3, 'Miércoles'), (4, 'Jueves'), (5, 'Viernes'), (6, 'Sábado'), (7, 'Domingo')])),
                ('min_time', models.TimeField()),
                ('max_time', models.TimeField()),
                ('branch', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedules', to='comercios.branch')),
            ],
            options={
                'ordering': ['branch', 'day'],
                'unique_together': {('branch', 'day')},
            },
        ),
    ]
