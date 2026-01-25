import { groupGoalsByPeriod } from "../helpers.ts";
import { FilteredGoalEvent } from "../../models/GameData.ts";
import { MOCK_FILTERED_GOAL } from "./mocks/goals.mock.ts";

describe('groupGoalsByPeriod()', () => {
  it('groups goals by period', () => {
    const goals: FilteredGoalEvent[] = [
      MOCK_FILTERED_GOAL(1),
      MOCK_FILTERED_GOAL(2),
      MOCK_FILTERED_GOAL(1),
      MOCK_FILTERED_GOAL(3),
      MOCK_FILTERED_GOAL(4), // overtime
    ];

    const result = groupGoalsByPeriod(goals);

    expect(result.period1).toHaveLength(2);
    expect(result.period2).toHaveLength(1);
    expect(result.period3).toHaveLength(1);
    expect(result.overtime).toHaveLength(1);
  });
});
