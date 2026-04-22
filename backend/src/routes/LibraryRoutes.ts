import { Router } from 'express';
import { LibraryController } from '../controllers/LibraryController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { adicionarJogoBibliotecaSchema, atualizarStatusJogoSchema, removerJogoBibliotecaSchema } from '../schemas/LibrarySchema';
import { usernameParamSchema } from '../schemas/ReviewSchema'; // Reutilizando do ReviewSchema

const router = Router();

// A requisição bate na rota -> passa pela segurança (authMiddleware) -> chega no Controller
router.post('/', authMiddleware, validate(adicionarJogoBibliotecaSchema), LibraryController.adicionarJogo);
router.get('/:username', validate(usernameParamSchema), LibraryController.listarJogos);
router.put('/:id_igdb', authMiddleware, validate(atualizarStatusJogoSchema), LibraryController.atualizarStatus);
router.delete('/:id_igdb', authMiddleware, validate(removerJogoBibliotecaSchema), LibraryController.removerJogo);

export default router;