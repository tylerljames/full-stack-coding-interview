# Clever's Fullstack Coding Interview

👋 Hello!, Hola!, Witam!

Thank you for taking the time to interview with Clever. This coding challenge is meant to be an exercise to see how you code throughout the stack. We don't want this to take too much of your time (and if does, certainly let us know!).

### Requirements

- Create a small web app to display photos and details about the photos.
- For the back end, we primarily use Django and Ruby on Rails, but you're welcome to use whatever Python or Ruby framework you're most familiar with.
- For the front end, although we'd like to see a small react app that interfaces with an API from the backend, if this ends up taking too much time, we are open to other options.
- However, please use either `npm` or `yarn` for any front end package management.

#### Product requirements

- Make the "Sign in" page functional.
- Make "All photos" require authentication to access.
- Only need to show 10 photos on the "All photos" page. Paging is not required.
- The authenticated user should be able to like a photo and have that like persisted to the database.
- If pages are mobile responsive, thats a plus!

### Details

- We've provided a CSV with each row representing a photo & it's details. We'd like these to be the photos (and their details) we show on the front end of the app.
- We want to keep this an open ended challenge, so take a look at the attached Figma mocks and add data models to the back end as you see fit. Use the attached CSV for the data.
- Mocks for these pages are provided in [Figma](https://www.figma.com/file/wr1seCuhlRtoFGuz1iWgyF/Frontend-Coding-Mocks?type=design&node-id=0%3A1&mode=design&t=Uw1av3TypDUDcLAd-1). If you have any issues accessing, or aren't familiar with how to use Figma, just let us know.
- There is also a logo and an icon provided (SVGs) included in this repo.

### Final Thoughts

- You can fork this repo and commit your code there. Please open a PR from the fork _back_ to the main repo, and once done, please add the following users as members so we can review:
  - James Crain (@imjamescrain)
  - Jimmy Lien (@jlien)
  - Nick Clucas (@nickcluc)
  - Ryan McCue (@rymccue)
- If you do find yourself spending too much time on the exercise itself, let us know what next steps you would take in a README file.
- We'll circle back with you and review 1:1.

**Any questions**, just let us know. Send emails to <a href="mailto:nick.clucas@movewithclever.com">nick.clucas@movewithclever.com</a>. Good luck!

--

# Tyler's Implementation

## Setup & Running the App

### Backend & Database Setup

1. Navigate to backend directory:

```bash
cd backend
python -m venv venv
source venv/bin/active
pip install -r requirements.txt
cd app
fastapi dev main.py # or uvicorn app.main:app --reload
```

2. Database and sample photos are automatically created on first run of the BE dev server

3. Navigate to the frontend directory:

```bash
cd frontend
npm install
npm run dev
```

### First Time Usage

1. **Create an account:** Use the [swagger page auth signup endpoint](http://localhost:8000/docs#/authentication/create_user_auth_signup_post)

2. Use your credentials to login to the application FE

### Architecture

- **Backend**: FastAPI + SQLAlchemy + SQLite
- **Database**: SQLite with auto-generated tables & CSV data loading
- **Frontend**: React + React Router + Tailwindcss
- **Authentication**: JWT tokens

### Tech Stack

- FastAPI
- SQLAlchemy
- Pandas (CSV loading)
- pyjwt
- passlib
- SQLite
- React
- React Router
- Tailwindcss

### Features Implemented

- User registration (via swagger) and JWT authentication
- Protected photo gallery (frontend routes and backend API endpoints require authentication)
- All photo related API calls validate tokens server side
- Like/unlike photos with database persistence
- Responsive design
- Image modal for full-size photo view
- External linking to pexels profile
- Auto-logout (expired tokens redirect users to login)

### Improvements Outside Of Scope

**_For a production application or to improve this project the following would / could be implemented:_**

- Managed authentication service (AWS Cognito, Auth0) instead of custom JWT implementation
- Environment variables for JWT secret key (hardcoded for demo)
- Form validation / sanitization
- Unit testing / e2e and integration testing
- HTTPS
- Rate limiting on endpoints
- PostgreSQL or some production level db
- CI/CD pipeline with automated testing
- Error logging and monitoring (Cloudwatch / Sentry ect.)
- Email verification for registration
- Password reset functionality
- Better form validation / schemas ect.
- Probably break components down more granularly, more reusable components, layouts, ect.
