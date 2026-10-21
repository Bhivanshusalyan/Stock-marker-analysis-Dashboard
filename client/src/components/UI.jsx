import { ArrowDownRight, ArrowUpRight, Check, Info, LoaderCircle, Search, X } from 'lucide-react';

export function Card({ children, className = '', ...props }) { return <section className={`card ${className}`} {...props}>{children}</section>; }

export function SectionTitle({ eyebrow, title, action }) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{action}</div>;
}

export function Change({ value, positive, size = 'normal' }) {
  const isPositive = positive ?? Number.parseFloat(String(value).replace('%', '')) >= 0;
  return <span className={`change ${isPositive ? 'positive' : 'negative'} ${size}`}>
    {isPositive ? <ArrowUpRight size={size === 'small' ? 13 : 15} /> : <ArrowDownRight size={size === 'small' ? 13 : 15} />}{value}
  </span>;
}

export function StatusPill({ children, tone = 'neutral', dot = false }) { return <span className={`status-pill ${tone}`}>{dot && <i />} {children}</span>; }

export function DataSource({ isDemo = false, source = 'Market provider', timestamp = 'Last available snapshot' }) {
  return <div className="data-source"><Info size={14} /><span>{isDemo ? 'Demo snapshot' : source} · {timestamp}</span></div>;
}

export function EmptyState({ icon: Icon = Search, title, copy, action }) {
  return <div className="empty-state"><Icon size={28} /><h3>{title}</h3><p>{copy}</p>{action}</div>;
}

export function LoadingState({ label = 'Loading market data…' }) { return <div className="loading-state"><LoaderCircle className="spin" size={22} /><span>{label}</span></div>; }

export function Toast({ message, onClose }) { return <div className="toast"><Check size={15} />{message}<button onClick={onClose} aria-label="Dismiss"><X size={15} /></button></div>; }

export function SearchField({ value, onChange, placeholder = 'Search stocks…' }) { return <label className="search-field"><Search size={17} /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} aria-label={placeholder} /></label>; }
