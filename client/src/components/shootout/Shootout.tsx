import React from 'react';
import styles from './Shootout.module.css'
import { PlayedGame } from "../../models/GameData.ts";
import { Filters } from "../../models/Filters.ts";

interface Props {
  game: PlayedGame;
  filters: Filters;
  showAll: boolean;
}

const Shootout: React.FC<Props> = ({ game, filters, showAll }) => {
  const selectedTeamName = filters.team?.name;
  const homeShootoutGoals = game.homeTeam.goalEvents?.filter(g => g.goalTypes.includes('VL')) ?? [];
  const awayShootoutGoals = game.awayTeam.goalEvents?.filter(g => g.goalTypes.includes('VL')) ?? [];
  const hasShootout = homeShootoutGoals.length > 0 || awayShootoutGoals.length > 0;

  if (!hasShootout) {
    return null;
  }

  const homeTeamName = game.homeTeam.teamName;
  const awayTeamName = game.awayTeam.teamName;

  const homeWins = homeShootoutGoals.length > awayShootoutGoals.length;
  const awayWins = awayShootoutGoals.length > homeShootoutGoals.length;

  const selectedTeamIsWinner =
    (selectedTeamName === homeTeamName && homeWins) ||
    (selectedTeamName === awayTeamName && awayWins);

  const shootoutStyles = {
    backgroundColor: selectedTeamIsWinner
      ? 'var(--red)'
      : 'var(--black)',
    border: '1px solid var(--light-grey)',
  };

  if (!showAll) {
    return (
      <div className={styles.container}>
        <div className={styles.circle} style={shootoutStyles}></div>
      </div>
    );
  }

  const winnerName = homeWins ? homeTeamName : awayTeamName;

  return (
    <div>
      <span>{winnerName} wins </span>
      <span>{Math.max(homeShootoutGoals.length, awayShootoutGoals.length)}</span>
      -
      <span>{Math.min(homeShootoutGoals.length, awayShootoutGoals.length)}</span>
    </div>
  );
};

export default Shootout;
