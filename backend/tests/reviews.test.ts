import supertest from 'supertest';
import app from '../src/app';
import prisma from '../src/libs/prisma';
import bcrypt from 'bcrypt';
import { jest } from '@jest/globals';

const request = supertest(app);

describe('Review Controller (/api/reviews)', () => {
    jest.setTimeout(15000);

    let token: string;
    let userId: number;
    let reviewId: number;
    let commentId: number;
    const jogoId = 119; // The Legend of Zelda: A Link to the Past
    const username = 'reviewtest';

    beforeAll(async () => {
        // Limpar tabelas relacionadas
        await prisma.reviewLike.deleteMany();
        await prisma.commentLike.deleteMany();
        await prisma.comment.deleteMany();
        await prisma.review.deleteMany();
        await prisma.user.deleteMany();
        await prisma.game.deleteMany();

        // Criar jogo no banco local (ReviewService exige isso)
        await prisma.game.create({
            data: { id_igdb: jogoId, name: 'The Legend of Zelda: A Link to the Past' }
        });

        // Criar usuário
        const senhaCriptografada = await bcrypt.hash('123456', 10);
        const user = await prisma.user.create({
            data: { name: 'Review Test', username: username, email: 'review@test.com', senha_hash: senhaCriptografada }
        });
        userId = user.userId;

        // Fazer login
        const loginRes = await request.post('/api/usuarios/login').send({ email: 'review@test.com', senha: '123456' });
        token = loginRes.body.token;
    });

    afterAll(async () => {
        await prisma.reviewLike.deleteMany();
        await prisma.commentLike.deleteMany();
        await prisma.comment.deleteMany();
        await prisma.review.deleteMany();
        await prisma.user.deleteMany();
        await prisma.game.deleteMany();
        await prisma.$disconnect();
    });

    it('[Edge Case] Deve retornar erro do Zod ao criar review com nota inválida (> 10)', async () => {
        const response = await request.post(`/api/reviews/${jogoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_igdb: jogoId,
                name: 'Zelda',
                nota: 11, // Forçando Zod error (> 10)
                reviewText: 'Muito bom!'
            });

        expect(response.status).toBe(400);
        expect(response.body.erro).toBe('Erro de validação.');
    });

    it('[Edge Case] Deve retornar erro do Service ao criar review com nota fora do padrão do Service', async () => {
        const response = await request.post(`/api/reviews/${jogoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_igdb: jogoId,
                name: 'Zelda',
                nota: 9, // Passa no Zod (<10), mas falha no Service (>5)
                reviewText: 'Muito bom!'
            });

        expect(response.status).toBe(400);
        expect(response.body.erro).toBe('A nota deve ser entre 0.5 e 5.0, em incrementos de 0.5.');
    });

    it('[Happy Path] Deve criar uma review válida', async () => {
        const response = await request.post(`/api/reviews/${jogoId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_igdb: jogoId,
                name: 'Zelda',
                nota: 5,
                reviewText: 'Uma obra prima absoluta!'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('mensagem', 'Review salva com sucesso!');
        expect(response.body.review).toHaveProperty('nota', 5);
        expect(response.body.review).toHaveProperty('reviewText', 'Uma obra prima absoluta!');
        
        reviewId = response.body.review.reviewId;
    });

    it('[Happy Path] Deve listar as reviews de um jogo', async () => {
        const response = await request.get(`/api/reviews/${jogoId}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('reviewId', reviewId);
    });

    it('[Happy Path] Deve curtir uma review', async () => {
        const response = await request.post(`/api/reviews/${reviewId}/like`)
            .set('Authorization', `Bearer ${token}`);

        // Algumas implementações retornam 201 ou 200, testamos para ambos ou para o recebido (201)
        expect([200, 201]).toContain(response.status);
        expect(response.body.mensagem).toBe('Review curtida!');
    });

    it('[Happy Path] Deve remover a curtida de uma review se clicar novamente', async () => {
        const response = await request.post(`/api/reviews/${reviewId}/like`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.mensagem).toBe('Like removido.');
    });

    it('[Happy Path] Deve adicionar um comentário à review', async () => {
        const response = await request.post(`/api/reviews/${reviewId}/comentarios`)
            .set('Authorization', `Bearer ${token}`)
            .send({ content: 'Concordo plenamente!' });

        expect(response.status).toBe(201);
        expect(response.body.mensagem).toBe('Comentário adicionado!');
        expect(response.body.comentario).toHaveProperty('content', 'Concordo plenamente!');

        commentId = response.body.comentario.commentID;
    });

    it('[Happy Path] Deve curtir um comentário', async () => {
        const response = await request.post(`/api/reviews/comentarios/${commentId}/like`)
            .set('Authorization', `Bearer ${token}`);

        expect([200, 201]).toContain(response.status);
        expect(response.body.mensagem).toBe('Comentário curtido!');
    });

    it('[Happy Path] Deve deletar o comentário criado', async () => {
        const response = await request.delete(`/api/reviews/comentarios/${commentId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.mensagem).toBe('Comentário apagado com sucesso!');
    });

    it('[Happy Path] Deve deletar a própria review', async () => {
        const response = await request.delete(`/api/reviews/${jogoId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.mensagem).toBe('Review apagada com sucesso.');
    });

    it('[Edge Case] Deve retornar erro 404 ao tentar deletar uma review que não existe', async () => {
        const response = await request.delete(`/api/reviews/${jogoId}`)
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(404);
        expect(response.body.erro).toBe('Review não encontrada.');
    });
});
