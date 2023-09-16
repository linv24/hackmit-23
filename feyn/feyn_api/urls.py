from django.urls import path
from feyn_api import views

urlpatterns = [
    path('pdf/', views.pdf_list),
    path('pdf/<int:pdf_id>/', views.pdf_detail),
    path('pdf/add/', views.pdf_add),
    path('pdfselect/add/', views.pdfselect_add),
    path('recording/add/', views.recording_add),
    path('similarity/<int:pdf_id>', views.similarity_detail)
]
