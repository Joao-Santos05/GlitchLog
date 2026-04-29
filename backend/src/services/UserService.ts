import prisma from '../libs/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserService {
    static async criarUsuario(data: any) {
        const { nome, username, email, senha } = data;

        if (!nome || !username || !email || !senha) {
            throw { status: 400, message: "Nome, username, email e senha são obrigatórios." };
        }

        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
        
        try {
            const novoUsuario = await prisma.user.create({
                data: { 
                    name: nome, 
                    username: username.toLowerCase(),
                    email: email, 
                    senha_hash: senhaCriptografada 
                }
            });
            
            const { senha_hash: _, ...usuarioSeguro } = novoUsuario;
            return usuarioSeguro;
        } catch (erro: any) {
            if (erro.code === 'P2002') {
                throw { status: 409, message: "Este email ou username já está em uso!" };
            }
            throw erro;
        }
    }

    static async login(data: any) {
        const { email, senha } = data;

        if (!email || !senha) {
            throw { status: 400, message: "Email e senha são obrigatórios." };
        }

        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            throw { status: 404, message: "Usuário não encontrado." };
        }

        const senhaValida = await bcrypt.compare(senha, user.senha_hash);
        
        if (!senhaValida) {
            throw { status: 401, message: "Senha incorreta." };
        }

        const segredo = process.env.JWT_SECRET;
        if (!segredo) throw { status: 500, message: "JWT_SECRET não configurado." };
        const token = jwt.sign(
            { id: user.userId, nome: user.name },
            segredo,
            { expiresIn: '7d' }
        );

        return {
            mensagem: "Login realizado com sucesso!",
            token: token,
            user: {
                id: user.userId,
                nome: user.name,
                avatar: user.avatar_url
            }
        };
    }

    static async excluirUsuario(userId: number) {
        const usuarioExiste = await prisma.user.findUnique({
            where: { userId: userId }
        });

        if (!usuarioExiste) {
            throw { status: 404, message: "Usuário não encontrado." };
        }

        await prisma.libraryEntry.deleteMany({
            where: { userId: userId }
        });

        await prisma.user.delete({
            where: { userId: userId }
        });

        return { mensagem: "Sua conta e biblioteca foram excluídas com sucesso!" };
    }

    static async listarUsuarios() {
        const usuarios = await prisma.user.findMany({
            select: {
                userId: true,
                username: true,
                bio: true,
                avatar_url: true 
            }
        });
        return usuarios;
    }

    static async buscarPerfilPublico(username: string) {
        const usuario = await prisma.user.findUnique({
            where: { username: typeof username === 'string' ? username.toLowerCase() : '' }, 
            select: {
                userId: true,
                username: true,
                bio: true,
                avatar_url: true,
                background_url: true,
                _count: {
                    select: {
                        seguidores: true,
                        seguindo: true
                    }
                },
                favoritos: {
                    select: {
                        slot: true,
                        game: {
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
                },
                reviews: {
                    take: 3,
                    orderBy: {
                        createdAt: 'desc'
                    },
                    select: {
                        reviewId: true,
                        nota: true,
                        reviewText: true,
                        game: {
                            select: { id_igdb: true, name: true, cover_url: true }
                        }
                    }
                },
            }
        });

        if (!usuario) {
            throw { status: 404, message: "Usuário não encontrado." };
        }

        return usuario;
    }

    static async meuPerfil(userId: number) {
        const meuPerfil = await prisma.user.findUnique({
            where: { userId: userId },
            select: {
                userId: true,
                username: true,
                email: true,
                bio: true,
                avatar_url: true, 
                background_url: true,
                wishlist_is_public: true,
                _count: {
                    select: {
                        seguidores: true,
                        seguindo: true
                    }
                },
                favoritos: {
                    select: {
                        slot: true,
                        game: {
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
                },
                reviews: {
                    take: 3,
                    orderBy: {
                        createdAt: 'desc'
                    },
                    select: {
                        reviewId: true,
                        nota: true,
                        reviewText: true,
                        game: {
                            select: { id_igdb: true, name: true, cover_url: true }
                        }
                    }
                },
            }
        });

        if (!meuPerfil) {
            throw { status: 404, message: "Usuário não encontrado." };
        }

        return meuPerfil;
    }

    static async atualizarPerfil(userId: number, data: any) {
        const { username, bio, email, oldPassword, newPassword, avatar_url, background_url, wishlist_is_public } = data;

        const usuarioAtual = await prisma.user.findUnique({
            where: { userId: userId }
        });

        if (!usuarioAtual) {
            throw { status: 404, message: "Usuário não encontrado." };
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
                throw { status: 409, message: "Este nome de usuário ou e-mail já está em uso." };
            }
        }

        const mudandoEmail = email && email !== usuarioAtual.email;
        const mudandoSenha = newPassword !== undefined && newPassword !== "";
        let senhaFinal = usuarioAtual.senha_hash;

        if (mudandoEmail || mudandoSenha) {
            if (!oldPassword) {
                throw { status: 400, message: "Para alterar seu e-mail ou senha, confirme sua senha atual." };
            }

            const senhaBate = await bcrypt.compare(oldPassword, usuarioAtual.senha_hash);
            if (!senhaBate) {
                throw { status: 401, message: "A senha atual está incorreta." };
            }

            if (mudandoSenha) {
                senhaFinal = await bcrypt.hash(newPassword, 10);
            }
        }

        const usuarioAtualizado = await prisma.user.update({
            where: { userId: userId },
            data: {
                username: username || usuarioAtual.username,
                bio: bio !== undefined ? bio : usuarioAtual.bio,
                avatar_url: avatar_url !== undefined ? avatar_url : usuarioAtual.avatar_url,
                background_url: background_url !== undefined ? background_url : usuarioAtual.background_url,
                wishlist_is_public: wishlist_is_public !== undefined ? wishlist_is_public : usuarioAtual.wishlist_is_public,
                email: email || usuarioAtual.email,
                senha_hash: senhaFinal 
            },
            select: {
                userId: true,
                username: true,
                email: true,
                bio: true,
                avatar_url: true,
                background_url: true,
                wishlist_is_public: true
            }
        });

        return { mensagem: "Perfil atualizado com sucesso!", perfil: usuarioAtualizado };
    }
}
