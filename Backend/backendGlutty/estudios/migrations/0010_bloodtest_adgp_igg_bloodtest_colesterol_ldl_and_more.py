# Generated by Django 5.0.6 on 2024-09-28 01:23

import sqlalchemy.sql._elements_constructors
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estudios', '0009_alter_bloodtest_lab'),
    ]

    operations = [
        migrations.AddField(
            model_name='bloodtest',
            name='aDGP_IgG',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True, verbose_name='IgG anti Gliadina Deaminada'),
        ),
        migrations.AddField(
            model_name='bloodtest',
            name='colesterol_ldl',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
        migrations.AlterField(
            model_name='referencevalues',
            name='sex',
            field=models.CharField(choices=[('Male', 'Male'), ('Female', 'Female')], default=sqlalchemy.sql._elements_constructors.null, max_length=10),
        ),
    ]
