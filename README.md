# AI Football Match Prediction App

A real-time football match prediction application that uses AI to predict match outcomes. The app displays live football matches and provides AI-powered predictions for upcoming games.
You can [visit Match Prediction App](https://ai-match-prediction.vercel.app/)

## Features

- Real-time football match data
- AI-powered match predictions
- Filter matches by status (All, Finished, In Play, Timed)
- Responsive design for all devices
- Live score updates
- Team logos and match details

## Tech Stack

### Frontend

- React.js
- React Query for data fetching
- Axios for HTTP requests
- CSS for styling
- React Router for navigation

### Backend

- Node.js
- Express.js
- Google's Generative AI (Gemini 1.5)
- Football-Data.org API

## Prerequisites

Before running this project, make sure you have:

- Node.js installed (v14 or higher)
- npm or yarn package manager
- Google AI API key
- Football-Data.org API key

## Environment Variables

Create a `.env` file in the backend directory:
env
GOOGLE_API_KEY=your_google_ai_api_key
FOOTBALL_API_KEY=your_football_data_api_key
