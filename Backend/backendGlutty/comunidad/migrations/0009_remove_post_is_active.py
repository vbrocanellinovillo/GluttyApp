# Generated by Django 5.0.6 on 2024-12-10 16:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comunidad', '0008_post_is_active'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='is_active',
        ),
    ]
