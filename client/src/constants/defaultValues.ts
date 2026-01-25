import { Player } from "../models/Player.ts";
import { Team } from "../models/Team.ts";
import { Filters } from "../models/Filters.ts";

export const API_V2_URL = "https://www.liiga.fi/api/v2";
export const GOAL_TYPE: string[] = ['All goals', 'Power-play', 'Short-handed', 'Empty-net', 'Game-winning', 'None'];
export const SEASON: string[] = ['Regular Season 2025-26', 'Post-Season 2025-26'];
export const ALL_PLAYERS_OBJECT: Player = {
  id: 999,
  teamId: 'ALL:all',
  teamName: 'ALL',
  countryOfBirth: '',
  placeOfBirth: '',
  dateOfBirth: '',
  nationality: '',
  firstName: 'All',
  lastName: 'Players',
  role: 'CENTER',
  roleCode: '',
  handedness: 'LEFT',
  height: 0,
  weight: 0,
  rookie: false,
  jersey: 999,
  injured: false,
  suspended: false,
  removed: false,
  captain: false,
  alternateCaptain: false,
  pictureUrl: ''
};
export const DEFAULT_TEAM: Team = {
  name: 'None',
  data: {
    teamName: 'None',
    teamLogo: 'None',
    id: 12345,
    externalHomepageLink: 'None',
  }
};

export const DEFAULT_FILTERS: Filters = {
  team: DEFAULT_TEAM,
  player: ALL_PLAYERS_OBJECT,
  season: SEASON[0],
  goaltypefor: GOAL_TYPE[0],
  goaltypeagainst: GOAL_TYPE[5] // None
}
export const TABLE_HEADERS: { text: string, width: string }[] = [
  { text: 'Date', width: '60px' },
  { text: 'Game', width: '105px' },
  { text: '1st period', width: '213px' },
  { text: '2nd period', width: '213px' },
  { text: '3rd period', width: '213px' },
  { text: 'OT', width: '58px' },
  { text: 'SO', width: '25px' },
  { text: 'Result', width: '62px' },
  { text: '+', width: '30px' }
];
