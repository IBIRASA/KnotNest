# KnotNest

## Project Description

KnotNest is a web application built with Django (backend) and React (frontend) to help people plan their marriage venue based on their budget and location.

## Features

- Venue search based on budget and location
- User authentication
- Responsive UI
-

### Backend Setup

1. Create and activate a Python virtual environment:

   ```bash
   python3 -m venv env
   source env/bin/activate
   ```

2. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run database migrations:
   ```bash
   python manage.py migrate
   ```
4. Start backend server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to frontend folder:

   ```bash
   cd vow-venue-frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start frontend server:
   ```bash
   npm start
   ```

### Running Tests

1. Backend tests:
   ```bash
   python manage.py test
   ```
   2.Frontend lint:
   ```bash
   npx eslint src
   ```
