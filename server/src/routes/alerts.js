import { Router } from 'express';
import { z } from 'zod';
import PriceAlert from '../models/PriceAlert.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
router.use(requireAuth);
const alertShape = z.object({ symbol: z.string().trim().min(1).max(20), condition: z.enum(['above', 'below']), target: z.number().positive() });
router.get('/', async (req, res) => res.json({ alerts: await PriceAlert.find({ user: req.user.id }).sort({ createdAt: -1 }) }));
router.post('/', async (req, res) => { const values = alertShape.parse(req.body); const alert = await PriceAlert.create({ ...values, symbol: values.symbol.toUpperCase(), user: req.user.id }); return res.status(201).json({ alert }); });
router.patch('/:id', async (req, res) => { const values = alertShape.partial().parse(req.body); const alert = await PriceAlert.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, values, { new: true, runValidators: true }); if (!alert) return res.status(404).json({ message: 'Alert not found' }); return res.json({ alert }); });
router.delete('/:id', async (req, res) => { await PriceAlert.deleteOne({ _id: req.params.id, user: req.user.id }); return res.status(204).send(); });
export default router;
