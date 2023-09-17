from django.db import models
from django import forms


# class PDF(models.Model):
#     # filepath = models.TextField(default='/')
#     pdf = models.FileField()

#     def __str__(self):
#         return f'PDF {"test"}'

# class PDFForm(forms.ModelForm):
#     class Meta:
#         model = PDF
#         fields = '__all__'

class PDF(models.Model):
    file = models.FileField(upload_to='../uploads/')
    uploaded_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.uploaded_on.time

class PDFSelect(models.Model):
    pdf = models.ForeignKey(PDF, on_delete=models.CASCADE)
    # NOTE: page_nums field?
    text = models.TextField()

    def __str__(self):
        return f'PDFSel {self.pdf.pk}: {" ".join(self.text.split()[:5])}...'

class Recording(models.Model):
    pdf = models.ForeignKey(PDF, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return f'Rec {self.pdf.pk}: {" ".join(self.text.split()[:5])}...'

class Similarity(models.Model):
    pdf = models.ForeignKey(PDF, on_delete=models.CASCADE)
    pdf_summary = models.TextField()
    rec_summary = models.TextField()

    def __str__(self):
        return f'Sim {self.pdf.pk}'
