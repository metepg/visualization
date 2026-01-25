import React, { useEffect, useState } from 'react';
import styles from './App.module.css';
import { getTeamData } from "./services/teamService.ts";
import { CircularProgress } from "@mui/material";
import MainContent from "./components/main-content/MainContent.tsx";
import { Team } from "./models/Team.ts";

const App: React.FC = () => {
  const [teams, setTeams] = useState<Team[] | null>(null);

  useEffect(() => {
    getTeamData()
      .then(response => {
        const teamList = Object.values(response.data)[0];
        setTeams(teamList.toSorted((a, b) => a.name.localeCompare(b.name, 'fi')));
      })
      .catch(console.error);
  }, []);

  if (!teams) {
    return (
      <div className={styles.loadingIconContainer}>
        <CircularProgress />
      </div>
    );
  }

  return <MainContent teams={teams} />;
};

export default App;
