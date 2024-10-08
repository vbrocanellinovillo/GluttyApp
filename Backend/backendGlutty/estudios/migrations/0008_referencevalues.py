# Generated by Django 5.0.6 on 2024-09-26 19:16

import django.db.models.deletion
import sqlalchemy.sql._elements_constructors
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('estudios', '0007_laboratory_variable_bloodtest_public_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='ReferenceValues',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('min_value', models.DecimalField(decimal_places=2, max_digits=5)),
                ('max_value', models.DecimalField(decimal_places=2, max_digits=5)),
                ('sex', models.CharField(choices=[('Male', 'Male'), ('Female', 'Female'), ('N/A', 'No Aplica')], default='N/A', max_length=10)),
                ('min_age', models.CharField(default=sqlalchemy.sql._elements_constructors.null, max_length=3, null=True)),
                ('max_age', models.CharField(default=sqlalchemy.sql._elements_constructors.null, max_length=3, null=True)),
                ('lab', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='variables', to='estudios.laboratory')),
                ('variable', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='estudios.variable')),
            ],
        ),
    ]
