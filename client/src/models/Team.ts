// SM-LIIGA
export interface TeamData {
  teamName: string;
  teamLogo: string;
  id: number;
  externalHomepageLink: string;
}

export interface Team {
  name: string;
  data: TeamData;
}

export interface TeamResponse {
  [key: string]: Team[];
}
