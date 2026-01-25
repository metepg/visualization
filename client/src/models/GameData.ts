export type Game = ScheduledGame | PlayedGame | LiveGame;

/* ---------- Base ---------- */

export interface GameDBResponse {
  id: number;
  api_id: number;
  season: number;
  homeTeam: string;
  awayTeam: string;
  rawJson: Game;
}

export interface GameBase {
  id: number;
  season: number;
  start: string;
  homeTeam: GameTeam;
  awayTeam: GameTeam;
  finishedType: string;
  started: boolean;
  ended: boolean;
  buyTicketsUrl?: string;
  gamblingEvent?: GamblingEvent;
  iceRink: IceRink;
  currentPeriod: number;
  provider: string;
  stale: boolean;
  serie: string;
  gameWeek: number;
}

/* ---------- Variants ---------- */

export interface ScheduledGame extends GameBase {
  started: false;
  ended: false;
}

export interface PlayedGame extends GameBase {
  started: true;
  ended: true;
  end: string;
  gameTime: number;
  cacheUpdateDate: string;
  spectators?: number;
  periods?: Period[]
  winningShotCompetitionEvents?: [],
}

export interface LiveGame extends GameBase {
  started: true;
  ended: false;
  gameTime: number;
  cacheUpdateDate: string;
  periods?: Period[];
  spectators?: number;
  winningShotCompetitionEvents?: [];
}

/* ---------- Period ---------- */

export interface Period {
  index: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  category?: 'NORMAL' | 'OVERTIME' | 'SHOOTOUT' | 'WINNING_SHOT_COMPETITION';
  startTime: number;
  endTime?: number;
}

/* ---------- Team ---------- */

export interface GameTeam {
  teamId: string;
  teamPlaceholder: string | null;
  teamName: string;
  goals: number;
  timeOut: string | null;

  goalEvents?: GoalEvent[];
  penaltyEvents?: PenaltyEvent[];
  goalKeeperEvents?: [],
  goalKeeperChanges?: [],
  expectedGoals?: number;

  powerplayInstances: number;
  powerplayGoals: number;
  shortHandedInstances: number;
  shortHandedGoals: number;
  ranking: number | null;
  gameStartDateTime: string;
  logos: Logos;
}

/* ---------- Goal ---------- */

export interface GoalEvent {
  scorerPlayerId: number;
  scorerPlayer: GamePlayer | null;
  logTime: string;
  winningGoal: boolean;
  gameTime: number;
  period: number;
  eventId: number;
  goalTypes: string[];
  assistantPlayerIds: number[];
  assistantPlayers: GamePlayer[];
  plusPlayerIds: string | null;
  minusPlayerIds: string | null;
  homeTeamScore: number;
  awayTeamScore: number;
  assistsSoFarInSeason: Record<string, number> | null;
  goalsSoFarInSeason: number;
  videoClipUrl: string | null;
  videoThumbnailUrl: string | null;
}

/* ---------- Shared ---------- */

export interface GamePlayer {
  playerId: number;
  firstName: string;
  lastName: string;
}

export interface Logos {
  darkBg: string;
  lightBg: string;
  darkBgOriginal: string | null;
  lightBgOriginal: string | null;
}

export interface IceRink {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  streetAddress: string;
  zip: string;
  city: string;
}

export interface GamblingEvent {
  homeTeamOdds: number;
  awayTeamOdds: number;
  tieOdds: number;
  url: string;
}

export type FilteredGoalEvent = GoalEvent & {
  teamName: string;
  strength: string;
  showGoal: boolean;
};

export interface Periods {
  period1: FilteredGoalEvent[];
  period2: FilteredGoalEvent[];
  period3: FilteredGoalEvent[];
  overtime: FilteredGoalEvent[];
}

/* ---------- Penalty ---------- */

export interface PenaltyEvent {
  playerId: number;
  suffererPlayerId: number;
  eventId: number;
  logTime: string;
  gameTime: number;
  period: number;
  penaltyBegintime: number;
  penaltyEndtime: number;
  penaltyFaultName: string;
  penaltyFaultType: string;
  penaltyInfo: string;
  penaltyMinutes: number;
}
