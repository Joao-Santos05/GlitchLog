import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/:id_igdb', ReviewController.listarReviews);
router.get('/usuario/:username', ReviewController.listarReviewsDoUsuario);
router.post('/:id_igdb', authMiddleware, ReviewController.criarReview);
router.post('/:reviewId/like', authMiddleware, ReviewController.toggleLike);
router.delete('/:id_igdb', authMiddleware, ReviewController.deletarReview);

export default router;