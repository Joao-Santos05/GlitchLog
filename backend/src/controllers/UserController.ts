import { type Request, type Response } from 'express';
import prisma from '../libs/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
    // Lógica do POST
   static async criarUsuario(req: Request, res: Response) {
        try {
            const { nome, username, email, senha } = req.body;

            if (!nome || !username || !email || !senha) {
                res.status(400).json({ erro: "Nome, username, email e senha são obrigatórios." });
                return;
            }

            const saltRounds = 10;
            const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
            
            const novoUsuario = await prisma.user.create({
                data: { 
                    name: nome, 
                    username: username.toLowerCase(),
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

            const senhaValida = await bcrypt.compare(senha, user.senha_hash);
            
            if (!senhaValida) {
                res.status(401).json({ erro: "Senha incorreta." });
                return;
            }

            const segredo = process.env.JWT_SECRET as string;
            const token = jwt.sign(
                { id: user.userId, nome: user.name }, // O que vai dentro do token (Payload)
                segredo, // A senha do .env
                { expiresIn: '7d' } // O token vale por 7 dias
            );

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
static async listarUsuarios(req: Request, res: Response) {
        try {
            // NOTA: Criar um 'adminMiddleware'. 
            // Esta rota deve ser bloqueada em produção para não expor a base inteira, 
            // ficando disponível apenas para o painel de administração.
            const usuarios = await prisma.user.findMany({
                select: {
                    userId: true,
                    username: true,
                    bio: true,
                    avatar_url: true 
                }
            });
            res.status(200).json(usuarios);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar os usuários." });
        }
    }

    static async buscarPerfilPublico(req: Request, res: Response) {
        try {
            const { username } = req.params;

            const usuario = await prisma.user.findUnique({
                where: { username: String(username).toLowerCase() }, 
                select: {
                    userId: true,
                    username: true,
                    bio: true,
                    avatar_url: true,
                    favoritos: {
                        select: {
                            slot: true, // Traz em qual posição (1 a 4) o jogo está
                            game: {     // Faz o "Join" para trazer os detalhes do jogo
                                select: {
                                    id_igdb: true,
                                    name: true,
                                    cover_url: true
                                }
                            }
                        },
                        orderBy: {
                            slot: 'asc'
                        }
                    }
                    // NOTA: Adicionar um 'include' aqui para o Prisma já trazer 
                    // a lista de reviews desse usuário!

                }
            });

            if (!usuario) {
                res.status(404).json({ erro: "Usuário não encontrado." });
                return;
            }

            res.status(200).json(usuario);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar o perfil do usuário." });
        }
    }

    static async meuPerfil(req: Request, res: Response) {
        try {
            const userId = (req as any).userId; 

            const meuPerfil = await prisma.user.findUnique({
                where: { userId: userId },
                select: {
                    userId: true,
                    username: true,
                    email: true, // Revelamos o email só para o próprio dono!
                    bio: true,
                    avatar_url: true, 
                    favoritos: {
                        select: {
                            slot: true, // Traz em qual posição (1 a 4) o jogo está
                            game: {     // Faz o "Join" para trazer os detalhes do jogo
                                select: {
                                    id_igdb: true,
                                    name: true,
                                    cover_url: true
                                }
                            }
                        },
                        orderBy: {
                            slot: 'asc'
                        }
                    }
                }
            });

            if (!meuPerfil) {
                res.status(404).json({ erro: "Usuário não encontrado." });
                return;
            }

            res.status(200).json(meuPerfil);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar os dados do perfil." });
        }
    }

    static async atualizarPerfil(req: Request, res: Response) {
        try {
            const userId = (req as any).userId; 
            const { username, bio, email, oldPassword, newPassword, avatar_url } = req.body;

            const usuarioAtual = await prisma.user.findUnique({
                where: { userId: userId }
            });

            if (!usuarioAtual) {
                res.status(404).json({ erro: "Usuário não encontrado." });
                return;
            }

            if (username || email) {
                const conflito = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { username: username ? username : undefined },
                            { email: email ? email : undefined }
                        ],
                        NOT: { userId: userId } 
                    }
                });

                if (conflito) {
                    res.status(409).json({ erro: "Este nome de usuário ou e-mail já está em uso." });
                    return;
                }
            }

            // NOTA: A troca de e-mail está sendo feita de forma direta. 
            // O ideal para produção é gerar um token, enviar um e-mail de confirmação 
            // (usando AWS SES ou SendGrid) e só atualizar o banco após o clique.
            const mudandoEmail = email && email !== usuarioAtual.email;
            const mudandoSenha = newPassword !== undefined && newPassword !== "";
            let senhaFinal = usuarioAtual.senha_hash;

            if (mudandoEmail || mudandoSenha) {
                if (!oldPassword) {
                    res.status(400).json({ erro: "Para alterar seu e-mail ou senha, confirme sua senha atual." });
                    return;
                }

                const senhaBate = await bcrypt.compare(oldPassword, usuarioAtual.senha_hash);
                if (!senhaBate) {
                    res.status(401).json({ erro: "A senha atual está incorreta." });
                    return;
                }

                if (mudandoSenha) {
                    senhaFinal = await bcrypt.hash(newPassword, 10);
                    // NOTA: Implementar invalidação de tokens JWT.
                    // Adicionar uma 'tokenVersion' no banco ou usar Redis para deslogar 
                    // o usuário de todos os outros dispositivos ao trocar a senha.
                }
            }

            const usuarioAtualizado = await prisma.user.update({
                where: { userId: userId },
                data: {
                    username: username || usuarioAtual.username,
                    bio: bio !== undefined ? bio : usuarioAtual.bio,
                    avatar_url: avatar_url !== undefined ? avatar_url : usuarioAtual.avatar_url,
                    email: email || usuarioAtual.email,
                    senha_hash: senhaFinal 
                },
                select: {
                    userId: true,
                    username: true,
                    email: true,
                    bio: true,
                    avatar_url: true 
                }
            });

            res.status(200).json({ mensagem: "Perfil atualizado com sucesso!", perfil: usuarioAtualizado });
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro interno ao atualizar o perfil." });
        }
    }
}