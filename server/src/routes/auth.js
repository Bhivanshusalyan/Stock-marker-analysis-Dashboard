import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import User from '../models/User.js';
import { requireAuth, signToken } from '../middleware/auth.js';

const router = Router();
const credentials = z.object({ name: z.string().trim().min(2).max(80).optional(), email: z.string().email().transform((value) => value.toLowerCase()), password: z.string().min(8).max(100) });

router.post('/register', async (req, res) => { const values = credentials.extend({ name: z.string().trim().min(2).max(80) }).parse(req.body); const exists = await User.findOne({ email: values.email }); if (exists) return res.status(409).json({ message: 'An account with this email already exists' }); const passwordHash = await bcrypt.hash(values.password, 12); const user = await User.create({ name: values.name, email: values.email, passwordHash }); return res.status(201).json({ token: signToken(user.id), user: { id: user.id, name: user.name, email: user.email } }); });
router.post('/login', async (req, res) => { const values = credentials.omit({ name: true }).parse(req.body); const user = await User.findOne({ email: values.email }).select('+passwordHash'); if (!user || !(await bcrypt.compare(values.password, user.passwordHash))) return res.status(401).json({ message: 'Email or password is incorrect' }); return res.json({ token: signToken(user.id), user: { id: user.id, name: user.name, email: user.email } }); });
router.get('/me', requireAuth, (req, res) => res.json({ user: { id: req.user.id, name: req.user.name, email: req.user.email } }));
export default router;
