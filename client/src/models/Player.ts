export interface Player {
  id: number;
  teamId: string;
  teamName: string;
  countryOfBirth: string;
  placeOfBirth: string;
  dateOfBirth: string; // ISO date
  nationality: string;
  firstName: string;
  lastName: string;
  role: PlayerRole;
  roleCode: string;
  handedness: Handedness;
  height: number;
  weight: number;
  rookie: boolean;
  jersey: number;
  injured: boolean;
  suspended: boolean;
  removed: boolean;
  captain: boolean;
  alternateCaptain: boolean;
  pictureUrl: string;
}

export type PlayerRole =
  | 'LEFT_DEFENSEMAN'
  | 'RIGHT_DEFENSEMAN'
  | 'CENTER'
  | 'LEFT_WINGER'
  | 'RIGHT_WINGER'
  | 'GOALIE';

export type Handedness = 'LEFT' | 'RIGHT';
