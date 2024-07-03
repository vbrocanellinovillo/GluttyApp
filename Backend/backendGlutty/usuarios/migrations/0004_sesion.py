# Generated by Django 5.0.6 on 2024-07-02 22:35

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0003_alter_usuario_datebirth_alter_usuario_first_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sesion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_initialized', models.BooleanField(default=False)),
                ('login_attempts', models.PositiveIntegerField(default=0)),
                ('session_data', models.JSONField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='sesion', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
