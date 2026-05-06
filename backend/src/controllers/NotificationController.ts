import { type Request, type Response } from 'express';
import { NotificationService } from '../services/NotificationService';

export class NotificationController {
    static async getNotifications(req: Request, res: Response) {
        const userId = req.userId as number;
        const notifications = await NotificationService.getUserNotifications(userId);
        res.status(200).json(notifications);
    }

    static async markAsRead(req: Request, res: Response) {
        const userId = req.userId as number;
        const result = await NotificationService.markAsRead(userId);
        res.status(200).json(result);
    }
}
