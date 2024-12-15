import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import './MatchPrediction.css'; // Import CSS file for styling

const fetchMatchesFromBackend = async () => {
  const response = await axios.get('http://localhost:3001/matches'); // Fetch matches from the backend
  return response.data; // Return matches data
};

const MatchPrediction = () => {
  const [filter, setFilter] = useState('all');
  const {
    data: matches,
    isLoading,
    isError,
  } = useQuery('matches', fetchMatchesFromBackend);

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
        filteredMatches.map((match, index) => (
          <div key={index} className='match-card'>
            <h2>{match.competition.name}</h2>
            <p>{new Date(match.utcDate).toLocaleString()}</p>
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
