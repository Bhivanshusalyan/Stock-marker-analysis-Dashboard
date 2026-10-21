import { Router } from 'express';
import { getNews } from '../services/news.js';

const router = Router();
router.get('/', async (_req, res) => res.json(await getNews()));
export default router;
