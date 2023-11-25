from transformers import pipeline
import assemblyai as aai
# from pypdf import PdfReader
from google.cloud import vision
import requests
import json
import time
import openai
from openai import OpenAI
from pdf2image import convert_from_path
import io
import os
from dotenv import load_dotenv

load_dotenv()

def pdf_to_text(pdf_path, page_ixs=None):
    # convert pdf to jpgs
    images = convert_from_path(pdf_path)

    # get pdf transcript
    client = vision.ImageAnnotatorClient()

    ret_text = ''

    for img in images:
        in_mem_file = io.BytesIO()
        img.save(in_mem_file, format='jpeg')
        in_mem_file.seek(0)
        image = vision.Image(content=in_mem_file.getvalue())
        response = client.document_text_detection(image=image)

        for ix, page in enumerate(response.full_text_annotation.pages):
            for block in page.blocks:
                for paragraph in block.paragraphs:
                    words = [''.join(symbol.text for symbol in word.symbols) for word in paragraph.words]
                    ret_text += ' '.join(word for word in words)

        if response.error.message:
            raise Exception(response.error.message)

    return ret_text


def speech_to_text(mp3):
    AAI_API_KEY = os.getenv('AAI_API_KEY')
    base_url = "https://api.assemblyai.com/v2"

    headers = {
        "authorization": AAI_API_KEY
    }

    # get upload_url
    res = requests.post(base_url + '/upload',
                        headers=headers,
                        data=mp3)

    # get transcript
    res = requests.post(base_url + '/transcript',
                        json={'audio_url': res.json()['upload_url']},
                        headers=headers)

    transcript_id = res.json()['id']
    polling_endpoint = f'https://api.assemblyai.com/v2/transcript/{transcript_id}'
    while True:
        transcription_result = requests.get(polling_endpoint, headers=headers).json()

        if transcription_result['status'] == 'completed':
            return transcription_result['text']

        elif transcription_result['status'] == 'error':
            raise RuntimeError(f"Transcription failed: {transcription_result['error']}")

        else:
            time.sleep(3)


def text_summarizer(text):
    openai.api_key = os.getenv('OPENAI_API_KEY')

    client = OpenAI()

    res = client.chat.completions.create(
        model = 'gpt-3.5-turbo',
        temperature = 0.2,
        messages = [
            {
                'role': 'user',
                'content': f'summarize this text: {text}'

             }
        ]
    )

    # return res['choices'][0]['message']['content']
    return res.choices[0].message.content


def similarity(pdf_text, recording_text):
    # Inspiration for prompt engineering: https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-openai-api

    openai.api_key = os.getenv('OPENAI_API_KEY')

    prompt = f'''
    For the two texts mentioned below, calculate their cosine similarity score and the semantic
    differences between the texts in bullet points. Refer to the first text as "the PDF"
    and the second text as "the recording".

    Desired format:
    Score: <similarity_score>
    - <differences>

    Text: """
    {pdf_text}

    {recording_text}
    """
    '''

    client = OpenAI()

    res = client.chat.completions.create(
        model = 'gpt-3.5-turbo',
        temperature = 0.0,
        messages = [
            {
                'role': 'user',
                'content': prompt
             }
        ]
    )

    return res.choices[0].message.content

def test_pipeline(pdf, recording_path):
    start = time.time()

    # transcribe pdf
    pdf = './content/pdf_text.pdf'
    pdf_text = pdf_to_text(pdf)

    # transcribe recording
    # recording_path = './content/voice_text.mp3'
    recording_path = './content/voice_text_short.mp3'
    with open(recording_path, 'rb') as mp3:
        recording_text = speech_to_text(mp3)

    # summarize necessary texts
    pdf_text = text_summarizer(pdf_text)

    print(pdf_text)
    print()
    print(recording_text)
    print()

    sim = similarity(pdf_text, recording_text)
    print(sim)

    print('Elapsed time:', time.time() - start)


if __name__ == '__main__':
    # test_pipeline(pdf='./content/pdf_text.pdf', recording_path='./content/voice_text_short.mp3')

    demo_pdf = './content/pdf_handwritten_final_highlighted.pdf'
    demo_pdf_text = './content/pdf_handwritten_final_highlighted.txt'
    demo_recording = './content/demo_recording.mp3'
    demo_recording_text = './content/demo_recording.txt'

    # with open(demo_recording, 'rb') as mp3:
    #     recording_text = speech_to_text(mp3)
    #     with open('./content/demo_recording.txt', 'w') as f:
    #         f.write(recording_text)

    # summarize necessary texts
    with open(demo_pdf_text, 'r') as f:
        pdf_text = text_summarizer(f.read())

    print(pdf_text)
    print()

    with open(demo_recording_text, 'r') as f:
        sim = similarity(pdf_text, f.read())
    print(sim)

