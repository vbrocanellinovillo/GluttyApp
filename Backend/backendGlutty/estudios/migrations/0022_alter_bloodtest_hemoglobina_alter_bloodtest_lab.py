# Generated by Django 5.0.6 on 2024-11-12 16:29

import secured_fields.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('estudios', '0021_alter_bloodtest_adgp_iga_alter_bloodtest_adgp_igg_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloodtest',
            name='hemoglobina',
            field=secured_fields.fields.EncryptedDecimalField(blank=True, decimal_places=2, default=None, max_digits=4, null=True),
        ),
        migrations.AlterField(
            model_name='bloodtest',
            name='lab',
            field=secured_fields.fields.EncryptedCharField(default=None, max_length=150, null=True),
        ),
    ]