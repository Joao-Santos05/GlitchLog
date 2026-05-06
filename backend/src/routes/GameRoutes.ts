import { Router } from 'express';
import { GameController } from '../controllers/GameController';
import { validate } from '../middlewares/ValidationMiddleware';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { buscarJogoSchema, buscarDetalhesPorIdSchema } from '../schemas/GameSchema';

const router = Router();
router.get('/trending', GameController.getTrendingGames);
router.get('/discover', authMiddleware, GameController.discoverGames);
router.get('/buscar', validate(buscarJogoSchema), GameController.buscarJogo);
router.get('/:id', validate(buscarDetalhesPorIdSchema), GameController.buscarDetalhesPorId);

export default router;