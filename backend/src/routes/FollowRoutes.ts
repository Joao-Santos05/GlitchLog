import { Router } from 'express';
import { FollowController } from '../controllers/FollowController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { validate } from '../middlewares/ValidationMiddleware';
import { toggleFollowSchema } from '../schemas/FollowSchema';

const router = Router();

router.post('/:username/toggle', authMiddleware, validate(toggleFollowSchema), FollowController.toggleFollow);
router.get('/:username/followers', validate(toggleFollowSchema), FollowController.getFollowers);
router.get('/:username/following', validate(toggleFollowSchema), FollowController.getFollowing);

export default router;
