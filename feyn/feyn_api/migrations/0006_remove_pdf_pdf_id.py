# Generated by Django 4.2.5 on 2023-09-17 01:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('feyn_api', '0005_pdf_filepath'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='pdf',
            name='pdf_id',
        ),
    ]
