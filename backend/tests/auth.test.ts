import supertest from 'supertest';
import app from '../src/app';
import prisma from '../src/libs/prisma';
import bcrypt from 'bcrypt';
import speakeasy from 'speakeasy';
import { jest } from '@jest/globals';

const request = supertest(app);

describe('Auth Controller & 2FA (/api/auth e /api/usuarios/login)', () => {
    jest.setTimeout(15000);

    let token: string;
    let userId: number;
    let resetTokenValue: string;
    let twoFactorSecret: string;

    beforeAll(async () => {
        await prisma.user.deleteMany();

        const senhaCriptografada = await bcrypt.hash('123456', 10);
        const user = await prisma.user.create({
            data: { 
                name: 'Auth Test', 
                username: 'authtest', 
                email: 'auth@test.com', 
                senha_hash: senhaCriptografada 
            }
        });
        userId = user.userId;

        const loginRes = await request.post('/api/usuarios/login').send({ email: 'auth@test.com', senha: '123456' });
        token = loginRes.body.token;
    });

    afterAll(async () => {
        await prisma.user.deleteMany();
        await prisma.$disconnect();
    });

    it('[Edge Case] Deve retornar erro de validação ao esquecer a senha sem enviar e-mail', async () => {
        const response = await request.post('/api/auth/forgot-password').send({});
        expect(response.status).toBe(400);
    });

    it('[Happy Path] Deve enviar e-mail de forgot password', async () => {
        const response = await request.post('/api/auth/forgot-password')
            .send({ email: 'auth@test.com' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Se o e-mail existir, um link de recuperação foi enviado.");
        expect(response.body).toHaveProperty('testToken');
        
        resetTokenValue = response.body.testToken;
    });

    it('[Edge Case] Deve falhar ao redefinir a senha com um token inválido', async () => {
        const response = await request.post('/api/auth/reset-password')
            .send({ token: 'tokenfalso', novaSenha: 'novasenha123' });

        expect(response.status).toBe(400);
        expect(response.body.erro).toBe("Token inválido ou expirado.");
    });

    it('[Happy Path] Deve redefinir a senha com o token correto', async () => {
        const response = await request.post('/api/auth/reset-password')
            .send({ token: resetTokenValue, novaSenha: 'novasenha123' });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Senha redefinida com sucesso! Você já pode fazer login.");
    });

    it('[Happy Path] Deve gerar o segredo e o QR Code do 2FA', async () => {
        const response = await request.post('/api/auth/2fa/generate')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('secret');
        expect(response.body).toHaveProperty('qrCodeUrl');
        
        twoFactorSecret = response.body.secret;
    });

    it('[Edge Case] Deve falhar ao ativar o 2FA com código incorreto', async () => {
        const response = await request.post('/api/auth/2fa/enable')
            .set('Authorization', `Bearer ${token}`)
            .send({ token: '111111' });

        expect(response.status).toBe(400);
        expect(response.body.erro).toBe("Código 2FA inválido.");
    });

    it('[Happy Path] Deve ativar o 2FA', async () => {
        // Gerar um token OTP válido na hora
        const otpToken = speakeasy.totp({
            secret: twoFactorSecret,
            encoding: 'base32'
        });

        const response = await request.post('/api/auth/2fa/enable')
            .set('Authorization', `Bearer ${token}`)
            .send({ token: otpToken });

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Autenticação de Dois Fatores ativada com sucesso!");
    });

    it('[Edge Case] Login deve pedir 2FA se estiver habilitado', async () => {
        const response = await request.post('/api/usuarios/login')
            .send({ email: 'auth@test.com', senha: 'novasenha123' }); // Usando a nova senha

        expect(response.status).toBe(403);
        expect(response.body.code).toBe("2FA_REQUIRED");
    });

    it('[Happy Path] Login deve ter sucesso fornecendo o token 2FA', async () => {
        const otpToken = speakeasy.totp({
            secret: twoFactorSecret,
            encoding: 'base32'
        });

        const response = await request.post('/api/usuarios/login')
            .send({ email: 'auth@test.com', senha: 'novasenha123', token2fa: otpToken });

        expect(response.status).toBe(200);
        expect(response.body.mensagem).toBe("Login realizado com sucesso!");
        expect(response.body).toHaveProperty('token');
    });
});
