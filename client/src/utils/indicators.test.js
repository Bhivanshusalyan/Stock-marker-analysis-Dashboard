import { describe, expect, it } from 'vitest';
import { bollinger, ema, macd, rsi, sma } from './indicators';

describe('technical indicators', () => {
  const values = [10, 11, 12, 11, 13, 14, 15, 14, 16, 17];
  it('calculates a simple moving average after the warmup period', () => { expect(sma(values, 3).slice(0, 2)).toEqual([null, null]); expect(sma(values, 3)[2]).toBe(11); });
  it('calculates a non-recursive exponential moving average', () => { const result = ema(values, 3); expect(result[2]).toBe(11); expect(result[9]).toBeGreaterThan(14); });
  it('returns bounded RSI values', () => { expect(rsi(values, 3).slice(3).every((value) => value >= 0 && value <= 100)).toBe(true); });
  it('returns band and MACD objects after enough data', () => { expect(bollinger(values, 3)[4]).toHaveProperty('upper'); expect(macd(values, 3, 5, 2)[9]).toHaveProperty('histogram'); });
});
