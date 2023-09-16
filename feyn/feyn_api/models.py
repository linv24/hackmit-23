from django.db import models

class PDF(models.Model):
    pdf_id = models.IntegerField()
    filepath = models.TextField(default='/')

    def __str__(self):
        return f'PDF {self.filepath}'

class PDFSelect(models.Model):
    pdf = models.ForeignKey(PDF, on_delete=models.CASCADE)
    # NOTE: page_nums field?
    text = models.TextField()

    def __str__(self):
        return f'PDFSel {self.pdf.pdf_id}: {" ".join(self.text.split()[:5])}...'

class Recording(models.Model):
    pdf = models.ForeignKey(PDF, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return f'Rec {self.pdf.pdf_id}: {" ".join(self.text.split()[:5])}...'

class Similarity(models.Model):
    pdf = models.ForeignKey(PDF, on_delete=models.CASCADE)
    pdf_summary = models.TextField()
    rec_summary = models.TextField()

    def __str__(self):
        return f'Sim {self.pdf.pdf_id}'
