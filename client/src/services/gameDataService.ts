import axios from 'axios';
import { Game } from "../models/GameData.ts";

// Fetches all games from every team from this season until today
export const fetchGames = async (): Promise<Game[]> => {
  const { data } = await axios.get<Game[]>("https://www.liiga.fi/api/v2/games?tournament=runkosarja");
  return data;
};

export const extractTeamId = (teamId: string): number => Number(teamId.split(":")[0]);
