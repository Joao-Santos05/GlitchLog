import { Router } from 'express';
import { LibraryController } from '../controllers/LibraryController';

const router = Router();

router.post('/', LibraryController.adicionarJogo);

export default router;