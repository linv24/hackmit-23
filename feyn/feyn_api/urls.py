from django.urls import path
from feyn_api import views

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('pdf/', views.pdf),
    path('pdf/<int:pdf_id>/', views.pdf_detail),
    path('pdfselect/', views.pdfselect_add),
    path('recording/', views.recording_add),
    path('similarity/', views.similarity_detail)
]
