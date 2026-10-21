import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Stocks from './pages/Stocks';
import StockDetails from './pages/StockDetails';
import TechnicalAnalysis from './pages/TechnicalAnalysis';
import Watchlist from './pages/Watchlist';
import Portfolio from './pages/Portfolio';
import Compare from './pages/Compare';
import News from './pages/News';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import Auth from './pages/Auth';

export default function App() {
  return <Routes><Route element={<Layout />}><Route path="/" element={<Dashboard />} /><Route path="/stocks" element={<Stocks />} /><Route path="/stocks/:symbol" element={<StockDetails />} /><Route path="/technical-analysis" element={<TechnicalAnalysis />} /><Route path="/watchlist" element={<Watchlist />} /><Route path="/portfolio" element={<Portfolio />} /><Route path="/compare" element={<Compare />} /><Route path="/news" element={<News />} /><Route path="/alerts" element={<Alerts />} /><Route path="/settings" element={<Settings />} /></Route><Route path="/login" element={<Auth mode="login" />} /><Route path="/register" element={<Auth mode="register" />} /><Route path="*" element={<Navigate to="/" replace />} /></Routes>;
}
