import request from 'supertest';
import app from '../src/app';
import prisma from '../src/libs/prisma';
import jwt from 'jsonwebtoken';

describe('Wishlist Controller (/api/wishlist)', () => {
    let tokenUsuarioDono: string;
    let tokenUsuarioVisitante: string;
    let donoId: number;
    let visitanteId: number;
    let donoUsername: string;

    beforeAll(async () => {
        // Limpa as tabelas
        await prisma.wishlistEntry.deleteMany({});
        await prisma.libraryEntry.deleteMany({});
        await prisma.user.deleteMany({});
        await prisma.game.deleteMany({});

        // Cria o dono da wishlist
        const dono = await prisma.user.create({
            data: {
                name: 'Dono da Wishlist',
                username: 'donowishlist',
                email: 'dono@teste.com',
                senha_hash: 'hash123',
                wishlist_is_public: true
            }
        });
        donoId = dono.userId;
        donoUsername = dono.username;
        tokenUsuarioDono = jwt.sign({ id: donoId, nome: dono.name }, process.env.JWT_SECRET || 'GlitchLogSecretKey');

        // Cria o visitante
        const visitante = await prisma.user.create({
            data: {
                name: 'Visitante',
                username: 'visitante',
                email: 'visitante@teste.com',
                senha_hash: 'hash123'
            }
        });
        visitanteId = visitante.userId;
        tokenUsuarioVisitante = jwt.sign({ id: visitanteId, nome: visitante.name }, process.env.JWT_SECRET || 'GlitchLogSecretKey');
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('[Happy Path] Deve adicionar um jogo na wishlist', async () => {
        const response = await request(app)
            .post('/api/wishlist')
            .set('Authorization', `Bearer ${tokenUsuarioDono}`)
            .send({ id_igdb: 150080 }); // Jogo válido

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('mensagem');
    });

    it('[Edge Case] Deve barrar adicionar o mesmo jogo duas vezes', async () => {
        const response = await request(app)
            .post('/api/wishlist')
            .set('Authorization', `Bearer ${tokenUsuarioDono}`)
            .send({ id_igdb: 150080 });

        expect(response.status).toBe(409);
    });

    it('[Happy Path] Deve listar a wishlist pública do usuário', async () => {
        const response = await request(app)
            .get(`/api/wishlist/${donoUsername}`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('id_igdb', 150080);
    });

    it('[Happy Path] Deve listar a wishlist privada do usuário (sendo o próprio dono)', async () => {
        // Torna privada
        await prisma.user.update({
            where: { userId: donoId },
            data: { wishlist_is_public: false }
        });

        const response = await request(app)
            .get(`/api/wishlist/${donoUsername}`)
            .set('Authorization', `Bearer ${tokenUsuarioDono}`);

        expect(response.status).toBe(200);
    });

    it('[Edge Case] Deve barrar listar a wishlist privada do usuário (sendo visitante)', async () => {
        const response = await request(app)
            .get(`/api/wishlist/${donoUsername}`)
            .set('Authorization', `Bearer ${tokenUsuarioVisitante}`);

        expect(response.status).toBe(403);
    });

    it('[Happy Path] Deve remover um jogo da wishlist ao adicionar na biblioteca', async () => {
        const addLibResponse = await request(app)
            .post('/api/biblioteca')
            .set('Authorization', `Bearer ${tokenUsuarioDono}`)
            .send({ id_igdb: 150080, name: 'Zelda Teste', status: 'JOGANDO' });

        expect(addLibResponse.status).toBe(201);

        const wishlist = await prisma.wishlistEntry.findMany({
            where: { userId: donoId, id_igdb: 150080 }
        });
        expect(wishlist.length).toBe(0);
    });
});
