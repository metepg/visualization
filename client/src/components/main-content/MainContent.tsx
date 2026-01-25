import React, { useMemo, useState } from 'react';
import styles from './MainContent.module.css';
import { DEFAULT_FILTERS, GOAL_TYPE, SEASON } from "../../constants/defaultValues.ts";
import { extractTeamId } from "../../services/gameDataService.ts";
import Navbar from "../navbar/Navbar.tsx";
import ChooseComponent from "../choose-component/ChooseComponent.tsx";
import FiltersComponent from "../filters-component/FiltersComponent.tsx";
import NowVisualizing from "../now-visualizing/NowVisualizing.tsx";
import Content from "../content/Content.tsx";
import { Team } from "../../models/Team.ts";
import playersJSON from '../../../demo-data/playerData.json';
import { Player } from "../../models/Player.ts";
import { Game } from "../../models/GameData.ts";
import { Filters } from "../../models/Filters.ts";

interface Props {
  teams: Team[];
  games: Game[];
}

const MainContent: React.FC<Props> = ({ teams, games }) => {
  const defaultTeam = teams[0];
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
    team: defaultTeam,
  });

  // TODO: Check this part
  const selectedTeamGames = useMemo(() => {
    const teamId = filters.team?.data?.id;
    if (!teamId || games.length === 0) return [];

    return games
      .filter((game) =>
        extractTeamId(game.homeTeam.teamId) === teamId ||
        extractTeamId(game.awayTeam.teamId) === teamId
      )
      .filter((game) => game.started && game.ended)
      .reverse();
  }, [games, filters.team]);

  const players = playersJSON as Player[];
  const playersById = useMemo(() => {
    return new Map(players.map(player => [player.id, player]));
  }, [players]);

  return (
    <>
      <Navbar/>
      <main className={styles.contentWrapper}>
        <ChooseComponent/>
        <FiltersComponent
          setFilters={setFilters}
          season={SEASON}
          goalType={GOAL_TYPE}
          filters={filters}
          teams={teams}
          players={players}
        />
        <hr/>
        <NowVisualizing filters={filters} players={players}/>
        <section>
          <Content
            games={selectedTeamGames}
            filters={filters}
            playersById={playersById}
          />
        </section>
      </main>
    </>
  );
};

export default MainContent;
