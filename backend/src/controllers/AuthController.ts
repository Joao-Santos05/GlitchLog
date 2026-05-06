import { type Request, type Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
    static async forgotPassword(req: Request, res: Response) {
        const { email } = req.body;
        const result = await AuthService.forgotPassword(email);
        res.status(200).json(result);
    }

    static async resetPassword(req: Request, res: Response) {
        const { token, novaSenha } = req.body;
        const result = await AuthService.resetPassword(token, novaSenha);
        res.status(200).json(result);
    }

    static async generate2FA(req: Request, res: Response) {
        const userId = req.userId as number;
        const result = await AuthService.generate2FA(userId);
        res.status(200).json(result);
    }

    static async enable2FA(req: Request, res: Response) {
        const userId = req.userId as number;
        const { token } = req.body;
        const result = await AuthService.enable2FA(userId, token);
        res.status(200).json(result);
    }
}
