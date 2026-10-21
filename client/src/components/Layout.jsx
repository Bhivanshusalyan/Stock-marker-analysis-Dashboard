import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  return <div className="app-shell"><Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} open={mobileOpen} onClose={() => setMobileOpen(false)} /><div className={`main-shell ${collapsed ? 'sidebar-collapsed' : ''}`}><Topbar onMenu={() => setMobileOpen(true)} /><main className="page-content" key={location.pathname}><Outlet /></main><footer className="app-footer"><span>StockPulse · Research workspace</span><span>Data shown is delayed, provider-backed, or explicitly marked as demo.</span></footer></div>{mobileOpen && <button className="mobile-backdrop" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}</div>;
}
