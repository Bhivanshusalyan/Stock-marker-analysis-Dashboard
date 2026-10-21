import { stocks } from '../../data/demoMarket.js';

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);
  try { const response = await fetch(url, { signal: controller.signal }); const payload = await response.json(); if (!response.ok || payload.status === 'error') throw new Error(payload.message || `Provider returned ${response.status}`); return payload; } finally { clearTimeout(timeout); }
}

export class TwelveDataProvider {
  constructor(apiKey) { this.apiKey = apiKey; this.name = 'Twelve Data'; this.isDemo = false; this.baseUrl = 'https://api.twelvedata.com'; }
  async search(query = '') { return stocks.filter((stock) => `${stock.symbol} ${stock.name}`.toLowerCase().includes(query.toLowerCase())); }
  async quote(symbol) { const stock = stocks.find((item) => item.symbol === symbol.toUpperCase()); if (!stock) { const error = new Error('Stock symbol is not supported'); error.status = 404; throw error; } const payload = await fetchJson(`${this.baseUrl}/quote?symbol=${encodeURIComponent(stock.symbol)}&exchange=${stock.exchange}&apikey=${this.apiKey}`); const price = Number(payload.close || payload.price); const previous = Number(payload.previous_close); return { ...stock, price, change: Number((price - previous).toFixed(2)), changePct: Number((((price - previous) / previous) * 100).toFixed(2)), timestamp: payload.datetime || new Date().toISOString() }; }
  async history(symbol) { const stock = stocks.find((item) => item.symbol === symbol.toUpperCase()); if (!stock) { const error = new Error('Stock symbol is not supported'); error.status = 404; throw error; } const payload = await fetchJson(`${this.baseUrl}/time_series?symbol=${encodeURIComponent(stock.symbol)}&exchange=${stock.exchange}&interval=1day&outputsize=60&apikey=${this.apiKey}`); return (payload.values || []).reverse().map((item) => ({ date: item.datetime, open: Number(item.open), high: Number(item.high), low: Number(item.low), close: Number(item.close), volume: Number(item.volume) })); }
  async overview() { const movers = await Promise.all(stocks.slice(0, 5).map(async (stock) => { try { return await this.quote(stock.symbol); } catch { return null; } })); return { indices: [], movers: movers.filter(Boolean) }; }
}
