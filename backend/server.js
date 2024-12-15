const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3001;

const API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = 'https://api.football-data.org/v4/matches';

app.use(express.json());
app.use(cors());

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

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
