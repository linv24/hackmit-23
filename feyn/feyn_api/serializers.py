from rest_framework import serializers
from .models import PDF, PDFSelect

class PDFSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDF
        fields = (
            'id',
            'file',
            'filename',
            'uploaded_on'
        )

class PDFSelectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFSelect
        fields = (
            'id',
            'text'
        )