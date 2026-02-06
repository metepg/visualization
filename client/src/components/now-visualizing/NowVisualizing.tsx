import React from 'react';
import styles from './NowVisualizing.module.css';
import GoalCircle from "../goal-circle/GoalCircle.tsx";
import ToggleSwitch from "../toggle-switch/ToggleSwitch.tsx";
import { Player } from "../../models/Player.ts";
import { Filters } from "../../models/Filters.ts";

interface Props {
  filters: Filters
  players: Player[]
}

const NowVisualizing: React.FC<Props> = ({ filters, players }) => {
  const { team, season, goaltypefor, goaltypeagainst, player } = filters;
  const foundPlayer = players.find(p => p.id === player.id);
  const playerName = foundPlayer
    ? `${foundPlayer.firstName} ${foundPlayer.lastName}`
    : 'All players';

  const selectedFilters = [
    team?.name,
    playerName,
    season,
    `${goaltypefor} FOR`,
    `${goaltypeagainst} AGAINST`
  ].filter(Boolean);

  return (
    <section className={styles.wrapper}>
      <div className={styles.visualizeText}><p>NOW VISUALIZING </p></div>
      <div className={styles.selectedFilters}>
        <p>
          {selectedFilters.map((label, i) => (
            <span key={i} className={styles.selectedOptions}>
              {label}{i < selectedFilters.length - 1 ? ' > ' : ''}
            </span>
          ))}
        </p>
      </div>

      {/*INFO TEXT*/}
      <div className={styles.infoText}>
        <div className={styles.circleContainer}>
          <div className={styles.selectedTeamCircleContainer}>
            <GoalCircle jerseyNumber="X" isSelectedTeam={true} />
            <p className={styles.circleText}>Goals for (w/player number)</p>
          </div>
          <div className={styles.otherTeamCircleContainer}>
            <GoalCircle jerseyNumber="" isSelectedTeam={false} />
            <p className={styles.circleText}>Goals against</p>
          </div>
        </div>
      </div>

      {/*SELECTED VIEW (DISABLED)*/}
      <div className={styles.selectedView}>
        <div className={styles.view}>
          <p className={styles.overview}>OVERVIEW</p>
          <p className={styles.gameSpecificView}>GAME-SPECIFIC VIEW</p>
        </div>
        <div className={styles.switch}>
          <span className={styles.switchLabel}>FULL LAYOUT</span>
          <ToggleSwitch/>
          <span className={styles.switchLabel}>MINIMIZED</span>
        </div>
      </div>
    </section>
  );
};

export default NowVisualizing;
