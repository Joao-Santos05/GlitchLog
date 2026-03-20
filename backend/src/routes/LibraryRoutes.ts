import { Router } from 'express';
import { LibraryController } from '../controllers/LibraryController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();

// A requisição bate na rota -> passa pela segurança (authMiddleware) -> chega no Controller
router.post('/', authMiddleware, LibraryController.adicionarJogo);
router.get('/:username', LibraryController.listarJogos);
router.put('/:id_igdb', authMiddleware, LibraryController.atualizarStatus);
router.delete('/:id_igdb', authMiddleware, LibraryController.removerJogo);

export default router;