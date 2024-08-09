# Generated by Django 5.0.6 on 2024-08-08 15:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comercios', '0004_remove_commerce_social_reason'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='branch',
            name='number',
        ),
        migrations.AddField(
            model_name='branch',
            name='name',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='branch',
            name='optional_phone',
            field=models.CharField(blank=True, max_length=10),
        ),
        migrations.AddField(
            model_name='branch',
            name='phone',
            field=models.CharField(default=None, max_length=10),
        ),
        migrations.AddField(
            model_name='branch',
            name='separated_kitchen',
            field=models.BooleanField(default=False),
        ),
    ]