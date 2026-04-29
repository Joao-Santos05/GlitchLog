import supertest from 'supertest';
import app from '../src/app';
import prisma from '../src/libs/prisma';
import bcrypt from 'bcrypt';
import { jest } from '@jest/globals';

const request = supertest(app);

describe('Favorite Controller (/api/favoritos)', () => {
    jest.setTimeout(15000);

    let token: string;
    let userId: number;
    const jogoId = 119;
    const username = 'favtest';

    beforeAll(async () => {
        // Limpar tabelas relacionadas
        await prisma.favoriteGame.deleteMany();
        await prisma.user.deleteMany();
        await prisma.game.deleteMany();

        // Criar jogo
        await prisma.game.create({
            data: { id_igdb: jogoId, name: 'The Legend of Zelda: A Link to the Past' }
        });

        // Criar usuário
        const senhaCriptografada = await bcrypt.hash('123456', 10);
        const user = await prisma.user.create({
            data: { name: 'Fav Test', username: username, email: 'fav@test.com', senha_hash: senhaCriptografada }
        });
        userId = user.userId;

        // Fazer login
        const loginRes = await request.post('/api/usuarios/login').send({ email: 'fav@test.com', senha: '123456' });
        token = loginRes.body.token;
    });

    afterAll(async () => {
        await prisma.favoriteGame.deleteMany();
        await prisma.user.deleteMany();
        await prisma.game.deleteMany();
        await prisma.$disconnect();
    });

    it('[Edge Case] Deve retornar erro do Zod ao tentar adicionar num slot inválido (> 4)', async () => {
        const response = await request.post('/api/favoritos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_igdb: jogoId,
                name: 'Zelda',
                slot: 5
            });

        expect(response.status).toBe(400);
        expect(response.body.erro).toBe('Erro de validação.');
    });

    it('[Happy Path] Deve adicionar um jogo aos favoritos no slot 1', async () => {
        const response = await request.post('/api/favoritos')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_igdb: jogoId,
                name: 'Zelda',
                slot: 1
            });

        expect([200, 201]).toContain(response.status);
        expect(response.body).toHaveProperty('mensagem', 'Jogo favoritado com sucesso!');
    });
});
