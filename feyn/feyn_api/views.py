from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PDF
from .serializers import PDFSerializer
from .util import *

from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.views import APIView

class FileUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = PDFSerializer

    def post(self, request, *args, **kwargs):
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



@api_view(['POST'])
def pdf_add(req):
    # ser = PDFSerializer(data=req.data)
    # if ser.is_valid():
    #     ser.save()
    #     return Response(ser.data, status=status.HTTP_201_CREATED)

    form = PDFForm(req.POST, req.FILES)
    print('####')
    print(form)
    if form.is_valid():
        form.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def pdfselect_add(req):
    pass

@api_view(['POST'])
def recording_add(req):
    pass

@api_view(['GET'])
def similarity_detail(req):
    pass
