// MatchPrediction.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './MatchPrediction.css';

const fetchMatchesFromBackend = async () => {
  const response = await axios.get('http://localhost:3001/matches');
  return response.data;
};

const fetchPrediction = async (homeTeam, awayTeam) => {
  const response = await axios.post('http://localhost:3001/prediction', {
    homeTeam,
    awayTeam,
  });
  return response.data.prediction;
};

const MatchPrediction = () => {
  const [filter, setFilter] = useState('all');
  const [predictions, setPredictions] = useState({});

  const {
    data: matches,
    isLoading,
    isError,
  } = useQuery('matches', fetchMatchesFromBackend);

  const handleGetPrediction = async (homeTeam, awayTeam, matchId) => {
    try {
      const prediction = await fetchPrediction(homeTeam, awayTeam);
      setPredictions((prevPredictions) => ({
        ...prevPredictions,
        [matchId]: prediction,
      }));
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  const filteredMatches = matches?.filter((match) => {
    if (filter === 'all') return true;
    return match.status.toLowerCase() === filter;
  });

  if (isLoading) return <p>Loading matches...</p>;
  if (isError) return <p>Error fetching matches</p>;

  return (
    <div className='match-prediction'>
      <h1>Today's Matches</h1>
      <div className='filter-buttons'>
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={filter === 'finished' ? 'active' : ''}
          onClick={() => setFilter('finished')}
        >
          Finished
        </button>
        <button
          className={filter === 'in_play' ? 'active' : ''}
          onClick={() => setFilter('in_play')}
        >
          In Play
        </button>
        <button
          className={filter === 'timed' ? 'active' : ''}
          onClick={() => setFilter('timed')}
        >
          Timed
        </button>
      </div>
      {filteredMatches && filteredMatches.length > 0 ? (
        filteredMatches.map((match) => (
          <div key={match.id} className='match-card'>
            <div className='match-header'>
              <h2>{match.competition.name}</h2>
              <p>{new Date(match.utcDate).toLocaleString()}</p>
            </div>
            <div className='match-content'>
              <div className='team home'>
                <span className='team-name'>{match.homeTeam.name}</span>
                <img
                  src={match.homeTeam.crest}
                  alt={match.homeTeam.name}
                  className='team-logo'
                />
              </div>
              <div className='score-container'>
                <div className='score'>
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                </div>
                <div className='match-status'>{match.status}</div>
                <div className='prediction'>
                  Prediction: {predictions[match.id] || 'Not available'}
                </div>
                {match.status !== 'FINISHED' && (
                  <button
                    onClick={() =>
                      handleGetPrediction(
                        match.homeTeam.name,
                        match.awayTeam.name,
                        match.id
                      )
                    }
                  >
                    Get Prediction
                  </button>
                )}
              </div>
              <div className='team away'>
                <img
                  src={match.awayTeam.crest}
                  alt={match.awayTeam.name}
                  className='team-logo'
                />
                <span className='team-name'>{match.awayTeam.name}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No matches available.</p>
      )}
    </div>
  );
};

export default MatchPrediction;
