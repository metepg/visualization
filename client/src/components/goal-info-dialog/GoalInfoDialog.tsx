import React from 'react';
import styles from './GoalInfoDialog.module.css';
import { formatPlayerAssists, getTeamNameShort, goalTypeLong } from "../../utils/helpers.ts";
import { FilteredGoalEvent, PlayedGame } from "../../models/GameData.ts";

interface Props {
  game?: PlayedGame;
  goalInfo?: FilteredGoalEvent;
  isSelectedTeam: boolean;
}

const getTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

const getPeriod = (period: number) =>
  ({ 1: '1st period', 2: '2nd period', 3: '3rd period' }[period] ?? 'Overtime');

const TeamScore = ({ label, score, isScorer }: { label: string, score: number, isScorer: boolean }) => (
  <label data-scoring-team={isScorer}>
    {getTeamNameShort(label)} {score}
  </label>
);

const GoalInfoDialog: React.FC<Props> = ({ goalInfo, game, isSelectedTeam }) => {
  if (!goalInfo || !game) {
    return null;
  }

  const { homeTeam, awayTeam } = game;
  const {
    assistantPlayers, assistsSoFarInSeason, awayTeamScore, gameTime,
    homeTeamScore, period, scorerPlayer, strength,
    teamName, videoClipUrl, winningGoal
  } = goalInfo;

  // GW = Game Winning goal
  const goalType = goalTypeLong(winningGoal ? "GW" : strength);
  const goalTime = `${getTime(gameTime)} | ${getPeriod(period)}`;

  const scorerName = scorerPlayer
    ? `${scorerPlayer.firstName} ${scorerPlayer.lastName}(${goalInfo.goalsSoFarInSeason})`
    : 'Unknown';

  const assistNames = formatPlayerAssists(assistantPlayers, assistsSoFarInSeason);

  return (
    <div className={styles.overlay}>
      <div className={styles.goalTypeWrapper}>
        <div className={styles.scoreInfo} data-is-selected-team={isSelectedTeam}>
          <p>
            <TeamScore
              label={homeTeam.teamId}
              score={homeTeamScore}
              isScorer={teamName === homeTeam.teamName}
            />
            &nbsp;-&nbsp;
            <TeamScore
              label={awayTeam.teamId}
              score={awayTeamScore}
              isScorer={teamName === awayTeam.teamName}
            />
          </p>
        </div>
        <div className={styles.goalTypeInfo}>
          <p>{goalType}</p>
        </div>
      </div>

      <div className={styles.goalInfoWrapper}>
        <div className={styles.goalInfoTextWrapper}>
          <p>{`GOAL: ${scorerName}`}</p>
          <p>{`Assists: ${assistNames}`}</p>
        </div>
      </div>

      <div className={styles.timeLineWrapper}>
        <p>{goalTime}</p>
        {videoClipUrl && (
          <a
            href={videoClipUrl}
            className={styles.playButton}
            target="_blank"
            rel="noreferrer"
            aria-label="Play video"
          />
        )}
      </div>
      <div className={styles.arrow} aria-hidden="true"></div>
    </div>
  );
};

export default GoalInfoDialog;
