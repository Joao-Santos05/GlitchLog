import { type Request, type Response } from 'express';
import { FollowService } from '../services/FollowService';

export class FollowController {
    static async toggleFollow(req: Request, res: Response) {
        const followerId = req.userId as number; 
        const { username } = req.params;

        const resultado = await FollowService.toggleFollow(followerId, typeof username === 'string' ? username : '');
        res.status(200).json(resultado);
    }
}
