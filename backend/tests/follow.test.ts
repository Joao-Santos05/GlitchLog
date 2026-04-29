import request from 'supertest';
import app from '../src/app';
import prisma from '../src/libs/prisma';
import jwt from 'jsonwebtoken';

describe('Follow Controller (/api/seguidores)', () => {
    let tokenUsuario1: string;
    let tokenUsuario2: string;
    let user1Id: number;
    let user2Id: number;
    let user2Username: string;

    beforeAll(async () => {
        await prisma.userFollow.deleteMany({});
        await prisma.user.deleteMany({});

        const user1 = await prisma.user.create({
            data: {
                name: 'Seguidor Teste',
                username: 'seguidor',
                email: 'seguidor@teste.com',
                senha_hash: 'hash123'
            }
        });
        user1Id = user1.userId;
        tokenUsuario1 = jwt.sign({ id: user1Id, nome: user1.name }, process.env.JWT_SECRET || 'GlitchLogSecretKey');

        const user2 = await prisma.user.create({
            data: {
                name: 'Seguido Teste',
                username: 'seguido',
                email: 'seguido@teste.com',
                senha_hash: 'hash123'
            }
        });
        user2Id = user2.userId;
        user2Username = user2.username;
        tokenUsuario2 = jwt.sign({ id: user2Id, nome: user2.name }, process.env.JWT_SECRET || 'GlitchLogSecretKey');
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('[Happy Path] Deve seguir o usuário', async () => {
        const response = await request(app)
            .post(`/api/seguidores/${user2Username}/toggle`)
            .set('Authorization', `Bearer ${tokenUsuario1}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'followed');
    });

    it('[Happy Path] Deve deixar de seguir o usuário (toggle)', async () => {
        const response = await request(app)
            .post(`/api/seguidores/${user2Username}/toggle`)
            .set('Authorization', `Bearer ${tokenUsuario1}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('status', 'unfollowed');
    });

    it('[Edge Case] Deve retornar erro ao tentar seguir a si mesmo', async () => {
        const response = await request(app)
            .post(`/api/seguidores/seguidor/toggle`) // user1 username is 'seguidor'
            .set('Authorization', `Bearer ${tokenUsuario1}`);

        expect(response.status).toBe(400);
    });

    it('[Edge Case] Deve retornar erro se o usuário a ser seguido não existir', async () => {
        const response = await request(app)
            .post(`/api/seguidores/fantasma/toggle`)
            .set('Authorization', `Bearer ${tokenUsuario1}`);

        expect(response.status).toBe(404);
    });

    it('O perfil do usuário deve retornar a contagem correta de seguidores', async () => {
        // Seguir de novo para contar
        await request(app)
            .post(`/api/seguidores/${user2Username}/toggle`)
            .set('Authorization', `Bearer ${tokenUsuario1}`);

        const response = await request(app)
            .get(`/api/usuarios/${user2Username}`);

        expect(response.status).toBe(200);
        expect(response.body._count.seguidores).toBe(1);
    });
});
