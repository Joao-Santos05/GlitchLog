import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { adicionarFavoritoSchema } from '../schemas/FavoriteSchema';

const router = Router();

router.post('/', authMiddleware, validate(adicionarFavoritoSchema), FavoriteController.definirFavorito);

export default router;