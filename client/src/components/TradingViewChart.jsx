import { useEffect, useRef, useState } from 'react';
import { ExternalLink, LoaderCircle } from 'lucide-react';

export default function TradingViewChart({ symbol = 'NSE:RELIANCE', interval = 'D' }) {
  const container = useRef(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const mount = container.current;
    if (!mount) return undefined;
    mount.innerHTML = '';
    setLoading(true);
    setFailed(false);
    const widget = document.createElement('div');
    widget.className = 'tradingview-widget-container__widget';
    mount.appendChild(widget);
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({ autosize: true, symbol, interval, timezone: 'Asia/Kolkata', theme: 'dark', style: '1', locale: 'en', allow_symbol_change: false, calendar: false, hide_top_toolbar: false, hide_legend: false, save_image: false, support_host: 'https://www.tradingview.com' });
    script.onload = () => { if (!cancelled) setLoading(false); };
    script.onerror = () => { if (!cancelled) { setLoading(false); setFailed(true); } };
    mount.appendChild(script);
    const timeout = window.setTimeout(() => { if (!cancelled) setLoading(false); }, 3500);
    return () => { cancelled = true; window.clearTimeout(timeout); if (mount) mount.innerHTML = ''; };
  }, [symbol, interval]);

  return (
    <div className="chart-shell">
      {loading && <div className="chart-loading"><LoaderCircle className="spin" size={20} /><span>Connecting to TradingView…</span></div>}
      {failed && <div className="chart-fallback"><p>TradingView could not be loaded in this environment.</p><a href={`https://www.tradingview.com/symbols/${symbol.replace(':', '-')}/`} target="_blank" rel="noreferrer">Open chart on TradingView <ExternalLink size={14} /></a></div>}
      <div ref={container} className="tradingview-widget-container" aria-label={`TradingView chart for ${symbol}`} />
      <div className="chart-attribution">Chart powered by TradingView · Widget data is provided by TradingView, not StockPulse.</div>
    </div>
  );
}
