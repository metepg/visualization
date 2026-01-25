import axios from 'axios';
import { Game, GameDBResponse } from "../models/GameData.ts";

export const fetchGames = async (): Promise<Game[]> => {
  const { data } = await axios.get<GameDBResponse[]>("/api/games");
  return data.map((game) => game.rawJson);
};

export const fetchGamesByTeam = async (teamName?: string): Promise<Game[]> => {
  const { data } = await axios.get<GameDBResponse[]>(`/api/games/${teamName}`);
  return data.map((game) => game.rawJson);
};

export const extractTeamId = (teamId: string): number => Number(teamId.split(":")[0]);
