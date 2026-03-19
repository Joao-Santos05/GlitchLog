import { type Request, type Response } from 'express';
import prisma from '../libs/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
    // Lógica do POST
   static async criarUsuario(req: Request, res: Response) {
        try {
            const { name, username, email, senha } = req.body;

            if (!name || !username || !email || !senha) {
                res.status(400).json({ erro: "Nome, username, email e senha são obrigatórios." });
                return;
            }

            const saltRounds = 10;
            const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
            
            const novoUsuario = await prisma.user.create({
                data: { 
                    name: name, 
                    username: username.toLowerCase(), // Salvamos sempre minúsculo para evitar confusão na URL
                    email: email, 
                    senha_hash: senhaCriptografada 
                }
            });
            
            const { senha_hash: _, ...usuarioSeguro } = novoUsuario;
            res.status(201).json(usuarioSeguro);
            
        } catch (erro: any) {
            if (erro.code === 'P2002') {
                res.status(409).json({ erro: "Este email ou username já está em uso!" });
                return;
            }
            console.error(erro);
            res.status(500).json({ erro: "Erro ao criar o usuário." });
        }
    }
    
    // Lógica do Login
    static async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                res.status(400).json({ erro: "Email e senha são obrigatórios." });
                return;
            }

            // 1. Procura o usuário no banco
            const user = await prisma.user.findUnique({
                where: { email: email }
            });

            if (!user) {
                res.status(404).json({ erro: "Usuário não encontrado." });
                return;
            }

            // 2. Verifica se a senha bate com o hash salvo
            const senhaValida = await bcrypt.compare(senha, user.senha_hash);
            
            if (!senhaValida) {
                res.status(401).json({ erro: "Senha incorreta." });
                return;
            }

            // 3. A MÁGICA: Gera o Token JWT!
            const segredo = process.env.JWT_SECRET as string;
            const token = jwt.sign(
                { id: user.userId, nome: user.name }, // O que vai dentro do token (Payload)
                segredo, // A senha do seu .env
                { expiresIn: '7d' } // O token vale por 7 dias
            );

            // 4. Devolve o token e os dados básicos para o Front-end
            res.status(200).json({
                mensagem: "Login realizado com sucesso!",
                token: token,
                user: {
                    id: user.userId,
                    nome: user.name,
                    avatar: user.avatar_url
                }
            });

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro interno ao realizar login." });
        }
    }


    // Lógica do GET
    static async listarUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await prisma.user.findMany();
            res.status(200).json(usuarios);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar os usuários." });
        }
    }

    // Lógica do DELETE
    static async excluirUsuario(req: Request, res: Response) {
        try {
            // Pegamos o ID direto do Token JWT injetado pelo middleware
            const userId = (req as any).userId;

            const usuarioExiste = await prisma.user.findUnique({
                where: { userId: userId }
            });

            if (!usuarioExiste) {
                res.status(404).json({ erro: "Usuário não encontrado." });
                return;
            }

            // Limpa a biblioteca do usuário primeiro (evita erro de chave estrangeira)
            await prisma.libraryEntry.deleteMany({
                where: { userId: userId }
            });

            // Deleta o usuário em definitivo
            await prisma.user.delete({
                where: { userId: userId }
            });

            res.status(200).json({ mensagem: "Sua conta e biblioteca foram excluídas com sucesso!" });

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro interno ao excluir a conta." });
        }
    }
}