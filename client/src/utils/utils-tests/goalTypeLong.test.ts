import { goalTypeLong } from "../helpers.ts";

describe('goalTypeLong', () => {
  it('should return an empty string if the value is falsy', () => {
    expect(goalTypeLong(null)).toBe('');
    expect(goalTypeLong(undefined)).toBe('');
    expect(goalTypeLong('')).toBe('');
  });

  it('should return the corresponding long goal type for valid input', () => {
    const testData: [string, string][] = [
      ['YV', 'POWER-PLAY -GOAL'],
      ['AV', 'SHORT-HANDED -GOAL'],
      ['TM', 'EMPTY NET'],
      ['GW', 'GAME-WINNING -GOAL'],
    ];

    testData.forEach(([input, expected]) => {
      expect(goalTypeLong(input)).toBe(expected);
    });
  });

  it('should handle uppercase and lowercase goal types', () => {
    expect(goalTypeLong('yv')).toBe('POWER-PLAY -GOAL');
    expect(goalTypeLong('av')).toBe('SHORT-HANDED -GOAL');
    expect(goalTypeLong('tm')).toBe('EMPTY NET');
    expect(goalTypeLong('gw')).toBe('GAME-WINNING -GOAL');
  });

  it('should return "GOAL" for unknown goal type', () => {
    expect(goalTypeLong('XYZ')).toBe('GOAL');
  });
});
