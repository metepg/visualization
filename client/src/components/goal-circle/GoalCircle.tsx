import React, { useRef, useState } from 'react';
import styles from './GoalCircle.module.css'
import GoalInfoDialog from "../goal-info-dialog/GoalInfoDialog.tsx";
import { FilteredGoalEvent, PlayedGame } from "../../models/GameData.ts";

interface Props {
  game?: PlayedGame;
  goalInfo?: FilteredGoalEvent;
  jerseyNumber: string | number | null;
  isSelectedTeam: boolean;
  customCircleStyles?: React.CSSProperties;
}

const GoalCircle: React.FC<Props> = ({ jerseyNumber, isSelectedTeam, customCircleStyles, goalInfo, game, }) => {
  const [showElement, setShowElement] = useState(false);

  const defaultCircleStyle: React.CSSProperties = {
    width: isSelectedTeam ? '25px' : '12.5px',
    height: isSelectedTeam ? '25px' : '12.5px',
    fontSize: 'var(--font-size-normal)',
    fontWeight: 'normal',
    backgroundColor: isSelectedTeam ? 'var(--red)' : 'var(--black)',
  };

  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleHover(event: React.MouseEvent<HTMLDivElement>, value: boolean | null): void {
    event.stopPropagation();

    if (value === null) return;

    if (!value) {
      if (hideTimeout.current) {
        clearTimeout(hideTimeout.current);
      }

      hideTimeout.current = setTimeout(() => {
        setShowElement(false);
        hideTimeout.current = null;
      }, 100);

      return;
    }

    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }

    setShowElement(true);
  }

  if (jerseyNumber === null || jerseyNumber === undefined) {
    return null;
  }

  return (
    <div
      className={styles.circle}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
      onClick={(e) => handleHover(e, null)}
      style={{
        ...(customCircleStyles ?? defaultCircleStyle),
        zIndex: showElement ? 100 : customCircleStyles?.zIndex
      }}
    >
      <span className={styles.eventText}>{isSelectedTeam ? jerseyNumber : ''}</span>
      {showElement && goalInfo && (
        <GoalInfoDialog
          game={game}
          goalInfo={goalInfo}
          isSelectedTeam={isSelectedTeam}
        />
      )}
    </div>
  );
};

export default GoalCircle;
