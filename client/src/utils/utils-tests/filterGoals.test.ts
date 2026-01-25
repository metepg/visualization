import { filterGoals } from "../helpers.ts";
import { GoalEvent } from "../../models/GameData.ts";
import { MOCK_FILTERS, MOCK_GOAL, MOCK_PLAYER } from "./mocks/goals.mock.ts";

describe('filterGoals', () => {
  it('shows all goals when filters do not restrict', () => {
    const homeGoals: GoalEvent[] = [
      MOCK_GOAL(1, 1),
      MOCK_GOAL(1, 3),
    ];

    const awayGoals: GoalEvent[] = [
      MOCK_GOAL(2, 2),
      MOCK_GOAL(3, 4),
      MOCK_GOAL(4, 5),
    ];

    const result = filterGoals(
      'Team A',
      'Team B',
      homeGoals,
      awayGoals,
      MOCK_FILTERS
    );

    result.forEach(goal => {
      expect(goal.showGoal).toBe(true);
    });
  });

  it('filters by selected player for selected team', () => {
    const filters = {
      ...MOCK_FILTERS,
      player: { ...MOCK_PLAYER, id: 2 },
    };

    const homeGoals: GoalEvent[] = [
      MOCK_GOAL(1, 1), // Team A, player 1
      MOCK_GOAL(1, 2), // Team A, player 2
    ];

    const awayGoals: GoalEvent[] = [
      MOCK_GOAL(2, 8), // Team B
    ];

    const result = filterGoals(
      'Team A',
      'Team B',
      homeGoals,
      awayGoals,
      filters
    );

    expect(result[0].showGoal).toBe(false); // Team A, wrong player
    expect(result[1].showGoal).toBe(true);  // Team A, player match
    expect(result[2].showGoal).toBe(true);  // Team B always shown
  });
});
