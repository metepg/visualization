import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { getTeamData } from "./services/teamService.ts";
import { CircularProgress } from "@mui/material";
import MainContent from "./components/main-content/MainContent.tsx";
import { Team } from "./models/Team.ts";
import { fetchGames } from "./services/gameDataService.ts";
import { Game } from "./models/GameData.ts";

const App: React.FC = () => {
  const [data, setData] = useState<{teams: Team[], games: Game[]} | null>(null);

  useEffect(() => {
    const loadAllData = async () => {
      const [teamResponse, gameResponse] = await Promise.all([
        getTeamData(),
        fetchGames()
      ]);

      const sortedTeams = Object.values(teamResponse.data)[0]
        .toSorted((a, b) => a.name.localeCompare(b.name, 'fi'));

      setData({ teams: sortedTeams, games: gameResponse });
    };

    loadAllData().catch(console.error);
  }, []);

  if (!data) return <div className={styles.loadingIconContainer}><CircularProgress/></div>;

  return <MainContent teams={data.teams} games={data.games} />;
};

export default App;
