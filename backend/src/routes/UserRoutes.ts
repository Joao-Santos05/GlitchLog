import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { criarUsuarioSchema, loginSchema, atualizarPerfilSchema, buscarPerfilPublicoSchema, alterarSenhaSchema } from '../schemas/UserSchema';

const router = Router();

router.post('/cadastrar', validate(criarUsuarioSchema), UserController.criarUsuario);
router.post('/login', validate(loginSchema), UserController.login);
router.delete('/', authMiddleware, UserController.excluirUsuario);
router.get('/', UserController.listarUsuarios); 
router.get('/perfil', authMiddleware, UserController.meuPerfil);
router.put('/perfil', authMiddleware, validate(atualizarPerfilSchema), UserController.atualizarPerfil);
router.post('/logout', authMiddleware, UserController.logout);
router.put('/alterar-senha', authMiddleware, validate(alterarSenhaSchema), UserController.alterarSenha);
router.get('/:username', optionalAuthMiddleware, validate(buscarPerfilPublicoSchema), UserController.buscarPerfilPublico);

export default router;