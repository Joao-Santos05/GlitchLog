import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/', authMiddleware, NotificationController.getNotifications);
router.put('/ler', authMiddleware, NotificationController.markAsRead);

export default router;
