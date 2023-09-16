from django.contrib import admin
from .models import PDF, PDFSelect, Recording, Similarity

for model in [PDF, PDFSelect, Recording, Similarity]:
    admin.site.register(model)
