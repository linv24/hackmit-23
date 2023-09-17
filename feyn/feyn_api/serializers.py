from rest_framework import serializers
from .models import PDF, PDFSelect, Recording

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

class RecordingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recording
        fields = (
            'id',
            'text'
        )