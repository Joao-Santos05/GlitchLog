import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

router.post('/', UserController.criarUsuario);
router.post('/login', UserController.login);
router.get('/', authMiddleware, UserController.listarUsuarios);
router.delete('/', authMiddleware, UserController.excluirUsuario);

export default router;