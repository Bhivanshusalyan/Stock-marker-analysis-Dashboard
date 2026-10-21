import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export function databaseRequired(_req, res, next) { if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'MongoDB is not connected. Guest mode remains available in the client.' }); return next(); }

export async function requireAuth(req, res, next) {
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ message: 'Authentication requires MongoDB. Continue in guest mode or configure MONGODB_URI.' });
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Authentication required' });
  try { const payload = jwt.verify(token, env.jwtSecret); const user = await User.findById(payload.sub); if (!user) return res.status(401).json({ message: 'User account not found' }); req.user = user; return next(); } catch { return res.status(401).json({ message: 'Invalid or expired token' }); }
}

export function signToken(userId) { return jwt.sign({ sub: userId }, env.jwtSecret, { expiresIn: '7d' }); }
