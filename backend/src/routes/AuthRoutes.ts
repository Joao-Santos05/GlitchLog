import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middlewares/ValidationMiddleware';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { forgotPasswordSchema, resetPasswordSchema, enable2FASchema } from '../schemas/AuthSchema';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticação avançada e 2FA
 */

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     summary: Solicitar recuperação de senha
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Se o e-mail existir, um link de recuperação foi enviado.
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/forgot-password', validate(forgotPasswordSchema), AuthController.forgotPassword);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Redefinir a senha
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso.
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/reset-password', validate(resetPasswordSchema), AuthController.resetPassword);

/**
 * @swagger
 * /api/auth/2fa/generate:
 *   post:
 *     summary: Gerar segredo e QR Code para 2FA
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Segredo gerado com sucesso
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/2fa/generate', authMiddleware, AuthController.generate2FA);

/**
 * @swagger
 * /api/auth/2fa/enable:
 *   post:
 *     summary: Ativar autenticação de dois fatores (2FA)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Código OTP gerado pelo aplicativo
 *     responses:
 *       200:
 *         description: 2FA ativada com sucesso.
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/2fa/enable', authMiddleware, validate(enable2FASchema), AuthController.enable2FA);

export default router;
