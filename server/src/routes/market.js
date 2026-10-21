import { Router } from 'express';
import { marketProvider, providerMeta } from '../services/marketData/index.js';

const router = Router();
router.get('/overview', async (_req, res) => res.json({ ...(await marketProvider.overview()), ...providerMeta, timestamp: new Date().toISOString() }));
router.get('/movers', async (_req, res) => { const overview = await marketProvider.overview(); return res.json({ movers: overview.movers, ...providerMeta, timestamp: new Date().toISOString() }); });
export default router;
