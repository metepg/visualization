import { FilteredGoalEvent, GoalEvent } from "../../../models/GameData.ts";
import { Filters } from "../../../models/Filters.ts";
import { Handedness, Player, PlayerRole } from "../../../models/Player.ts";

export const MOCK_BASE_GOAL: GoalEvent = {
  scorerPlayerId: 1,
  scorerPlayer: null,
  logTime: '10:00',
  winningGoal: false,
  gameTime: 600,
  period: 1,
  eventId: 1,
  goalTypes: ['EV'],
  assistantPlayerIds: [],
  assistantPlayers: [],
  plusPlayerIds: null,
  minusPlayerIds: null,
  homeTeamScore: 1,
  awayTeamScore: 0,
  assistsSoFarInSeason: null,
  goalsSoFarInSeason: 1,
  videoClipUrl: null,
  videoThumbnailUrl: null,
};

export const MOCK_FILTERED_GOAL = (period: number): FilteredGoalEvent => ({
  scorerPlayerId: 1,
  scorerPlayer: null,
  logTime: '10:00',
  winningGoal: false,
  gameTime: 600,
  period,
  eventId: 1,
  goalTypes: ['EV'],
  assistantPlayerIds: [],
  assistantPlayers: [],
  plusPlayerIds: null,
  minusPlayerIds: null,
  homeTeamScore: 1,
  awayTeamScore: 0,
  assistsSoFarInSeason: null,
  goalsSoFarInSeason: 1,
  videoClipUrl: null,
  videoThumbnailUrl: null,
  teamName: 'Team A',
  strength: 'EV',
  showGoal: true,
});

export const MOCK_GOAL = (period: number, scorerId = 1): GoalEvent => ({
  ...MOCK_BASE_GOAL,
  period,
  scorerPlayerId: scorerId,
});

export const MOCK_PLAYER: Player = {
  id: 999,
  teamId: 'TMA',
  teamName: 'Team A',
  countryOfBirth: '',
  placeOfBirth: '',
  dateOfBirth: '1990-01-01',
  nationality: '',
  firstName: '',
  lastName: '',
  role: 'PLAYER' as PlayerRole,
  roleCode: '',
  handedness: 'R' as Handedness,
  height: 180,
  weight: 80,
  rookie: false,
  jersey: 0,
  injured: false,
  suspended: false,
  removed: false,
  captain: false,
  alternateCaptain: false,
  pictureUrl: '',
};

export const MOCK_FILTERS: Filters = {
  team: {
    name: 'Team A',
    data: {
      id: 1,
      teamName: 'Team A',
      teamLogo: '',
      externalHomepageLink: '',
    },
  },
  player: MOCK_PLAYER,
  season: '2024',
  goaltypefor: 'All goals',
  goaltypeagainst: 'All goals',
};

