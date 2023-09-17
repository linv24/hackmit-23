# HackMIT 2023

## Development

### Frontend (React)

1. `cd feyn/react; npm i` to install necessary JS packages.

2. `npm start` to start local development server. Changes will be reflected here but NOT in the Django server.

3. `npm run build` to create build directory suitable for Django rendering.

### Backend (Django)

1. In project root directory, `pip install -r requirements.txt` to install necessary Python packages.

2. `cd feyn; python manage.py makemigrations; python manage.py migrate` to populate MySQL database with schema.

3. `python manage.py runserver` to start Django server. This provides a functioning API/database, along with the most recent build of React frontend.
