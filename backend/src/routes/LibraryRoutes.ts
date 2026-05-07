import { Router } from 'express';
import { LibraryController } from '../controllers/LibraryController';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { adicionarJogoBibliotecaSchema, atualizarStatusJogoSchema, removerJogoBibliotecaSchema, listarJogosSchema } from '../schemas/LibrarySchema';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Biblioteca
 *   description: Gerenciamento da biblioteca pessoal de jogos
 */

/**
 * @swagger
 * /api/biblioteca:
 *   post:
 *     summary: Adiciona um jogo à biblioteca
 *     tags: [Biblioteca]
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
 *               status:
 *                 type: string
 *                 enum: [JOGANDO, FINALIZADO, ABANDONADO]
 *     responses:
 *       201:
 *         description: Jogo adicionado à biblioteca
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', authMiddleware, validate(adicionarJogoBibliotecaSchema), LibraryController.adicionarJogo);

/**
 * @swagger
 * /api/biblioteca/{username}:
 *   get:
 *     summary: Lista a biblioteca de um usuário
 *     tags: [Biblioteca]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: minRating
 *         schema:
 *           type: number
 *       - in: query
 *         name: genre
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de jogos da biblioteca
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:username', optionalAuthMiddleware, validate(listarJogosSchema), LibraryController.listarJogos);

/**
 * @swagger
 * /api/biblioteca/{username}/diary:
 *   get:
 *     summary: Lista jogos finalizados para o diário (Diary)
 *     tags: [Biblioteca]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de jogos finalizados
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:username/diary', optionalAuthMiddleware, validate(listarJogosSchema), LibraryController.listarDiary);

/**
 * @swagger
 * /api/biblioteca/{id_igdb}:
 *   put:
 *     summary: Atualiza o status de um jogo na biblioteca
 *     tags: [Biblioteca]
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
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Status atualizado
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id_igdb', authMiddleware, validate(atualizarStatusJogoSchema), LibraryController.atualizarStatus);

/**
 * @swagger
 * /api/biblioteca/{id_igdb}:
 *   delete:
 *     summary: Remove um jogo da biblioteca
 *     tags: [Biblioteca]
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
 *         description: Jogo removido
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/:id_igdb', authMiddleware, validate(removerJogoBibliotecaSchema), LibraryController.removerJogo);

export default router;