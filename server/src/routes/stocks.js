import { Router } from 'express';
import { marketProvider, providerMeta } from '../services/marketData/index.js';

const router = Router();
router.get('/search', async (req, res) => res.json({ stocks: await marketProvider.search(String(req.query.q || '')), ...providerMeta, timestamp: new Date().toISOString() }));
router.get('/:symbol/history', async (req, res) => res.json({ history: await marketProvider.history(req.params.symbol), ...providerMeta, timestamp: new Date().toISOString() }));
router.get('/:symbol', async (req, res) => res.json({ stock: await marketProvider.quote(req.params.symbol), ...providerMeta, timestamp: new Date().toISOString() }));
export default router;
