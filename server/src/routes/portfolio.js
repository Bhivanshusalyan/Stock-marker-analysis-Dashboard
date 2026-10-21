import { Router } from 'express';
import { z } from 'zod';
import PortfolioTransaction from '../models/PortfolioTransaction.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
router.get('/', async (req, res) => res.json({ transactions: await PortfolioTransaction.find({ user: req.user.id }).sort({ tradeDate: -1 }) }));
router.post('/transactions', async (req, res) => { const values = z.object({ type: z.enum(['buy', 'sell']), symbol: z.string().trim().min(1).max(20), quantity: z.number().positive(), price: z.number().nonnegative(), tradeDate: z.coerce.date() }).parse(req.body); const transaction = await PortfolioTransaction.create({ ...values, symbol: values.symbol.toUpperCase(), user: req.user.id }); return res.status(201).json({ transaction }); });
router.delete('/transactions/:id', async (req, res) => { await PortfolioTransaction.deleteOne({ _id: req.params.id, user: req.user.id }); return res.status(204).send(); });
export default router;
