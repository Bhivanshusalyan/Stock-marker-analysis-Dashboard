import { Bell, Menu, Plus, Search, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { SearchField } from './UI';
import { stockCatalog } from '../data/marketData';
import { useState } from 'react';

export default function Topbar({ onMenu }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const results = query ? stockCatalog.filter((stock) => `${stock.symbol} ${stock.name}`.toLowerCase().includes(query.toLowerCase())).slice(0, 4) : [];
  function choose(stock) { setQuery(''); navigate(`/stocks/${stock.symbol}`); }
  return <header className="topbar">
    <button className="menu-button" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
    <div className="topbar-search"><SearchField value={query} onChange={setQuery} placeholder="Search stocks, symbols…" />{results.length > 0 && <div className="search-results">{results.map((stock) => <button key={stock.symbol} onClick={() => choose(stock)}><strong>{stock.symbol}</strong><span>{stock.name}</span></button>)}</div>}</div>
    <div className="topbar-actions"><Link className="quick-add" to="/portfolio"><Plus size={16} /> <span>Record transaction</span></Link><button className="icon-button notification" aria-label="Notifications"><Bell size={18} /><i /></button><Link to="/settings" className="user-chip"><span className="avatar">G</span><span className="user-name">Guest mode</span><UserRound size={14} /></Link></div>
  </header>;
}
