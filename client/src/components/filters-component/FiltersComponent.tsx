import React, { Dispatch, SetStateAction, useMemo } from 'react';
import styles from './FiltersComponent.module.css';
import { Stack } from "@mui/material";
import { ALL_PLAYERS_OBJECT, GOAL_TYPE, SEASON } from "../../constants/defaultValues.ts";
import { Team } from "../../models/Team.ts";
import { filterPlayersByTeam } from "../../utils/helpers.ts";
import { Player } from "../../models/Player.ts";
import { Filters } from "../../models/Filters.ts";
import FilterSelect from "./FilterSelect.tsx";

interface Props {
  filters: Filters;
  goalType: string[];
  players: Player[];
  season: string[];
  setFilters: Dispatch<SetStateAction<Filters>>;
  teams: Team[] | undefined;
}

const FiltersComponent: React.FC<Props> = ({ filters, setFilters, teams, season, goalType, players }) => {
  const teamId = filters.team?.data.id;

  const playerOptions = useMemo<Player[]>(() => {
    if (!teamId) {
      return [ALL_PLAYERS_OBJECT];
    }
    const sorted = filterPlayersByTeam(players, teamId);
    return [ALL_PLAYERS_OBJECT, ...sorted];
  }, [teamId, players]);

  if (!filters.team) {
    return null;
  }

  const handleTeamChange = (newTeam: Team) => {
    setFilters(prev => ({
      ...prev,
      team: newTeam,
      player: ALL_PLAYERS_OBJECT,
      season: SEASON[0],
      goaltypefor: GOAL_TYPE[0],
      goaltypeagainst: GOAL_TYPE[5]
    }));
  };

  const handlePlayerChange = (newPlayer: Player) => {
    setFilters(prev => ({ ...prev, player: newPlayer }));
  };

  const handleStaticChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Stack
      className={styles.filterContentStyles}
      direction="row"
      justifyContent="space-evenly"
      spacing={1}
      mb={20}
    >

      {/* TEAM SELECT */}
      <FilterSelect<Team>
        label="Team"
        width={240}
        value={filters.team}
        options={teams || []}
        getKey={(team) => team.data.id}
        getLabel={(team) => team.name}
        onChange={handleTeamChange}
      />

      {/* PLAYER SELECT */}
      <FilterSelect<Player>
        label="Player"
        width={240}
        value={filters.player}
        options={playerOptions}
        getKey={(player) => player.id}
        getLabel={(player) => player.id === ALL_PLAYERS_OBJECT.id
          ? 'All Players'
          : `${player.jersey || ''} ${player.firstName} ${player.lastName}`.trim()
        }
        onChange={handlePlayerChange}
      />

      {/* SEASON SELECT */}
      <FilterSelect<string>
        label="Season"
        width={240}
        value={filters.season}
        options={season}
        getKey={(key) => key}
        getLabel={(label) => label}
        onChange={(value) => handleStaticChange('season', value)}
        isOptionDisabled={(s) => s === 'Post-Season 2025-26'}
      />

      {/* GOALS FOR */}
      <FilterSelect<string>
        label="Goals for"
        width={160}
        value={filters.goaltypefor}
        options={goalType}
        getKey={(key) => key}
        getLabel={(label) => label}
        onChange={(value) => handleStaticChange('goaltypefor', value)}
      />

      {/* GOALS AGAINST */}
      <FilterSelect<string>
        label="Goals against"
        width={160}
        value={filters.goaltypeagainst}
        options={goalType}
        getKey={(key) => key}
        getLabel={(label) => label}
        onChange={(value) => handleStaticChange('goaltypeagainst', value)}
      />
    </Stack>
  );
};

export default FiltersComponent;
