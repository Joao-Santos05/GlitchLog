import supertest from 'supertest';
import app from '../src/app';
import prisma from '../src/libs/prisma';
import bcrypt from 'bcrypt';
import { jest } from '@jest/globals';

const request = supertest(app);

describe('List Controller (/api/listas)', () => {
    jest.setTimeout(15000);

    let token: string;
    let userId: number;
    let listId: number;
    const jogoId = 119;
    const username = 'listtest';

    beforeAll(async () => {
        // Limpar tabelas
        await prisma.listItem.deleteMany();
        await prisma.list.deleteMany();
        await prisma.user.deleteMany();
        await prisma.game.deleteMany();

        // Criar jogo
        await prisma.game.create({
            data: { id_igdb: jogoId, name: 'The Legend of Zelda: A Link to the Past' }
        });

        // Criar usuário
        const senhaCriptografada = await bcrypt.hash('123456', 10);
        const user = await prisma.user.create({
            data: { name: 'List Test', username: username, email: 'list@test.com', senha_hash: senhaCriptografada }
        });
        userId = user.userId;

        // Login
        const loginRes = await request.post('/api/usuarios/login').send({ email: 'list@test.com', senha: '123456' });
        token = loginRes.body.token;
    });

    afterAll(async () => {
        await prisma.listItem.deleteMany();
        await prisma.list.deleteMany();
        await prisma.user.deleteMany();
        await prisma.game.deleteMany();
        await prisma.$disconnect();
    });

    it('[Edge Case] Deve retornar erro do Zod ao criar lista sem título', async () => {
        const response = await request.post('/api/listas')
            .set('Authorization', `Bearer ${token}`)
            .send({
                summary: 'Lista sem título'
            });

        expect(response.status).toBe(400);
        expect(response.body.erro).toBe('Erro de validação.');
    });

    it('[Happy Path] Deve criar uma lista com sucesso', async () => {
        const response = await request.post('/api/listas')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Minha Lista de RPGs',
                summary: 'Melhores RPGs do SNES',
                isPublic: true
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('listId');
        expect(response.body).toHaveProperty('title', 'Minha Lista de RPGs');

        listId = response.body.listId;
    });

    it('[Happy Path] Deve buscar as listas do próprio usuário (minhas)', async () => {
        const response = await request.get('/api/listas/minhas')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('title', 'Minha Lista de RPGs');
    });

    it('[Happy Path] Deve buscar as listas públicas de um usuário pelo username', async () => {
        const response = await request.get(`/api/listas/usuario/${username}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('title', 'Minha Lista de RPGs');
    });

    it('[Edge Case] Deve retornar erro do Zod ao adicionar jogo sem ordem', async () => {
        const response = await request.post(`/api/listas/${listId}/jogos`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                games: [
                    { id_igdb: jogoId } // Falta ordem
                ]
            });

        expect(response.status).toBe(400);
        expect(response.body.erro).toBe('Erro de validação.');
    });

    it('[Happy Path] Deve adicionar um jogo à lista', async () => {
        const response = await request.post(`/api/listas/${listId}/jogos`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                games: [
                    { id_igdb: jogoId, ordem: 1 }
                ]
            });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Jogos adicionados à lista com sucesso.');
    });

    it('[Happy Path] Deve buscar a lista por ID com seus itens', async () => {
        const response = await request.get(`/api/listas/${listId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Minha Lista de RPGs');
        expect(response.body).toHaveProperty('listItems');
        expect(Array.isArray(response.body.listItems)).toBe(true);
        expect(response.body.listItems[0]).toHaveProperty('id_igdb', jogoId);
        expect(response.body.listItems[0]).toHaveProperty('ordem', 1);
    });

    it('[Happy Path] Deve atualizar o título da lista', async () => {
        const response = await request.put(`/api/listas/${listId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Minha Lista de RPGs Editada'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title', 'Minha Lista de RPGs Editada');
    });

    it('[Happy Path] Deve remover um jogo da lista', async () => {
        const response = await request.delete(`/api/listas/${listId}/jogos/${jogoId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Jogo removido da lista com sucesso.');
    });

    it('[Happy Path] Deve excluir a lista inteira', async () => {
        const response = await request.delete(`/api/listas/${listId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Lista excluída com sucesso.');
    });

    it('[Edge Case] Deve retornar 404 ao tentar buscar a lista excluída', async () => {
        const response = await request.get(`/api/listas/${listId}`);

        expect(response.status).toBe(404);
        expect(response.body.erro).toBe('Lista não encontrada.');
    });
});
