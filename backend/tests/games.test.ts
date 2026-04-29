import supertest from 'supertest';
import app from '../src/app';
import { jest } from '@jest/globals';

const request = supertest(app);

describe('Game Controller - Rotas de Jogos (/api/jogos)', () => {
    
    // Como a API do IGDB pode demorar um pouco mais, aumentamos o timeout do Jest para esses testes
    jest.setTimeout(15000);

    let jogoSalvoId: number;

    it('[Happy Path] Deve buscar um jogo pelo nome no IGDB e retornar uma lista', async () => {
        const response = await request.get('/api/jogos/buscar').query({ nome: 'The Legend of Zelda' });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        
        // Salvamos o ID do primeiro jogo para testar a busca por ID
        jogoSalvoId = response.body[0].id;
        
        expect(response.body[0]).toHaveProperty('id');
        expect(response.body[0]).toHaveProperty('name');
    });

    it('[Edge Case] Deve retornar erro 400 (Zod) se não enviar o nome do jogo na query', async () => {
        const response = await request.get('/api/jogos/buscar');
        // Não enviamos a query string ?nome=

        expect(response.status).toBe(400);
        // O Zod lança um array de detalhes, validamos se existe o campo "erro" na raiz
        expect(response.body).toHaveProperty('erro', 'Erro de validação.');
    });

    it('[Happy Path] Deve buscar os detalhes de um jogo por ID no IGDB', async () => {
        // Usamos o ID salvo do primeiro teste
        const response = await request.get(`/api/jogos/${jogoSalvoId}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id_igdb', jogoSalvoId);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('cover_url');
    });

    it('[Edge Case] Deve retornar erro 400 se o ID fornecido não for um número válido', async () => {
        const response = await request.get('/api/jogos/nomeInvalido');

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('erro', 'Erro de validação.');
    });

    it('[Edge Case] Deve retornar erro 404 se o jogo não for encontrado no IGDB', async () => {
        // Um ID que dificilmente existirá no IGDB (ex: 999999999)
        const response = await request.get('/api/jogos/999999999');

        expect(response.status).toBe(404);
        expect(response.body.erro).toBe('Jogo não encontrado na base da Twitch.');
    });
});
