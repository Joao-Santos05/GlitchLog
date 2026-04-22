import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { criarUsuarioSchema, loginSchema, atualizarPerfilSchema, buscarPerfilPublicoSchema } from '../schemas/UserSchema';

const router = Router();

router.post('/cadastrar', validate(criarUsuarioSchema), UserController.criarUsuario);
router.post('/login', validate(loginSchema), UserController.login);
router.delete('/', authMiddleware, UserController.excluirUsuario);
router.get('/', UserController.listarUsuarios); 
router.get('/perfil', authMiddleware, UserController.meuPerfil);
router.put('/perfil', authMiddleware, validate(atualizarPerfilSchema), UserController.atualizarPerfil);
router.get('/:username', validate(buscarPerfilPublicoSchema), UserController.buscarPerfilPublico);

export default router;