# Generated by Django 5.0.6 on 2024-09-30 20:49

import sqlalchemy.sql._elements_constructors
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estudios', '0014_gluttytips'),
    ]

    operations = [
        migrations.DeleteModel(
            name='BloodTestVariables',
        ),
        migrations.AddField(
            model_name='gluttytips',
            name='title',
            field=models.CharField(blank=True, default=sqlalchemy.sql._elements_constructors.null, max_length=200, null=True),
        ),
    ]