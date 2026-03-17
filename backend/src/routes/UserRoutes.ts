import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();

router.post('/', UserController.criarUsuario);
router.post('/login', UserController.login);
router.get('/', UserController.listarUsuarios);

export default router;