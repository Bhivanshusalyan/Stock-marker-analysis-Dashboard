import { Router } from 'express';
import { z } from 'zod';
import Watchlist from '../models/Watchlist.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/', async (req, res) => { const watchlist = await Watchlist.findOne({ user: req.user.id }); return res.json({ symbols: watchlist?.symbols || [] }); });
router.post('/', async (req, res) => { const { symbol } = z.object({ symbol: z.string().trim().min(1).max(20) }).parse(req.body); const watchlist = await Watchlist.findOneAndUpdate({ user: req.user.id }, { $addToSet: { symbols: symbol.toUpperCase() } }, { upsert: true, new: true, setDefaultsOnInsert: true }); return res.status(201).json({ symbols: watchlist.symbols }); });
router.delete('/:symbol', async (req, res) => { const watchlist = await Watchlist.findOneAndUpdate({ user: req.user.id }, { $pull: { symbols: req.params.symbol.toUpperCase() } }, { new: true }); return res.json({ symbols: watchlist?.symbols || [] }); });
export default router;
