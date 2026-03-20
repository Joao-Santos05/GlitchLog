import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/:id_igdb', ReviewController.listarReviews);
router.post('/:id_igdb', authMiddleware, ReviewController.criarReview);
router.delete('/:id_igdb', authMiddleware, ReviewController.deletarReview);

export default router;