import { demoHistory, indices, stocks } from '../../data/demoMarket.js';

export class DemoMarketProvider {
  constructor() { this.name = 'Demo snapshot'; this.isDemo = true; }
  async search(query = '') { const normalized = query.toLowerCase(); return stocks.filter((stock) => `${stock.symbol} ${stock.name} ${stock.exchange}`.toLowerCase().includes(normalized)); }
  async quote(symbol) { const stock = stocks.find((item) => item.symbol === symbol.toUpperCase()); if (!stock) { const error = new Error('Stock symbol is not supported'); error.status = 404; throw error; } return stock; }
  async history(symbol) { await this.quote(symbol); return demoHistory(symbol); }
  async overview() { return { indices, movers: [...stocks].sort((a, b) => b.changePct - a.changePct).slice(0, 6) }; }
}
