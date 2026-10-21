import { env } from '../config/env.js';
import { demoNews } from '../data/demoMarket.js';

export async function getNews() {
  if (!env.newsApiUrl || !env.newsApiKey) return { news: demoNews, provider: 'Configured external links', isDemo: true, timestamp: 'Configure NEWS_API_URL and NEWS_API_KEY' };
  const url = new URL(env.newsApiUrl); url.searchParams.set('token', env.newsApiKey); url.searchParams.set('q', 'India stocks OR Indian markets');
  const response = await fetch(url); if (!response.ok) throw new Error(`News provider returned ${response.status}`); const payload = await response.json();
  const articles = (payload.articles || payload.results || []).map((article, index) => ({ id: article.id || index, title: article.title, source: article.source?.name || article.source || 'External publisher', time: article.publishedAt || article.pubDate, tag: 'MARKETS', tone: 'blue', url: article.url || article.link })).filter((article) => article.title && article.url);
  return { news: articles, provider: 'Configured news provider', isDemo: false, timestamp: new Date().toISOString() };
}
