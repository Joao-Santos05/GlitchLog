import { Router } from 'express';
import { GameController } from '../controllers/GameController';

const router = Router();

//rota final: GET /api/jogos/buscar?nome=nomedojogo
router.get('/buscar', GameController.buscarJogo);

export default router;