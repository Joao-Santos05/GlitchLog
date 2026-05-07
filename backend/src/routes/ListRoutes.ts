import { Router } from 'express';
import { ListController } from '../controllers/ListController';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { createListSchema, updateListSchema, addGamesToListSchema } from '../schemas/ListSchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Listas
 *   description: Listas personalizadas de jogos e sugestões
 */

/**
 * @swagger
 * /api/listas/minhas:
 *   get:
 *     summary: Lista todas as listas do usuário logado
 *     tags: [Listas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Coleção de listas
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/minhas', authMiddleware, ListController.getMyLists);

/**
 * @swagger
 * /api/listas/popular:
 *   get:
 *     summary: Retorna as listas públicas mais populares
 *     tags: [Listas]
 *     responses:
 *       200:
 *         description: Listas populares
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/popular', optionalAuthMiddleware, ListController.getPopularLists);

/**
 * @swagger
 * /api/listas/usuario/{username}:
 *   get:
 *     summary: Lista as listas públicas de um usuário
 *     tags: [Listas]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coleção de listas do usuário
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/usuario/:username', optionalAuthMiddleware, ListController.getUserLists);

/**
 * @swagger
 * /api/listas/{id}:
 *   get:
 *     summary: Retorna os detalhes de uma lista e seus jogos
 *     tags: [Listas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da lista
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id', optionalAuthMiddleware, ListController.getListById);

/**
 * @swagger
 * /api/listas/{id}/suggest:
 *   get:
 *     summary: Sugere jogos para a lista baseado no algoritmo similar_games
 *     tags: [Listas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Top 10 jogos sugeridos
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:id/suggest', optionalAuthMiddleware, ListController.suggestGames);

/**
 * @swagger
 * /api/listas:
 *   post:
 *     summary: Cria uma nova lista
 *     tags: [Listas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               summary:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Lista criada
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, validate(createListSchema), ListController.createList);

/**
 * @swagger
 * /api/listas/{id}/jogos:
 *   post:
 *     summary: Adiciona jogos a uma lista existente
 *     tags: [Listas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               games:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_igdb:
 *                       type: integer
 *                     ordem:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Jogos adicionados
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:id/jogos', authMiddleware, validate(addGamesToListSchema), ListController.addGamesToList);

/**
 * @swagger
 * /api/listas/{id}:
 *   put:
 *     summary: Atualiza os dados de uma lista
 *     tags: [Listas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
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
 *               title:
 *                 type: string
 *               summary:
 *                 type: string
 *               isPublic:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Lista atualizada
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id', authMiddleware, validate(updateListSchema), ListController.updateList);

/**
 * @swagger
 * /api/listas/{id}:
 *   delete:
 *     summary: Deleta uma lista
 *     tags: [Listas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista deletada
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id', authMiddleware, ListController.deleteList);

/**
 * @swagger
 * /api/listas/{id}/jogos/{id_igdb}:
 *   delete:
 *     summary: Remove um jogo específico de uma lista
 *     tags: [Listas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: id_igdb
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jogo removido da lista
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id/jogos/:id_igdb', authMiddleware, ListController.removeGameFromList);

export default router;
