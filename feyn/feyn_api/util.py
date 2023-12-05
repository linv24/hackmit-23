from dotenv import load_dotenv
from google.cloud import vision
import io
import openai
import os
from pdf2image import convert_from_path, convert_from_bytes
import requests
import time

load_dotenv()


def pdf_to_text(pdf, page_ixs=None, from_bytes=False):
    # convert pdf to jpgs
    if from_bytes:
        images = convert_from_bytes(pdf)
    else:
        images = convert_from_path(pdf)

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

    client = openai.OpenAI()
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

    client = openai.OpenAI()
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


if __name__ == '__main__':
    start = time.time()

    content_dir = '../../dev/content/'

    # 1. transcribe pdf
    ### INSERT PDF FILEPATH HERE ###
    pdf_filepath = content_dir + 'pdf_handwritten_final_highlighted.pdf'
    pdf_text = pdf_to_text(pdf_filepath)

    # 2. transcribe recording
    ### INSERT MP3 FILEPATH HERE ###
    recording_filepath = content_dir + 'demo_recording.mp3'
    with open(recording_filepath, 'rb') as mp3:
        recording_text = speech_to_text(mp3)

    # 3. summarize necessary texts
    summarized_pdf_text = text_summarizer(pdf_text)

    print(f'{summarized_pdf_text=}')
    print()
    print(f'{recording_text=}')
    print()

    # 4. generate similarity score/feedback
    sim = similarity(summarized_pdf_text, recording_text)
    print(f'{sim=}')

    print('Elapsed time:', time.time() - start)