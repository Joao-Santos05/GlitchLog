import { Router } from 'express';
import { FavoriteController } from '../controllers/FavoriteController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { adicionarFavoritoSchema } from '../schemas/FavoriteSchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Gerenciamento de jogos favoritos (Slots 1-4)
 */

/**
 * @swagger
 * /api/favoritos:
 *   post:
 *     summary: Define um jogo como favorito num slot
 *     tags: [Favoritos]
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
 *               slot:
 *                 type: integer
 *                 description: De 1 a 4
 *     responses:
 *       200:
 *         description: Favorito salvo com sucesso
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, validate(adicionarFavoritoSchema), FavoriteController.definirFavorito);

export default router;