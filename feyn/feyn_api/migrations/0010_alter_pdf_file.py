# Generated by Django 4.2.5 on 2023-09-17 02:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('feyn_api', '0009_rename_pdf_pdf_file_pdf_uploaded_on'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pdf',
            name='file',
            field=models.FileField(upload_to='../uploads/'),
        ),
    ]
