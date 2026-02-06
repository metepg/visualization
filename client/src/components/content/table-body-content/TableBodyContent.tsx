import React, { ReactElement, useState } from "react";
import GameSpecific from "../../game-specific/GameSpecific.tsx";
import { filterGoals, formatDate, getTeamNameShort, groupGoalsByPeriod } from "../../../utils/helpers.ts";
import Timeline from "../../timeline/Timeline.tsx";
import Shootout from "../../shootout/Shootout.tsx";
import Result from "../../result/Result.tsx";
import Row from "./Row.tsx";
import { Game, Periods } from "../../../models/GameData.ts";
import { Player } from "../../../models/Player.ts";
import { Filters } from "../../../models/Filters.ts";
import PeriodHighLight from "./PeriodHighLight.tsx";

interface TableRowValues {
  date: string;
  teams: ReactElement;
  period1: ReactElement,
  period2: ReactElement,
  period3: ReactElement,
  OT: ReactElement,
  SO: ReactElement,
  result: ReactElement,
  expandedContent: ReactElement
}

interface Props {
  filters: Filters,
  filteredGame: Game,
  playersById: Map<number, Player> | undefined
  activePeriod: string;
}

const TableBodyContent: React.FC<Props> = ({ filteredGame, filters, playersById, activePeriod }) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [hoveredRow, setHoveredRow] = useState<string>();

  const handleRowClick = (date: string) => {
    setSelectedRows((prevSelectedRows: string[]): string[] => {
      const isSelected: boolean = prevSelectedRows.includes(date);
      return isSelected
        ? prevSelectedRows.filter((selectedDate) => selectedDate !== date)
        : [...prevSelectedRows, date];
    });
  };

  const handleRowHover = (date: string, isHovered: boolean) => {
    setHoveredRow(isHovered ? date : '');
  };

  const getGameData = (filteredGame: Game) => {
    if (!filteredGame.started || !filteredGame.ended) {
      return null;
    }

    const game = filteredGame;

    const filteredGoals = filterGoals(
      game.homeTeam.teamName,
      game.awayTeam.teamName,
      game.homeTeam.goalEvents ?? [],
      game.awayTeam.goalEvents ?? [],
      filters
    );

    const goalsByPeriod: Periods = groupGoalsByPeriod(filteredGoals);

    const date = formatDate(game.start);
    const isSelectedGame = selectedRows.includes(date);
    const isHovered = date === hoveredRow;

    const isSelectedTeam = filters.team?.name === game.homeTeam.teamName;

    const teams = (
      <>
        <span style={{ color: isSelectedTeam ? 'var(--red)' : 'var(--black)' }}>
          {getTeamNameShort(game.homeTeam.teamId)}
        </span>
        {' - '}
        <span style={{ color: isSelectedTeam ? 'var(--black)' : 'var(--red)' }}>
          {getTeamNameShort(game.awayTeam.teamId)}
        </span>
      </>
    );

    return {
      date,
      teams,
      period1: (
        <PeriodHighLight isActive={activePeriod === 'p1'}>
          <Timeline
            goals={goalsByPeriod.period1}
            filters={filters}
            game={game}
            selectedRowDate={isSelectedGame}
            isHoveredRow={isHovered}
            playersById={playersById}
          />
        </PeriodHighLight>
      ),
      period2: (
        <PeriodHighLight isActive={activePeriod === 'p2'}>
          <Timeline
            goals={goalsByPeriod.period2}
            filters={filters}
            game={game}
            selectedRowDate={isSelectedGame}
            isHoveredRow={isHovered}
            playersById={playersById}
          />
        </PeriodHighLight>
      ),
      period3: (
        <PeriodHighLight isActive={activePeriod === 'p3'}>
          <Timeline
            goals={goalsByPeriod.period3}
            filters={filters}
            game={game}
            selectedRowDate={isSelectedGame}
            isHoveredRow={isHovered}
            playersById={playersById}
          />
        </PeriodHighLight>
      ),
      OT: (
        <PeriodHighLight isActive={activePeriod === 'ot'}>
          <Timeline
            goals={goalsByPeriod.overtime}
            filters={filters}
            game={game}
            selectedRowDate={isSelectedGame}
            isHoveredRow={isHovered}
            playersById={playersById}
          />
        </PeriodHighLight>
      ),
      SO: <Shootout showAll={false} game={game} filters={filters}/>,
      result: <Result game={game} filters={filters}/>,
      expandedContent: (
        <GameSpecific
          game={game}
          goalsByPeriod={goalsByPeriod}
          filters={filters}
          playersById={playersById}
        />
      ),
    };
  };

  const rowValues: TableRowValues | null = getGameData(filteredGame);

  if (!rowValues) {
    return null;
  }

  return (
    <Row
      key={rowValues.date}
      game={rowValues}
      selected={selectedRows.includes(rowValues.date)}
      onClick={() => handleRowClick(rowValues.date)}
      setHoveredRow={handleRowHover}
    />
  );
}

export default TableBodyContent;
