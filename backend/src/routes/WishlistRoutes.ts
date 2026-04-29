import { Router } from 'express';
import { WishlistController } from '../controllers/WishlistController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { optionalAuthMiddleware } from '../middlewares/optionalAuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { adicionarWishlistSchema, listarWishlistSchema, removerWishlistSchema } from '../schemas/WishlistSchema';

const router = Router();

router.post('/', authMiddleware, validate(adicionarWishlistSchema), WishlistController.adicionarJogo);
router.get('/:username', optionalAuthMiddleware, validate(listarWishlistSchema), WishlistController.listarWishlist);
router.delete('/:id_igdb', authMiddleware, validate(removerWishlistSchema), WishlistController.removerJogo);

export default router;
