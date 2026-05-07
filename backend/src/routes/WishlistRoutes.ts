import { Router } from 'express';
import { WishlistController } from '../controllers/WishlistController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { optionalAuthMiddleware } from '../middlewares/optionalAuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { adicionarWishlistSchema, listarWishlistSchema, removerWishlistSchema } from '../schemas/WishlistSchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: Gerenciamento da lista de desejos (Wishlist)
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Adiciona um jogo à wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_igdb:
 *                 type: integer
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Jogo adicionado à wishlist
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, validate(adicionarWishlistSchema), WishlistController.adicionarJogo);

/**
 * @swagger
 * /api/wishlist/{username}:
 *   get:
 *     summary: Lista a wishlist de um usuário
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de jogos na wishlist
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:username', optionalAuthMiddleware, validate(listarWishlistSchema), WishlistController.listarWishlist);

/**
 * @swagger
 * /api/wishlist/{id_igdb}:
 *   delete:
 *     summary: Remove um jogo da wishlist
 *     tags: [Wishlist]
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
 *         description: Jogo removido da wishlist
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id_igdb', authMiddleware, validate(removerWishlistSchema), WishlistController.removerJogo);

export default router;
