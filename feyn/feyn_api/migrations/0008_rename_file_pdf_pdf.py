# Generated by Django 4.2.5 on 2023-09-17 02:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('feyn_api', '0007_remove_pdf_filepath_pdf_file'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pdf',
            old_name='file',
            new_name='pdf',
        ),
    ]
