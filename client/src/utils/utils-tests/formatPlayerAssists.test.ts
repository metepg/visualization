import { formatPlayerAssists } from "../helpers.ts";
import { GamePlayer } from "../../models/GameData.ts";

describe('formatPlayerAssists', () => {
  const mockPlayers: GamePlayer[] = [
    {
      playerId: 27900714,
      firstName: 'PETRUS',
      lastName: 'PALMU'
    },
    {
      playerId: 61014435,
      firstName: 'SEAN',
      lastName: 'JOSLING'
    }
  ];

  const mockAssists = {
    "27900714": 9,
    "61014435": 2
  };

  test('should format names and assists correctly', () => {
    const result = formatPlayerAssists(mockPlayers, mockAssists);
    expect(result).toBe('PALMU(9), JOSLING(2)');
  });

  test('should default to 0 if assist data is missing for a player', () => {
    const partialAssists = { "27900714": 9 };
    const result = formatPlayerAssists(mockPlayers, partialAssists);
    expect(result).toBe('PALMU(9), JOSLING(0)');
  });

  test('should handle null/undefined assistData', () => {
    const result = formatPlayerAssists(mockPlayers, null);
    expect(result).toBe('PALMU(0), JOSLING(0)');
  });

  test('should return "Unknown" if players array is empty or null', () => {
    expect(formatPlayerAssists([], mockAssists)).toBe('Unknown');
    expect(formatPlayerAssists(null, mockAssists)).toBe('Unknown');
  });
});
