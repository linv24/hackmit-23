# HackMIT 2023: Refeyn

## Development

### Frontend (React)

1. `cd feyn/react; npm i` to install necessary JS packages.

2. `npm start` to start local development server. Changes will be reflected here but NOT in the Django server.

3. `npm run build` to create build directory suitable for Django rendering.

### Backend (Django)

1. In project root directory, `pip install -r requirements.txt` to install necessary Python packages.

2. `cd feyn; python manage.py makemigrations; python manage.py migrate` to populate MySQL database with schema.

3. `python manage.py runserver` to start Django server. This provides a functioning API/database, along with the most recent build of React frontend.

## Running AI Util in Terminal

For demonstration purposes, the AI utilies may be run through the command line:

1. Upload your files: You must have a PDF of notes and a voice recording MP3 file prepared for run the whole pipeline. See examples at `dev/content/pdf_handwritten_final_highlighted.pdf` and `dev/content/demo_recording.mp3`. Copy your files into the `dev/content/` folder

2. Update filepaths in AI util file: All functions for running AI tools used in Refeyn can be found at `feyn/feyn_api/util.py`. At the bottom of the file, replace the file names of your PDF and MP3 file for each respective variable (`pdf_filepath`, `recording_filepath`).

3. Run `util.py`: To run the pipeline, simply run `util.py` in the terminal: `python3 util.py`. This will run through the PDF transcription, the recording speech recoginition, a text summarizer for the PDF notes, and the similarity generation.