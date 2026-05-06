import prisma from '../libs/prisma';

export class NotificationService {
    static async createNotification(userId: number, type: string, message: string) {
        // Anti-spam check: See if an identical unread notification exists
        const existing = await prisma.notification.findFirst({
            where: {
                userId,
                type,
                message,
                isRead: false
            }
        });

        if (existing) {
            return existing; // Don't create duplicate
        }

        const notification = await prisma.notification.create({
            data: {
                userId,
                type,
                message
            }
        });

        return notification;
    }

    static async getUserNotifications(userId: number) {
        const notifications = await prisma.notification.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 50
        });

        return notifications;
    }

    static async markAsRead(userId: number) {
        await prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true }
        });

        return { message: "Notificações marcadas como lidas." };
    }
}
