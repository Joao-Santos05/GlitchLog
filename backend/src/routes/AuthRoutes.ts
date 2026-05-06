import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validate } from '../middlewares/ValidationMiddleware';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { forgotPasswordSchema, resetPasswordSchema, enable2FASchema } from '../schemas/AuthSchema';

const router = Router();

router.post('/forgot-password', validate(forgotPasswordSchema), AuthController.forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), AuthController.resetPassword);

router.post('/2fa/generate', authMiddleware, AuthController.generate2FA);
router.post('/2fa/enable', authMiddleware, validate(enable2FASchema), AuthController.enable2FA);

export default router;
