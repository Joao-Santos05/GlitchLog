import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { criarUsuarioSchema, loginSchema, atualizarPerfilSchema, buscarPerfilPublicoSchema, alterarSenhaSchema } from '../schemas/UserSchema';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Gerenciamento de usuários
 */

/**
 * @swagger
 * /api/usuarios/cadastrar:
 *   post:
 *     summary: Cadastrar um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/cadastrar', validate(criarUsuarioSchema), UserController.criarUsuario);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Fazer login
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               token2fa:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       403:
 *         description: 2FA_REQUIRED (Exige código 2FA)
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/login', validate(loginSchema), UserController.login);

/**
 * @swagger
 * /api/usuarios/:
 *   delete:
 *     summary: Excluir a própria conta
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.delete('/', authMiddleware, UserController.excluirUsuario);

/**
 * @swagger
 * /api/usuarios/:
 *   get:
 *     summary: Listar todos os usuários (Admin/Dev)
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/', UserController.listarUsuarios); 

/**
 * @swagger
 * /api/usuarios/perfil:
 *   get:
 *     summary: Visualizar o próprio perfil
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do perfil
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/perfil', authMiddleware, UserController.meuPerfil);

/**
 * @swagger
 * /api/usuarios/perfil:
 *   put:
 *     summary: Atualizar o próprio perfil
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *     responses:
 *       200:
 *         description: Perfil atualizado
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/perfil', authMiddleware, validate(atualizarPerfilSchema), UserController.atualizarPerfil);

/**
 * @swagger
 * /api/usuarios/logout:
 *   post:
 *     summary: Fazer logout (Placeholder)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout realizado com sucesso
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/logout', authMiddleware, UserController.logout);

/**
 * @swagger
 * /api/usuarios/alterar-senha:
 *   put:
 *     summary: Alterar a senha logada
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senhaAtual:
 *                 type: string
 *               novaSenha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/alterar-senha', authMiddleware, validate(alterarSenhaSchema), UserController.alterarSenha);

/**
 * @swagger
 * /api/usuarios/{username}:
 *   get:
 *     summary: Buscar o perfil público de um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dados públicos do perfil
 *       400:
 *         description: Requisição inválida (Erro de validação ou regras de negócio)
 *       401:
 *         description: Não autorizado (Token ausente ou inválido)
 *       404:
 *         description: Recurso não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.get('/:username', optionalAuthMiddleware, validate(buscarPerfilPublicoSchema), UserController.buscarPerfilPublico);

export default router;