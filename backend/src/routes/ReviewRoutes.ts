import { Router } from 'express';
import { ReviewController } from '../controllers/ReviewController';
import { CommentController } from '../controllers/CommentController';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { adicionarReviewSchema, listarReviewsSchema, reviewIdParamSchema, usernameParamSchema } from '../schemas/ReviewSchema';
import { adicionarComentarioSchema, commentIdParamSchema } from '../schemas/CommentSchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Avaliações, comentários e curtidas
 */

/**
 * @swagger
 * /api/reviews/friends:
 *   get:
 *     summary: Lista reviews recentes de amigos (Deep Join)
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reviews dos amigos
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/friends', authMiddleware, ReviewController.listarReviewsDeAmigos);
/**
 * @swagger
 * /api/reviews/popular/month:
 *   get:
 *     summary: Lista as reviews mais curtidas do mês
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Lista de reviews populares
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/popular/month', ReviewController.listarReviewsPopularesDoMes);
/**
 * @swagger
 * /api/reviews/{id_igdb}:
 *   get:
 *     summary: Lista as reviews de um jogo específico
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id_igdb
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de reviews
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id_igdb', validate(listarReviewsSchema), ReviewController.listarReviews);

/**
 * @swagger
 * /api/reviews/usuario/{username}:
 *   get:
 *     summary: Lista todas as reviews feitas por um usuário
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de reviews do usuário
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/usuario/:username', optionalAuthMiddleware, validate(usernameParamSchema), ReviewController.listarReviewsDoUsuario);
/**
 * @swagger
 * /api/reviews/{reviewId}/comentarios:
 *   get:
 *     summary: Lista os comentários de uma review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comentários
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:reviewId/comentarios', validate(reviewIdParamSchema), CommentController.listarComentarios);

/**
 * @swagger
 * /api/reviews/{id_igdb}:
 *   post:
 *     summary: Cria uma nova review para um jogo
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_igdb
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota:
 *                 type: number
 *               reviewText:
 *                 type: string
 *     responses:
 *       201:
 *         description: Review criada com sucesso
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:id_igdb', authMiddleware, validate(adicionarReviewSchema), ReviewController.criarReview);
/**
 * @swagger
 * /api/reviews/{reviewId}/like:
 *   post:
 *     summary: Curte ou descurte uma review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curtida adicionada/removida
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:reviewId/like', authMiddleware, validate(reviewIdParamSchema), ReviewController.toggleLike);

/**
 * @swagger
 * /api/reviews/{reviewId}/comentarios:
 *   post:
 *     summary: Adiciona um comentário a uma review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentário adicionado
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:reviewId/comentarios', authMiddleware, validate(adicionarComentarioSchema), CommentController.adicionarComentario);

/**
 * @swagger
 * /api/reviews/comentarios/{commentId}/like:
 *   post:
 *     summary: Curte ou descurte um comentário
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curtida adicionada/removida
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/comentarios/:commentId/like', authMiddleware, validate(commentIdParamSchema), CommentController.toggleLike);

/**
 * @swagger
 * /api/reviews/{id_igdb}:
 *   delete:
 *     summary: Deleta a review do próprio usuário
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id_igdb
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Review deletada
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id_igdb', authMiddleware, validate(listarReviewsSchema), ReviewController.deletarReview);

/**
 * @swagger
 * /api/reviews/comentarios/{commentId}:
 *   delete:
 *     summary: Deleta o comentário do próprio usuário
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentário deletado
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/comentarios/:commentId', authMiddleware, validate(commentIdParamSchema), CommentController.deletarComentario);

export default router;