import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/cadastrar', UserController.criarUsuario);
router.post('/login', UserController.login);
router.delete('/', authMiddleware, UserController.excluirUsuario);
router.get('/', UserController.listarUsuarios); 
router.get('/perfil', authMiddleware, UserController.meuPerfil);
router.put('/perfil', authMiddleware, UserController.atualizarPerfil);
router.get('/:username', UserController.buscarPerfilPublico);

export default router;