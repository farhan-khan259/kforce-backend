# Functional Athletic Email Server

Email server for sending free training program links to users.

## Features

- Send training program emails with HTML templates
- CORS enabled for frontend integration
- Health check endpoint
- Error handling and logging

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env` file from `.env.example`
4. Configure your email credentials
5. Run: `npm start` (production) or `npm run dev` (development)

## API Endpoints

- `GET /health` - Health check
- `POST /send-exercises` - Send training program email

## Deployment

Deploy to Render.com with the provided configuration.
