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

    it('[Happy Path] Deve retornar 200 ao fazer logout', async () => {
        const senhaCriptografada = await bcrypt.hash('senhaSegura123', 10);
        const user = await prisma.user.create({
            data: { name: 'Teste Logout', username: 'logoutuser', email: 'logout@glitchlog.com', senha_hash: senhaCriptografada }
        });
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user.userId, nome: user.name }, process.env.JWT_SECRET || 'secret');

        const response = await request.post('/api/usuarios/logout').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body.mensagem).toBe('Logout realizado com sucesso no front-end.');
    });

    it('[Happy Path] Deve retornar 200 ao alterar a senha com sucesso', async () => {
        const senhaCriptografada = await bcrypt.hash('senhaAtual', 10);
        const user = await prisma.user.create({
            data: { name: 'Teste Senha', username: 'senhauser', email: 'senha@glitchlog.com', senha_hash: senhaCriptografada }
        });
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user.userId, nome: user.name }, process.env.JWT_SECRET || 'secret');

        const response = await request.put('/api/usuarios/alterar-senha')
            .set('Authorization', `Bearer ${token}`)
            .send({ senhaAtual: 'senhaAtual', novaSenha: 'senhaNova' });

        expect(response.status).toBe(200);
        expect(response.body.mensagem).toBe('Senha alterada com sucesso!');
    });

    it('[Edge Case] Deve retornar 403 ao buscar um perfil privado sem seguir de volta', async () => {
        await prisma.user.create({
            data: { name: 'Privado', username: 'privado', email: 'privado@glitchlog.com', senha_hash: '123', isPrivate: true }
        });

        const response = await request.get('/api/usuarios/privado');

        expect(response.status).toBe(403);
        expect(response.body.erro).toBe('Este perfil é privado.');
    });
});
