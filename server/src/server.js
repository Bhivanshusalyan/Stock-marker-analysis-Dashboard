import mongoose from 'mongoose';
import app from './app.js';
import { env } from './config/env.js';
import { marketProvider } from './services/marketData/index.js';

if (env.mongoUri) {
  mongoose.connect(env.mongoUri).then(() => console.log('MongoDB connected')).catch((error) => console.warn(`MongoDB unavailable: ${error.message}`));
} else console.warn('MONGODB_URI not configured; authenticated writes are disabled and guest mode remains available.');

app.listen(env.port, () => console.log(`StockPulse API listening on http://localhost:${env.port} (${marketProvider.name})`));
