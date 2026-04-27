import { Router } from 'express';
import { ListController } from '../controllers/ListController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { createListSchema, updateListSchema, addGamesToListSchema } from '../schemas/ListSchema';

const router = Router();

// Rotas de leitura (não requerem autenticação)
router.get('/usuario/:username', ListController.getUserLists);
router.get('/:id', ListController.getListById);

// Rotas de criação e edição (requerem autenticação)
router.post('/', authMiddleware, validate(createListSchema), ListController.createList);
router.post('/:id/jogos', authMiddleware, validate(addGamesToListSchema), ListController.addGamesToList);
router.put('/:id', authMiddleware, validate(updateListSchema), ListController.updateList);
router.delete('/:id', authMiddleware, ListController.deleteList);
router.delete('/:id/jogos/:id_igdb', authMiddleware, ListController.removeGameFromList);

export default router;
