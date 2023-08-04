import React, { useState } from 'react';
import './CSS/TeamStatistics.css'; // Import the CSS file

const TeamStatistics = ({ teamName, gamesPlayed, wins, losses, totalPoints, fetchTeamDetails }) => {
  // Calculate win/loss ratio
  const winLossRatio = wins && losses ? (wins / (wins + losses)) * 100 : 0;

  // State to hold the input value for the team name
  const [inputTeamName, setInputTeamName] = useState('');

  // Declare state variables for the fetched data
  const [generatedName, setGeneratedName] = useState('');
  const [gamesPlayedFetched, setGamesPlayed] = useState(0);
  const [winsFetched, setWins] = useState(0);
  const [lossesFetched, setLosses] = useState(0);
  const [totalPointsFetched, setTotalPoints] = useState(0);

  // Handler for the text box input change
  const handleInputChange = (event) => {
    setInputTeamName(event.target.value);
  };

  const handleFetchButtonClick = async () => {
    try {
      const response = await fetch(`teamStatistics/${inputTeamName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Update the state variables with the fetched data
        setGeneratedName(data.teamName);
        setGamesPlayed(data.gamesPlayed);
        setWins(data.wins);
        setLosses(data.losses);
        setTotalPoints(data.totalPoints);
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1 align="center">Team Management</h1>
      <div className="team-statistics">
        <h2>{teamName} Team Statistics</h2>
        <p>
          <span className="label">Games Played:</span> <span className="label-value">{gamesPlayed}</span>
        </p>
        <p>
          <span className="label">Wins:</span> <span className="label-value">{wins}</span>
        </p>
        <p>
          <span className="label">Losses:</span> <span className="label-value">{losses}</span>
        </p>
        <p>
          <span className="label">Win/Loss Ratio:</span> <span className="label-value">{winLossRatio.toFixed(2)}%</span>
        </p>
        <p>
          <span className="label">Total Points Earned:</span> <span className="label-value">{totalPoints}</span>
        </p>
        <div className="fetch-team-details">
          <input type="text" value={inputTeamName} onChange={handleInputChange} placeholder="Enter team name" />
          <button onClick={handleFetchButtonClick}>Fetch Team Details</button>
        </div>
      </div>
    </div>
  );
};

export default TeamStatistics;
