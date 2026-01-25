import { goalTypeShort } from "../helpers.ts";

describe('shortenGoalTypeName', () => {
  it('returns an empty string when value is null', () => {
    expect(goalTypeShort(null)).toBe('');
  });

  it('returns an empty string when value is undefined', () => {
    expect(goalTypeShort(undefined)).toBe('');
  });

  it('returns the correct shortened goal type name when value is valid', () => {
    expect(goalTypeShort('AllGoals')).toBe('AG');
    expect(goalTypeShort('powerplay')).toBe('PPG');
    expect(goalTypeShort('ShorThanded')).toBe('SHG');
    expect(goalTypeShort('EMPTYNET')).toBe('EN');
    expect(goalTypeShort('gamewinning')).toBe('GW');
  });

  it('returns an empty string when the value does not match any known goal type', () => {
    expect(goalTypeShort('InvalidGoalType')).toBe('');
    expect(goalTypeShort('')).toBe('');
  });
});
