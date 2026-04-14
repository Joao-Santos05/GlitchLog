import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', authMiddleware, FavoriteController.definirFavorito);

export default router;