import React from 'react';
import styles from './Timeline.module.css'
import { getCirclePosition } from "../../utils/helpers.ts";
import GoalCircle from "../goal-circle/GoalCircle.tsx";
import { FilteredGoalEvent, PlayedGame } from "../../models/GameData.ts";
import { Player } from "../../models/Player.ts";
import { Filters } from "../../models/Filters.ts";

interface Props {
  goals: FilteredGoalEvent[],
  filters: Filters,
  game: PlayedGame,
  selectedRowDate?: boolean,
  isHoveredRow?: boolean,
  playersById: Map<number, Player> | undefined
}

const Timeline: React.FC<Props> = ({ goals, filters, game, selectedRowDate, isHoveredRow, playersById }) => {
  const isRowSelected = selectedRowDate;

  const goalEvents = goals.map((goal, index) => {
    const isOvertime = goal.period > 3;
    const periodInMinutes = isOvertime ? 5 : 20;

    const isSelectedTeam = goal.teamName === filters.team?.name;
    const showGoal = goal.showGoal ?? false;

    const scorerJersey = playersById && goal.scorerPlayer
      ? playersById?.get(goal?.scorerPlayer.playerId)?.jersey ?? 0
      : 0;

    const periodSeconds = periodInMinutes * 60;
    const regulationSeconds = 3 * 20 * 60;

    const periodStartSeconds = goal.period <= 3
      ? (goal.period - 1) * 20 * 60
      : regulationSeconds;

    const secondsIntoPeriod = Math.max(0, Math.min(goal.gameTime - periodStartSeconds, periodSeconds));
    const circleStyle: React.CSSProperties = {
      left: getCirclePosition(periodInMinutes, secondsIntoPeriod),
      width: isSelectedTeam ? '25px' : '12.5px',
      height: isSelectedTeam ? '25px' : '12.5px',
      position: 'absolute',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      justifyContent: 'center',
      alignItems: 'center',
      border: '1px solid var(--white)',
      zIndex: isSelectedTeam
        ? showGoal
          ? 4
          : 3
        : 2,
      fontSize: 'var(--font-size-small)',
      fontWeight: 'normal',
      backgroundColor: isSelectedTeam
        ? showGoal
          ? 'var(--red)'
          : 'var(--filtered-selected-team)'
        : showGoal
          ? 'var(--black)'
          : 'var(--filtered-other-team)',
    };

    return (
      <GoalCircle
        key={index}
        customCircleStyles={circleStyle}
        game={game}
        goalInfo={goal}
        isSelectedTeam={isSelectedTeam}
        jerseyNumber={scorerJersey}
      />
    );
  });

  return (
    <div className={styles.wrapper}>
      {goalEvents}
      <div className={`${styles.timelineLine} ${isRowSelected || isHoveredRow ? styles.timelineActive : ''}`}/>
    </div>
  );
};

export default Timeline;
