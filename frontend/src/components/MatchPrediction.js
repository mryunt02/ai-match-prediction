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
      <div className='matches-container'>
        {filteredMatches && filteredMatches.length > 0 ? (
          filteredMatches.map((match, index) => (
            <div key={index} className='match-card'>
              <p>{match.competition.name}</p>
              <div className='match-info'>
                <h2>{match.homeTeam.name}</h2>
                <img
                  src={match.homeTeam.crest}
                  alt={match.homeTeam.name}
                  width={90}
                  height={90}
                />
                <div className='match-header'>
                  <p>{new Date(match.utcDate).toLocaleString()}</p>
                  {match.score.fullTime.home} - {match.score.fullTime.away}
                  <p>FT</p>
                </div>

                <img
                  src={match.awayTeam.crest}
                  alt={match.awayTeam.name}
                  width={90}
                  height={90}
                />
                <h2>{match.awayTeam.name}</h2>
              </div>
              <div className='teams'>
                <div className='team home'>
                  <img
                    src={match.homeTeam.crest}
                    alt={match.homeTeam.name}
                    className='team-crest'
                  />
                  <span>{match.homeTeam.name}</span>
                </div>
                <div className='score'>
                  <p>{`Half Time: ${match.score.halfTime.home} - ${match.score.halfTime.away}`}</p>
                </div>
                <div className='team away'>
                  <img
                    src={match.awayTeam.crest}
                    alt={match.awayTeam.name}
                    className='team-crest'
                  />
                  <span>{match.awayTeam.name}</span>
                </div>
              </div>
              <div className='match-footer'>
                <p>{`Location: ${match.area.name}`}</p>
                <img
                  src={match.area.flag}
                  alt={`${match.area.name} flag`}
                  className='flag'
                />
              </div>
            </div>
          ))
        ) : (
          <p>No matches available.</p>
        )}
      </div>
    </div>
  );
};

export default MatchPrediction;
