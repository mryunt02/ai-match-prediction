// server.js (Backend)
const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = 3001;

const API_KEY = process.env.FOOTBALL_API_KEY; // Your football data API key
const BASE_URL = 'https://api.football-data.org/v4/matches'; // Football Data API URL

// Middleware to handle JSON requests
app.use(express.json());

// API endpoint to fetch football matches
app.get('/matches', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });
    const matches = response.data.matches; // Extract matches data from the response
    res.json(matches); // Send matches data to frontend
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch football data' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
