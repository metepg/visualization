import React, { useEffect, useMemo, useState } from 'react';
import styles from './MainContent.module.css';
import { DEFAULT_FILTERS, GOAL_TYPE, SEASON } from "../../constants/defaultValues.ts";
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
import { fetchGamesByTeam } from "../../services/gameDataService.ts";

interface Props {
  teams: Team[];
}

const MainContent: React.FC<Props> = ({ teams }) => {
  const defaultTeam = teams[0];
  const [filters, setFilters] = useState<Filters>({
    ...DEFAULT_FILTERS,
    team: defaultTeam,
  });
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const teamName = filters.team?.name;

    if (!teamName) {
      return;
    }

    const loadData = async () => {
      setIsLoading(true);
      try {
        const fetchedGames = await fetchGamesByTeam(teamName);
        setGames(fetchedGames);
      } catch (err) {
        console.error("Failed to load games", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [filters.team]);

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
        <section className={styles.gameResultsContainer}>
          <div className={isLoading ? styles.gamesLoading : styles.gamesReady}>
            <Content
              games={games}
              filters={filters}
              playersById={playersById}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default MainContent;
