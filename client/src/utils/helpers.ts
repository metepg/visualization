import { Player } from "../models/Player.ts";
import { FilteredGoalEvent, GamePlayer, GoalEvent, Periods } from "../models/GameData.ts";
import { Filters } from "../models/Filters.ts";

export const formatDate = (dateString: string): string => {
  const date: Date = new Date(dateString);
  const monthAbbreviation: string = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day: number = date.getDate();
  return `${monthAbbreviation} ${day}`;
}

export const getCirclePosition = (periodInMinutes: number, secondsIntoPeriod: number): string => {
  const periodSeconds = periodInMinutes * 60;
  const pct = Math.max(0, Math.min(secondsIntoPeriod / periodSeconds, 1));
  return `${pct * 100}%`;
};

export const goalTypeShort = (value: string | null | undefined): string => {
  if (!value) return '';
  value = value?.toLowerCase().replace(/[^a-z]/g, '');
  const shortened: { [key: string]: string } = {
    allgoals: 'AG',
    powerplay: 'YV',
    powerplay2: 'YV2',
    shorthanded: 'AV',
    emptynet: 'TM',
    gamewinning: 'GW'
  };
  return shortened[value] || '';
}

export const goalTypeLong = (value: string | null | undefined): string => {
  if (!value) return '';
  const long: { [key: string]: string } = {
    // TODO: What are the correct keys?
    YV: 'POWER-PLAY -GOAL',
    AV: 'SHORT-HANDED -GOAL',
    TM: 'EMPTY NET',
    GW: 'GAME-WINNING -GOAL'
  };
  return long[value?.toString().toUpperCase()] || 'GOAL';
}

export const groupGoalsByPeriod = (goals: FilteredGoalEvent[]): Periods => {
  const periods: Periods = {
    period1: [],
    period2: [],
    period3: [],
    overtime: [],
  };

  if (!goals?.length) return periods;

  for (const goal of goals) {
    switch (goal.period) {
      case 1:
        periods.period1.push(goal);
        break;
      case 2:
        periods.period2.push(goal);
        break;
      case 3:
        periods.period3.push(goal);
        break;
      default:
        periods.overtime.push(goal);
    }
  }

  return periods;
};


export const filterGoals = (
  homeTeamName: string,
  awayTeamName: string,
  homeGoals: GoalEvent[],
  awayGoals: GoalEvent[],
  filters: Filters
): FilteredGoalEvent[] => {

  const selectedTeam = filters.team?.name;
  const goalTypeAgainst = goalTypeShort(filters.goaltypeagainst);
  const goalTypeFor = goalTypeShort(filters.goaltypefor);

  const evaluateGoal = (goal: GoalEvent, teamName: string): FilteredGoalEvent => {
    const strength = goal.goalTypes[0] ?? 'EV';
    const isSelectedTeam = teamName === selectedTeam;

    // 1. Determine which filter settings apply to this specific goal
    const selectedTeamsFilter = isSelectedTeam ? filters.goaltypefor : filters.goaltypeagainst;
    const selectedFilterStrength = isSelectedTeam ? goalTypeFor : goalTypeAgainst;

    // 2. Check if the goal matches the filter criteria
    const matchesType =
      selectedTeamsFilter === 'All goals' ||
      (selectedTeamsFilter === 'Game-winning' && goal.winningGoal) ||
      selectedFilterStrength === strength;

    // 3. Check player (only relevant if it's the selected team's goal)
    const matchesPlayer = filters.player.id === 999 || filters.player.id === goal.scorerPlayerId;

    return {
      ...goal,
      teamName,
      strength,
      showGoal: isSelectedTeam ? (matchesPlayer && matchesType) : matchesType,
    };
  };

  return [
    ...homeGoals.map(goalEvent => evaluateGoal(goalEvent, homeTeamName)),
    ...awayGoals.map(goalEvent => evaluateGoal(goalEvent, awayTeamName)),
  ];
};

export const filterPlayersByTeam = (players: Player[], teamId: number | undefined): Player[] => {
  if (teamId === undefined || teamId === null) {
    return [];
  }

  return players.filter((player: Player) => player.teamId.startsWith(`${teamId}:`))
    .slice()
    .sort((a, b) => a.jersey - b.jersey);
};

const TEAMS: Record<number, string> = {
  168761288: "IFK",
  55786244: "HPK",
  951626834: "ILV",
  292293444: "JUK",
  219244634: "JYP",
  859884935: "KAL",
  1368624751: "KES",
  461765763: "KOO",
  495643563: "KÄR",
  624554857: "LUK",
  875886777: "PEL",
  933686567: "SAI",
  626537494: "SPO",
  362185137: "TAP",
  651304385: "TPS",
  679171680: "ÄSS",
};

export const getTeamNameShort = (rawId: string): string => {
  // Extract id from teamId eg. "168761288:hifk"
  const id = parseInt(rawId.split(":")[0], 10);

  return TEAMS[id] ?? "Unknown";
};

/**
 * Formats player names and their corresponding assist counts into a string.
 * @param {Array} players - Array of player objects with playerId and lastName.
 * @param {Object} assistData - Map of player IDs to assist counts.
 * @returns {string} - Formatted string "LastName (Assists), ..." or "—"
 */
export const formatPlayerAssists = (players: GamePlayer[] | null, assistData: Record<string, number> | null): string => {
  if (!players || players.length === 0) {
    return 'Unknown';
  }

  return players.map(player => {
      const count = assistData?.[player.playerId.toString()] ?? 0;
      return `${player.lastName}(${count})`;
    })
    .join(', ');
};
