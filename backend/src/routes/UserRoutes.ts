import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', UserController.criarUsuario);
router.post('/login', UserController.login);
router.delete('/', authMiddleware, UserController.excluirUsuario);
router.get('/', UserController.listarUsuarios); 
router.get('/:username', UserController.buscarPerfilPublico);
router.get('/perfil', authMiddleware, UserController.meuPerfil);
router.put('/perfil', authMiddleware, UserController.atualizarPerfil);

export default router;