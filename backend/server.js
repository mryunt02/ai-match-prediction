// server.js (Backend)
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');
const { getMatchPrediction } = require('./aiPrediction');

dotenv.config();

const app = express();
const port = 3001;

const API_KEY = process.env.FOOTBALL_API_KEY; // Your football data API key
const BASE_URL = 'https://api.football-data.org/v4/matches'; // Football Data API URL

app.use(cors());
app.use(express.json());

app.get('/matches', async (req, res) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        'X-Auth-Token': API_KEY,
      },
    });
    const matches = response.data.matches;
    res.json(matches);
  } catch (error) {
    console.error('Error fetching matches:', error);
    res.status(500).json({ error: 'Failed to fetch football data' });
  }
});

app.post('/prediction', async (req, res) => {
  const { homeTeam, awayTeam } = req.body;
  try {
    const prediction = await getMatchPrediction(homeTeam, awayTeam);
    res.json({ prediction });
  } catch (error) {
    console.error('Error generating AI prediction:', error);
    res.status(500).json({ error: 'Failed to generate AI prediction' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
