import { Activity, Bell, BookOpen, BriefcaseBusiness, ChartNoAxesCombined, ChevronLeft, ChevronRight, GitCompareArrows, LayoutDashboard, LineChart, Settings, Star, TrendingUp, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const primary = [
  { to: '/', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/stocks', label: 'Explore stocks', icon: TrendingUp },
  { to: '/watchlist', label: 'Watchlist', icon: Star },
  { to: '/portfolio', label: 'Portfolio', icon: BriefcaseBusiness }
];
const analysis = [
  { to: '/technical-analysis', label: 'Technical analysis', icon: ChartNoAxesCombined },
  { to: '/compare', label: 'Compare stocks', icon: GitCompareArrows },
  { to: '/news', label: 'Market news', icon: BookOpen },
  { to: '/alerts', label: 'Price alerts', icon: Bell }
];

export default function Sidebar({ collapsed, onToggle, open, onClose }) {
  return <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${open ? 'open' : ''}`}>
    <div className="brand"><div className="brand-mark"><Activity size={18} /></div><span>Stock<span>Pulse</span></span><button className="mobile-close" onClick={onClose} aria-label="Close navigation"><X size={18} /></button></div>
    <div className="sidebar-group"><p className="nav-label">Workspace</p>{primary.map((item) => <SidebarLink key={item.to} {...item} />)}</div>
    <div className="sidebar-group"><p className="nav-label">Research</p>{analysis.map((item) => <SidebarLink key={item.to} {...item} />)}</div>
    <div className="sidebar-bottom"><SidebarLink to="/settings" label="Settings" icon={Settings} /><button className="collapse-button" onClick={onToggle} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>{collapsed ? <ChevronRight size={17} /> : <><ChevronLeft size={17} /><span>Collapse menu</span></>}</button></div>
  </aside>;
}

function SidebarLink({ to, label, icon: Icon, end }) { return <NavLink to={to} end={end} className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><Icon size={18} /><span>{label}</span></NavLink>; }
