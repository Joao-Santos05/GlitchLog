import { Router } from 'express';
import { NotificationController } from '../controllers/NotificationController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Notificações
 *   description: Notificações do sistema
 */

/**
 * @swagger
 * /api/notificacoes:
 *   get:
 *     summary: Lista as notificações do usuário logado
 *     tags: [Notificações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de notificações
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', authMiddleware, NotificationController.getNotifications);

/**
 * @swagger
 * /api/notificacoes/ler:
 *   put:
 *     summary: Marca notificações como lidas (pode receber IDs em lote)
 *     tags: [Notificações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notificationIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Notificações marcadas como lidas
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/ler', authMiddleware, NotificationController.markAsRead);

export default router;
