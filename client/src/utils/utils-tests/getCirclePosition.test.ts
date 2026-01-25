import { getCirclePosition } from "../helpers.ts";

describe('getCirclePosition', () => {
  it('returns 0% when secondsIntoPeriod is 0', () => {
    expect(getCirclePosition(20, 0)).toBe('0%');
  });

  it('returns 50% in the middle of the period', () => {
    expect(getCirclePosition(20, 600)).toBe('50%'); // 10 min
  });

  it('returns 100% at the end of the period', () => {
    expect(getCirclePosition(20, 1200)).toBe('100%');
  });

  it('caps at 100% when seconds exceed period length', () => {
    expect(getCirclePosition(20, 1500)).toBe('100%');
  });

  it('works with custom period length', () => {
    expect(getCirclePosition(15, 450)).toBe('50%'); // 7.5 min
  });
});
