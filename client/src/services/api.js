import { demoMeta, getHistory, getStock, indices, newsItems, stockCatalog } from '../data/marketData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('stockpulse-token');
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'Request failed');
  return payload;
}

export async function getMarketOverview() {
  try { return await apiRequest('/market/overview'); } catch { return { indices, ...demoMeta }; }
}

export async function getStockDetails(symbol) {
  try { return await apiRequest(`/stocks/${encodeURIComponent(symbol)}`); } catch { return { stock: getStock(symbol), ...demoMeta }; }
}

export async function getStockHistory(symbol) {
  try { return await apiRequest(`/stocks/${encodeURIComponent(symbol)}/history`); } catch { return { history: getHistory(symbol), ...demoMeta }; }
}

export async function searchStocks(query) {
  try { return await apiRequest(`/stocks/search?q=${encodeURIComponent(query)}`); } catch {
    const normalized = query.toLowerCase();
    return { stocks: stockCatalog.filter((stock) => `${stock.symbol} ${stock.name} ${stock.exchange}`.toLowerCase().includes(normalized)), ...demoMeta };
  }
}

export async function getNews() {
  try { return await apiRequest('/news'); } catch { return { news: newsItems, ...demoMeta }; }
}
