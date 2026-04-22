import { Router } from 'express';
import { GameController } from '../controllers/GameController';
import { validate } from '../middlewares/ValidationMiddleware';
import { buscarJogoSchema, buscarDetalhesPorIdSchema } from '../schemas/GameSchema';

const router = Router();

//rota final: GET /api/jogos/buscar?nome=nomedojogo
router.get('/buscar', validate(buscarJogoSchema), GameController.buscarJogo);
router.get('/:id', validate(buscarDetalhesPorIdSchema), GameController.buscarDetalhesPorId);


export default router;