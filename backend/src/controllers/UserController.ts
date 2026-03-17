import { type Request, type Response } from 'express';
import prisma from '../libs/prisma';
import jwt from 'jsonwebtoken';

export class UserController {
    // Lógica do POST
    static async criarUsuario(req: Request, res: Response) {
        try {
            const { name, email, senha_hash } = req.body;
            
            const novoUsuario = await prisma.user.create({
                data: { name, email, senha_hash }
            });
            
            res.status(201).json(novoUsuario);
            
        } catch (erro: any) {
            //código P2002 é o código do Prisma para "Dado duplicado"
            if (erro.code === 'P2002') {
                res.status(409).json({ erro: "Este email já está em uso. Tente fazer login!" });
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
                res.status(400).json({ erro: "Email e senha são obrigatórios!" });
                return;
            }

            // 2. Buscamos o usuário no banco de dados
            const usuario = await prisma.user.findUnique({
                where: { email: email }
            });

            // Se o email não existir no banco
            if (!usuario) {
                res.status(404).json({ erro: "Usuário não encontrado." });
                return;
            }

            // 3. Conferimos a senha (temporariamente comparando o texto direto)
            if (senha !== usuario.senha_hash) {
                res.status(401).json({ erro: "Senha incorreta." });
                return;
            }

            // 4. A mágica acontece: Geramos o Token!
            const segredo = process.env.JWT_SECRET as string;
            
            // O token vai guardar o ID e o Nome do usuário, e vale por 7 dias
            const token = jwt.sign(
                { id: usuario.userId, nome: usuario.name },
                segredo,
                { expiresIn: '7d' } 
            );

            // 5. Devolvemos o token e os dados básicos para o Front-end
            res.status(200).json({
                mensagem: "Login realizado com sucesso!",
                token: token,
                usuario: {
                    id: usuario.userId,
                    nome: usuario.name,
                    email: usuario.email
                }
            });

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro interno ao tentar fazer login." });
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


}