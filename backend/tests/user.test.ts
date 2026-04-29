import supertest from 'supertest';
import app from '../src/app';
import prisma from '../src/libs/prisma';
import bcrypt from 'bcrypt';

const request = supertest(app);

describe('User Controller - Login (/api/usuarios/login)', () => {
    
    // Limpar os dados antes de cada teste para evitar poluição
    beforeEach(async () => {
        // Apagamos a tabela principal, o que deve lidar com o resto se houver cascata
        await prisma.user.deleteMany();
    });

    // Fechar conexão com o banco ao finalizar a suíte de testes
    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('[Happy Path] Deve realizar login com sucesso e retornar um token JWT', async () => {
        // Arrange
        const senhaCriptografada = await bcrypt.hash('senhaSegura123', 10);
        await prisma.user.create({
            data: {
                name: 'Teste QA',
                username: 'testeqa',
                email: 'qa@glitchlog.com',
                senha_hash: senhaCriptografada
            }
        });

        // Act
        const response = await request.post('/api/usuarios/login').send({
            email: 'qa@glitchlog.com',
            senha: 'senhaSegura123'
        });

        // Assert
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.nome).toBe('Teste QA');
    });

    it('[Edge Case] Deve retornar erro 401 ao usar uma senha incorreta', async () => {
        const senhaCriptografada = await bcrypt.hash('senhaSegura123', 10);
        await prisma.user.create({
            data: {
                name: 'Teste QA',
                username: 'testeqa2',
                email: 'qa2@glitchlog.com',
                senha_hash: senhaCriptografada
            }
        });

        const response = await request.post('/api/usuarios/login').send({
            email: 'qa2@glitchlog.com',
            senha: 'senhaErrada123'
        });

        expect(response.status).toBe(401);
        expect(response.body.erro).toBe('Senha incorreta.');
    });

    it('[Edge Case] Deve retornar erro 404 ao tentar logar com email não cadastrado', async () => {
        const response = await request.post('/api/usuarios/login').send({
            email: 'inexistente@glitchlog.com',
            senha: 'senhaSegura123'
        });

        expect(response.status).toBe(404);
        expect(response.body.erro).toBe('Usuário não encontrado.');
    });

    it('[Edge Case] Deve retornar erro 400 se não enviar o email ou a senha', async () => {
        const response = await request.post('/api/usuarios/login').send({
            email: 'qa@glitchlog.com' // faltando a senha
        });

        expect(response.status).toBe(400); 
    });
});
