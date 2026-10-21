export const stocks = [
  { symbol: 'RELIANCE', name: 'Reliance Industries', exchange: 'NSE', sector: 'Energy', tvSymbol: 'NSE:RELIANCE', price: 2921.35, change: 34.25, changePct: 1.19 },
  { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE', sector: 'Information Technology', tvSymbol: 'NSE:TCS', price: 4112.8, change: -28.65, changePct: -0.69 },
  { symbol: 'INFY', name: 'Infosys', exchange: 'NSE', sector: 'Information Technology', tvSymbol: 'NSE:INFY', price: 1859.45, change: 19.7, changePct: 1.07 },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', exchange: 'NSE', sector: 'Financial Services', tvSymbol: 'NSE:HDFCBANK', price: 1762.1, change: 8.35, changePct: 0.48 },
  { symbol: 'ICICIBANK', name: 'ICICI Bank', exchange: 'NSE', sector: 'Financial Services', tvSymbol: 'NSE:ICICIBANK', price: 1294.7, change: -4.1, changePct: -0.32 },
  { symbol: 'SBIN', name: 'State Bank of India', exchange: 'NSE', sector: 'Financial Services', tvSymbol: 'NSE:SBIN', price: 812.2, change: 7.95, changePct: 0.99 },
  { symbol: 'ITC', name: 'ITC Limited', exchange: 'NSE', sector: 'Consumer Staples', tvSymbol: 'NSE:ITC', price: 468.35, change: -2.2, changePct: -0.47 },
  { symbol: 'TATAMOTORS', name: 'Tata Motors', exchange: 'NSE', sector: 'Automotive', tvSymbol: 'NSE:TATAMOTORS', price: 982.15, change: 21.8, changePct: 2.27 },
  { symbol: 'LT', name: 'Larsen & Toubro', exchange: 'NSE', sector: 'Industrials', tvSymbol: 'NSE:LT', price: 3644.9, change: 12.4, changePct: 0.34 },
  { symbol: 'BHARTIARTL', name: 'Bharti Airtel', exchange: 'NSE', sector: 'Telecommunication', tvSymbol: 'NSE:BHARTIARTL', price: 1641.6, change: -11.25, changePct: -0.68 }
];

const offsets = [0, 0.012, -0.008, 0.02, 0.01, 0.034, 0.026, 0.046, 0.038, 0.061, 0.051, 0.075, 0.068, 0.09, 0.082, 0.11, 0.098, 0.128, 0.116, 0.146, 0.137, 0.159, 0.153, 0.177, 0.165, 0.191, 0.183, 0.207, 0.198, 0.226];
export function demoHistory(symbol) { const stock = stocks.find((item) => item.symbol === String(symbol).toUpperCase()) || stocks[0]; return offsets.map((offset, index) => ({ date: `2025-${String(Math.floor(index / 3) + 1).padStart(2, '0')}-${String((index % 3) * 7 + 3).padStart(2, '0')}`, close: Number((stock.price * (0.86 + offset + Math.sin(index * 1.35) * 0.012)).toFixed(2)) })); }
export const indices = [
  { symbol: 'NIFTY 50', value: '23,765.55', change: '+184.90', changePct: '+0.78%', positive: true },
  { symbol: 'SENSEX', value: '78,472.87', change: '+594.88', changePct: '+0.76%', positive: true },
  { symbol: 'BANK NIFTY', value: '51,282.10', change: '-92.45', changePct: '-0.18%', positive: false }
];
export const demoNews = [
  { id: 1, title: 'Configure NEWS_API_URL to retrieve the latest headlines', source: 'StockPulse', time: 'Configuration required', tag: 'SETUP', tone: 'purple', url: 'https://www.reuters.com/markets/' },
  { id: 2, title: 'Reuters Markets — global business and financial coverage', source: 'Reuters', time: 'External source', tag: 'GLOBAL', tone: 'blue', url: 'https://www.reuters.com/markets/' },
  { id: 3, title: 'NSE India — official market notices and index information', source: 'NSE India', time: 'External source', tag: 'INDIA', tone: 'green', url: 'https://www.nseindia.com/' }
];
