import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { CommentController } from '../controllers/CommentController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.get('/:id_igdb', ReviewController.listarReviews);
router.get('/usuario/:username', ReviewController.listarReviewsDoUsuario);
router.get('/:reviewId/comentarios', CommentController.listarComentarios);
router.post('/:id_igdb', authMiddleware, ReviewController.criarReview);
router.post('/:reviewId/like', authMiddleware, ReviewController.toggleLike);
router.post('/:reviewId/comentarios', authMiddleware, CommentController.adicionarComentario);
router.post('/comentarios/:commentId/like', authMiddleware, CommentController.toggleLike);
router.delete('/:id_igdb', authMiddleware, ReviewController.deletarReview);
router.delete('/comentarios/:commentId', authMiddleware, CommentController.deletarComentario);

export default router;