import { Router } from 'express';
import { FollowController } from '../controllers/FollowController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { toggleFollowSchema } from '../schemas/FollowSchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Seguidores
 *   description: Sistema de Follow/Unfollow
 */

/**
 * @swagger
 * /api/seguidores/{username}/toggle:
 *   post:
 *     summary: Segue ou deixa de seguir um usuário
 *     tags: [Seguidores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operação realizada
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:username/toggle', authMiddleware, validate(toggleFollowSchema), FollowController.toggleFollow);

/**
 * @swagger
 * /api/seguidores/{username}/followers:
 *   get:
 *     summary: Lista quem segue este usuário
 *     tags: [Seguidores]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de seguidores
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:username/followers', validate(toggleFollowSchema), FollowController.getFollowers);

/**
 * @swagger
 * /api/seguidores/{username}/following:
 *   get:
 *     summary: Lista quem este usuário segue
 *     tags: [Seguidores]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de pessoas que o usuário segue
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:username/following', validate(toggleFollowSchema), FollowController.getFollowing);

export default router;
