import request from 'supertest';
import app from '../src/app';
import prisma from '../src/libs/prisma';
import jwt from 'jsonwebtoken';

describe('Notificações (Integração)', () => {
    let tokenAuth1: string;
    let tokenAuth2: string;
    let userId1: number;
    let userId2: number;

    beforeAll(async () => {
        // Criar dois usuários para teste
        const user1 = await prisma.user.create({
            data: {
                name: "Teste Notif 1",
                username: "testenotif1",
                email: "notif1@teste.com",
                senha_hash: "hash"
            }
        });
        userId1 = user1.userId;
        tokenAuth1 = jwt.sign({ id: user1.userId }, process.env.JWT_SECRET || 'secret');

        const user2 = await prisma.user.create({
            data: {
                name: "Teste Notif 2",
                username: "testenotif2",
                email: "notif2@teste.com",
                senha_hash: "hash"
            }
        });
        userId2 = user2.userId;
        tokenAuth2 = jwt.sign({ id: user2.userId }, process.env.JWT_SECRET || 'secret');
    });

    afterAll(async () => {
        await prisma.notification.deleteMany({});
        await prisma.userFollow.deleteMany({});
        await prisma.user.deleteMany({
            where: { userId: { in: [userId1, userId2] } }
        });
    });

    it('Deve criar uma notificação ao seguir um usuário e impedir spam', async () => {
        // User 1 segue User 2
        await request(app)
            .post('/api/seguidores/testenotif2/toggle')
            .set('Authorization', `Bearer ${tokenAuth1}`)
            .send();

        // Buscar notificações do User 2
        let notifs = await request(app)
            .get('/api/notificacoes')
            .set('Authorization', `Bearer ${tokenAuth2}`);
        
        expect(notifs.status).toBe(200);
        expect(notifs.body.length).toBe(1);
        expect(notifs.body[0].type).toBe('NEW_FOLLOWER');

        // User 1 dá unfollow
        await request(app)
            .post('/api/seguidores/testenotif2/toggle')
            .set('Authorization', `Bearer ${tokenAuth1}`)
            .send();

        // User 1 segue de novo
        await request(app)
            .post('/api/seguidores/testenotif2/toggle')
            .set('Authorization', `Bearer ${tokenAuth1}`)
            .send();

        // Notificações do User 2 não podem ter duplicado
        notifs = await request(app)
            .get('/api/notificacoes')
            .set('Authorization', `Bearer ${tokenAuth2}`);
        
        expect(notifs.body.length).toBe(1);
    });

    it('Deve marcar as notificações como lidas', async () => {
        const res = await request(app)
            .put('/api/notificacoes/ler')
            .set('Authorization', `Bearer ${tokenAuth2}`)
            .send();

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Notificações marcadas como lidas.");

        const notifs = await request(app)
            .get('/api/notificacoes')
            .set('Authorization', `Bearer ${tokenAuth2}`);

        expect(notifs.body[0].isRead).toBe(true);
    });
});
