import { Team } from "./Team.ts";
import { Player } from "./Player.ts";

export interface Filters {
  team: Team;
  player: Player;
  season: string;
  goaltypefor: string;
  goaltypeagainst: string;
}
