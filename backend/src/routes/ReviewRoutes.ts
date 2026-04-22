import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { CommentController } from '../controllers/CommentController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { adicionarReviewSchema, listarReviewsSchema, reviewIdParamSchema, usernameParamSchema } from '../schemas/ReviewSchema';
import { adicionarComentarioSchema, commentIdParamSchema } from '../schemas/CommentSchema';

const router = Router();

router.get('/:id_igdb', validate(listarReviewsSchema), ReviewController.listarReviews);
router.get('/usuario/:username', validate(usernameParamSchema), ReviewController.listarReviewsDoUsuario);
router.get('/:reviewId/comentarios', validate(reviewIdParamSchema), CommentController.listarComentarios);
router.post('/:id_igdb', authMiddleware, validate(adicionarReviewSchema), ReviewController.criarReview);
router.post('/:reviewId/like', authMiddleware, validate(reviewIdParamSchema), ReviewController.toggleLike);
router.post('/:reviewId/comentarios', authMiddleware, validate(adicionarComentarioSchema), CommentController.adicionarComentario);
router.post('/comentarios/:commentId/like', authMiddleware, validate(commentIdParamSchema), CommentController.toggleLike);
router.delete('/:id_igdb', authMiddleware, validate(listarReviewsSchema), ReviewController.deletarReview);
router.delete('/comentarios/:commentId', authMiddleware, validate(commentIdParamSchema), CommentController.deletarComentario);

export default router;