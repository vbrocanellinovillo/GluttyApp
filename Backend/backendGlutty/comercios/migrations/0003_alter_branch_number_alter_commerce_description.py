# Generated by Django 5.0.6 on 2024-07-29 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comercios', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='branch',
            name='number',
            field=models.IntegerField(blank=True),
        ),
        migrations.AlterField(
            model_name='commerce',
            name='description',
            field=models.CharField(blank=True, max_length=300),
        ),
    ]
