# Generated by Django 5.0.6 on 2024-09-15 23:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estudios', '0005_remove_bloodtest_description_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='bloodtest',
            name='lab',
            field=models.CharField(default='No cargado', max_length=150),
        ),
    ]