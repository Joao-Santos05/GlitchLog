import { Router } from 'express';
import { LibraryController } from '../controllers/LibraryController';
import { authMiddleware, optionalAuthMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { adicionarJogoBibliotecaSchema, atualizarStatusJogoSchema, removerJogoBibliotecaSchema, listarJogosSchema } from '../schemas/LibrarySchema';

const router = Router();

// A requisição bate na rota -> passa pela segurança (authMiddleware) -> chega no Controller
router.post('/', authMiddleware, validate(adicionarJogoBibliotecaSchema), LibraryController.adicionarJogo);
router.get('/:username', optionalAuthMiddleware, validate(listarJogosSchema), LibraryController.listarJogos);
router.put('/:id_igdb', authMiddleware, validate(atualizarStatusJogoSchema), LibraryController.atualizarStatus);
router.delete('/:id_igdb', authMiddleware, validate(removerJogoBibliotecaSchema), LibraryController.removerJogo);

export default router;