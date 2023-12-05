from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PDF, PDFSelect, Recording
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

        # print('####')
        # print(f'{req.FILES=}')
        # print(f'{req.data=}')
        # print(f'{req.data["sessionId"]=}')
        serializer = serializer_class(data=req.data)
        if serializer.is_valid():
            # you can access the file like this from serializer
            # uploaded_file = serializer.validated_data["file"]
            serializer.save()

            # !!! eventually put this under the pdfselect api endpoint, skipping that for now

            select_serializer_class = PDFSelectSerializer
            text = pdf_to_text(req.data['file'].file.getvalue(), from_bytes=True)
            data = {
                'sessionId': req.data['sessionId'],
                'text': text
            }

            select_serializer = select_serializer_class(data=data)
            if select_serializer.is_valid():
                select_serializer.save()
                return Response(
                    serializer.data,
                    status=status.HTTP_201_CREATED
            )
        else:
            print(f'{serializer.errors=}')
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

    # mp3 = req.FILES['mp3']
    mp3 = req.data['file']
    print('####')
    print(f'{req.data=}')

    text = speech_to_text(mp3)
    print(f'{text=}')

    data = {
        'sessionId': req.data['sessionId'],
        'text': text
    }
    print(f'{data=}')

    serializer = serializer_class(data=data)
    if serializer.is_valid():
        # you can access the file like this from serializer
        # uploaded_file = serializer.validated_data["file"]
        serializer.save()
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )
    else:
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def similarity_detail(req):
    print('#### similarity')
    print(f'{req.data=}')
    print(f'{req.query_params=}')
    sessionId = req.query_params['sessionId']
    try:
        pdf_select = PDFSelect.objects.get(sessionId=sessionId)
    except PDFSelect.DoesNotExist:
        return Response('PDFs not found', status=status.HTTP_404_NOT_FOUND)

    try:
        rec = Recording.objects.get(sessionId=sessionId)
    except Recording.DoesNotExist:
        return Response('Recording not found', status=status.HTTP_404_NOT_FOUND)

    print('summarizer in')
    pdf_summary = text_summarizer(pdf_select.text)
    # !!! assumes recording is summarizing, do we need to run recording text through summarizer too?
    rec_text = rec.text

    print('similarity in')
    sim = similarity(pdf_summary, rec_text)
    # !!! do we need Similarity class? currently not saving to db
    # !!! not catching any errors
    return Response(
        sim,
        status=status.HTTP_200_OK
    )
