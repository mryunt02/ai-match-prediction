// src/components/MatchPrediction.js
import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchMatchesFromBackend = async () => {
  const response = await axios.get('http://localhost:3001/matches'); // Fetch matches from the backend
  return response.data; // Return matches data
};

const MatchPrediction = () => {
  const {
    data: matches,
    isLoading,
    isError,
  } = useQuery('matches', fetchMatchesFromBackend);

  if (isLoading) return <p>Loading matches...</p>;
  if (isError) return <p>Error fetching matches</p>;

  return (
    <div>
      <h1>Today's Matches</h1>
      {matches && matches.length > 0 ? (
        matches.map((match, index) => (
          <div key={index}>
            <p>{`${match.homeTeam.name} vs ${match.awayTeam.name}`}</p>
          </div>
        ))
      ) : (
        <p>No matches available.</p>
      )}
    </div>
  );
};

export default MatchPrediction;
