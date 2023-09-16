from transformers import pipeline
import assemblyai as aai
# from pypdf import PdfReader
from google.cloud import vision
import requests
import json
import time

def pdf_to_text(pdf_path):
    # reader = PdfReader(pdf_fp)
    # p1 = reader.pages[0]
    # return p1.extract_text()
    client = vision.ImageAnnotatorClient()

    with open(pdf_path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)
    response = client.document_text_detection(image=image)

    for ix, page in enumerate(response.full_text_annotation.pages):
        print(f'Page {ix}:')
        for block in page.blocks:
            for paragraph in block.paragraphs:
                words = [''.join(symbol.text for symbol in word.symbols) for word in paragraph.words]
                print(' '.join(word for word in words))

    if response.error.message:
        raise Exception(response.error.message)


def text_summarizer(text, file=False):
    if file:
        with open(text, 'r') as f:
            text = f.read()

    summarizer = pipeline('summarization', model='facebook/bart-base', framework='pt')
    return summarizer(text)

def speech_to_text():
    audio_filepath = './content/audio_itec_short.mp3'
    api_key = 'dbcec334212b4fad80daf478d5339205'
    base_url = "https://api.assemblyai.com/v2"

    headers = {
        "authorization": "dbcec334212b4fad80daf478d5339205"
    }

    with open(audio_filepath, 'rb') as f:
        res = requests.post(base_url + '/upload',
                            headers=headers,
                            data=f)

    upload_url = res.json()['upload_url']

    data = {
        'audio_url': upload_url
    }

    res = requests.post(base_url + '/transcript',
                        json=data,
                        headers=headers)

    transcript_id = res.json()['id']
    polling_endpoint = f'https://api.assemblyai.com/v2/transcript/{transcript_id}'
    while True:
        transcription_result = requests.get(polling_endpoint, headers=headers).json()

        if transcription_result['status'] == 'completed':
            print(transcription_result['text'])
            break

        elif transcription_result['status'] == 'error':
            raise RuntimeError(f"Transcription failed: {transcription_result['error']}")

        else:
            time.sleep(3)




if __name__ == '__main__':
    start = time.time()

    pdf = './content/pdf_handwriting.jpg'
    pdf_text = pdf_to_text(pdf)

    # print(text_summarizer(pdf_text))
    # text_to_speech()
    # speech_to_text()

    print('Elapsed time:', time.time() - start)