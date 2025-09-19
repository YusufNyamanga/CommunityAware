import { Router } from 'express';
import { aiController } from '../controllers/aiController';
import { authMiddleware } from '../middleware/auth';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/chat', authMiddleware, rateLimiter, aiController.handleChat);

export default router;
