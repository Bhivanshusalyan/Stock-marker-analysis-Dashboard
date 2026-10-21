export function sma(values, period = 14) {
  return values.map((_, index) => {
    if (index < period - 1) return null;
    const slice = values.slice(index - period + 1, index + 1);
    return Number((slice.reduce((sum, value) => sum + value, 0) / period).toFixed(2));
  });
}

export function ema(values, period = 14) {
  const output = Array(values.length).fill(null);
  if (values.length < period) return output;
  const multiplier = 2 / (period + 1);
  let previous = values.slice(0, period).reduce((sum, item) => sum + item, 0) / period;
  output[period - 1] = Number(previous.toFixed(2));
  for (let index = period; index < values.length; index += 1) {
    previous = values[index] * multiplier + previous * (1 - multiplier);
    output[index] = Number(previous.toFixed(2));
  }
  return output;
}

export function rsi(values, period = 14) {
  return values.map((_, index) => {
    if (index < period) return null;
    let gains = 0;
    let losses = 0;
    for (let i = index - period + 1; i <= index; i += 1) {
      const change = values[i] - values[i - 1];
      if (change >= 0) gains += change;
      else losses += Math.abs(change);
    }
    if (losses === 0) return 100;
    return Number((100 - 100 / (1 + gains / losses)).toFixed(2));
  });
}

export function bollinger(values, period = 20, multiplier = 2) {
  return values.map((_, index) => {
    if (index < period - 1) return null;
    const slice = values.slice(index - period + 1, index + 1);
    const mean = slice.reduce((sum, value) => sum + value, 0) / period;
    const deviation = Math.sqrt(slice.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / period);
    return { middle: Number(mean.toFixed(2)), upper: Number((mean + multiplier * deviation).toFixed(2)), lower: Number((mean - multiplier * deviation).toFixed(2)) };
  });
}

export function macd(values, fast = 12, slow = 26, signal = 9) {
  const fastEma = ema(values, fast);
  const slowEma = ema(values, slow);
  const line = values.map((_, index) => fastEma[index] != null && slowEma[index] != null ? Number((fastEma[index] - slowEma[index]).toFixed(2)) : null);
  const usable = line.map((value) => value ?? 0);
  const signalLine = ema(usable, signal);
  return line.map((value, index) => value == null ? null : { macd: value, signal: signalLine[index], histogram: signalLine[index] == null ? null : Number((value - signalLine[index]).toFixed(2)) });
}
