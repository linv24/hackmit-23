from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PDF
from .serializers import PDFSerializer, PDFSelectSerializer, RecordingSerializer
from .util import *

from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

class FileUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = PDFSerializer

    def post(self, request, *args, **kwargs):
        request.data['filename'] = request.FILES['file'].name
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request, filename):
        pdf = get_object_or_404(PDF, filename=filename)
        ser = PDFSerializer(pdf)
        return Response(ser.data)

@api_view(['GET', 'POST'])
def pdf_list(req):
    if req.method == 'GET':
        pdf = PDF.objects.all()
        serializer = PDFSerializer(pdf, many=True)
        return Response(serializer.data)

    elif req.method == 'POST':
        serializer = PDFSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET', 'PUT', 'DELETE'])
def pdf_detail(req, pdf_id):
    try:
        pdf = PDF.objects.get(pk=pdf_id)
    except PDF.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if req.method == 'GET':
        serializer = PDFSerializer(pdf)
        return Response(serializer.data)

    elif req.method == 'PUT':
        serializer = PDFSerializer(pdf, data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif req.method == 'DELETE':
        pdf.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



@api_view(['GET', 'POST'])
def pdf(req):
    if req.method == 'GET':
        try:
            pdf = PDF.objects.filter(filename=req.data['filename'])[0]
            return Response(pdf.file)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    elif req.method == 'POST':
        serializer_class = PDFSerializer

        print('####')
        print(req.FILES)
        req.data['filename'] = req.FILES['pdf'].name
        serializer = serializer_class(data=req.data)
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['POST'])
def pdfselect_add(req):
    try:
        pdf = PDF.objects.filter(filename=req.data['filename'])[0]
        page_ixs = req.data['page_ixs']
        upload_dir = './uploads/'
        text = pdf_to_text(upload_dir + pdf.filename, page_ixs)
        ser = PDFSelectSerializer(data={'pdf': pdf, 'text': text})
        if ser.is_valid():
            print('presave')
            ser.save()
            return Response(status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response(e, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def recording_add(req):
    serializer_class = RecordingSerializer

    mp3 = req.FILES['mp3']
    print('###')
    print(mp3)

    serializer = serializer_class(data=req.data)
    if serializer.is_valid():
        # you can access the file like this from serializer
        # uploaded_file = serializer.validated_data["file"]
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(['GET'])
def similarity_detail(req):
    pass
