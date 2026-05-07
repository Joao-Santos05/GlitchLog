import { Router } from 'express';
import { GameController } from '../controllers/GameController';
import { validate } from '../middlewares/ValidationMiddleware';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { buscarJogoSchema, buscarDetalhesPorIdSchema } from '../schemas/GameSchema';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Jogos
 *   description: Integração com IGDB e Descoberta
 */

/**
 * @swagger
 * /api/jogos/trending:
 *   get:
 *     summary: Lista jogos populares na Twitch/IGDB
 *     tags: [Jogos]
 *     responses:
 *       200:
 *         description: Lista de jogos em alta
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/trending', GameController.getTrendingGames);

/**
 * @swagger
 * /api/jogos/discover:
 *   get:
 *     summary: Descobre jogos baseados no perfil do usuário
 *     tags: [Jogos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jogos recomendados (Fallback Cascata)
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/discover', authMiddleware, GameController.discoverGames);

/**
 * @swagger
 * /api/jogos/buscar:
 *   get:
 *     summary: Busca jogos por nome, gênero e/minRating
 *     tags: [Jogos]
 *     parameters:
 *       - in: query
 *         name: nome
 *         schema:
 *           type: string
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Resultados da busca
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/buscar', validate(buscarJogoSchema), GameController.buscarJogo);

/**
 * @swagger
 * /api/jogos/{id}:
 *   get:
 *     summary: Retorna detalhes completos de um jogo
 *     tags: [Jogos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do jogo (Salvo no BD local)
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', validate(buscarDetalhesPorIdSchema), GameController.buscarDetalhesPorId);

export default router;