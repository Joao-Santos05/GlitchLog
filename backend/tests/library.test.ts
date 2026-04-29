import supertest from 'supertest';
import app from '../src/app';
import prisma from '../src/libs/prisma';
import bcrypt from 'bcrypt';
import { jest } from '@jest/globals';

const request = supertest(app);

describe('Library Controller (/api/biblioteca)', () => {
    jest.setTimeout(15000); // IGDB pode demorar

    let token: string;
    let userId: number;
    let jogoId = 119; // ID de The Legend of Zelda: A Link to the Past no IGDB
    let username = 'libtest';

    beforeAll(async () => {
        // Limpar tabelas
        await prisma.libraryEntry.deleteMany();
        await prisma.user.deleteMany();

        // Criar usuário para testes
        const senhaCriptografada = await bcrypt.hash('123456', 10);
        const user = await prisma.user.create({
            data: { name: 'Lib Test', username: username, email: 'lib@test.com', senha_hash: senhaCriptografada }
        });
        userId = user.userId;

        // Fazer login para pegar o token JWT
        const loginRes = await request.post('/api/usuarios/login').send({ email: 'lib@test.com', senha: '123456' });
        token = loginRes.body.token;
    });

    afterAll(async () => {
        await prisma.libraryEntry.deleteMany();
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    it('[Edge Case] Deve barrar acesso se não enviar o token JWT', async () => {
        const response = await request.post('/api/biblioteca').send({
            id_igdb: jogoId,
            name: 'Zelda',
            status: 'JOGANDO'
        });

        expect(response.status).toBe(401);
        expect(response.body.erro).toBe('Acesso negado. Cabeçalho de autorização não fornecido.');
    });

    it('[Happy Path] Deve adicionar um jogo na biblioteca', async () => {
        const response = await request.post('/api/biblioteca')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_igdb: jogoId,
                name: 'The Legend of Zelda: A Link to the Past',
                status: 'JOGANDO'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('mensagem');
        expect(response.body.entrada).toHaveProperty('status', 'JOGANDO');
    });

    it('[Edge Case] Deve retornar erro ao tentar adicionar o mesmo jogo novamente', async () => {
        const response = await request.post('/api/biblioteca')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_igdb: jogoId,
                name: 'The Legend of Zelda: A Link to the Past',
                status: 'FINALIZADO'
            });

        expect(response.status).toBe(409);
        expect(response.body.erro).toBe('Este jogo já está na sua biblioteca!');
    });

    it('[Edge Case] Deve retornar erro do Zod ao enviar um status inválido', async () => {
        const response = await request.post('/api/biblioteca')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_igdb: 999,
                name: 'Teste',
                status: 'StatusInvalido'
            });

        expect(response.status).toBe(400);
        expect(response.body.erro).toBe('Erro de validação.');
    });

    it('[Happy Path] Deve listar a biblioteca de um usuário público', async () => {
        const response = await request.get(`/api/biblioteca/${username}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('status', 'JOGANDO');
    });

    it('[Happy Path] Deve atualizar o status de um jogo na biblioteca', async () => {
        const response = await request.put(`/api/biblioteca/${jogoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: 'FINALIZADO'
            });

        expect(response.status).toBe(200);
        expect(response.body.mensagem).toBe('Status do jogo atualizado com sucesso!');

        // Validar no banco ou em listar
        const checkRes = await request.get(`/api/biblioteca/${username}`);
        expect(checkRes.body[0].status).toBe('FINALIZADO');
    });

    it('[Happy Path] Deve remover o jogo da biblioteca', async () => {
        const response = await request.delete(`/api/biblioteca/${jogoId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.mensagem).toBe('Jogo removido da sua biblioteca.');

        const checkRes = await request.get(`/api/biblioteca/${username}`);
        expect(checkRes.body.length).toBe(0);
    });
});
