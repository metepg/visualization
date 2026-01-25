import React from 'react';
import styles from './GameSpecific.module.css';
import Timeline from "../timeline/Timeline.tsx";
import { formatDate } from "../../utils/helpers.ts";
import Shootout from "../shootout/Shootout.tsx";
import { Periods, PlayedGame } from "../../models/GameData.ts";
import { Player } from "../../models/Player.ts";
import { Filters } from "../../models/Filters.ts";

interface Props {
  game: PlayedGame,
  goalsByPeriod: Periods,
  filters: Filters,
  playersById: Map<number, Player> | undefined
}

const GameSpecific: React.FC<Props> = ({ game, goalsByPeriod, filters, playersById }) => {

  if (!game || !goalsByPeriod) {
    return null;
  }
  const { period1, period2, period3, overtime } = goalsByPeriod;
  const homeTeamName = game.homeTeam.teamName;
  const awayTeamname = game.awayTeam.teamName;
  const homeIsSelectedTeam: boolean = filters?.team?.name === homeTeamName;
  const awayIsSelectedTeam: boolean = filters?.team?.name === awayTeamname;
  const hasShootoutGoals =
    (game.homeTeam.goalEvents?.some(g => g.goalTypes.includes('VL')) ?? false) ||
    (game.awayTeam.goalEvents?.some(g => g.goalTypes.includes('VL')) ?? false);

  return (
    <>{!open ? null : (
      <div className={styles.dialogStyles}>
        <div className={styles.dialogContentStyles}>
          <div className={styles.dialogHeaderStyles}>
            <div className={styles.matchHeader}>
              <label className={styles.label}>{formatDate(game.start)}</label>
              <h2>
                <label
                  style={{ color: homeIsSelectedTeam ? 'var(--red)' : 'var(--black)' }}>{homeTeamName}</label>
                <label style={{
                  textTransform: 'lowercase',
                  fontWeight: '400',
                  margin: '0 2px'
                }}> vs </label>
                <label
                  style={{ color: awayIsSelectedTeam ? 'var(--red)' : 'var(--black)' }}>{awayTeamname}</label>
              </h2>
            </div>
          </div>
          <div className={styles.dialogBodyStyles}>
            <div className={styles.periodWrapper}>
              <p className={styles.periodLabel}>1st period</p>
              <div className={styles.timelineWrapper}>
                <Timeline game={game} goals={period1} filters={filters} playersById={playersById}/>
              </div>
            </div>
            <div className={styles.periodWrapper}>
              <p className={styles.periodLabel}>2nd period</p>
              <div className={styles.timelineWrapper}>
                <Timeline game={game} goals={period2} filters={filters} playersById={playersById}/>
              </div>
            </div>
            <div className={styles.periodWrapper}>
              <p className={styles.periodLabel}>3rd period</p>
              <div className={styles.timelineWrapper}>
                <Timeline game={game} goals={period3} filters={filters} playersById={playersById}/>
              </div>
            </div>
            <div className={`${styles.periodWrapper} ${styles.overtimeWrapper}`}>
              <p className={styles.periodLabel}>Overtime</p>
              <div className={styles.timelineWrapper}>
                <Timeline game={game} goals={overtime} filters={filters} playersById={playersById}/>
              </div>
            </div>
            {hasShootoutGoals ? (
              <div className={`${styles.periodWrapper} ${styles.overtimeWrapper}`}>
                <p className={styles.periodLabel}>Shootout</p>
                <div style={{ display: 'flex', justifyContent: 'start' }}>
                  <Shootout showAll={true} game={game} filters={filters}/>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default GameSpecific;
