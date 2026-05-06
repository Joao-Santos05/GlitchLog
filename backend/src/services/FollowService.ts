import prisma from '../libs/prisma';
import { NotificationService } from './NotificationService';

export class FollowService {
    static async toggleFollow(followerId: number, followingUsername: string) {
        if (!followingUsername) {
            throw { status: 400, message: "Username do usuário a ser seguido é obrigatório." };
        }

        const usuarioAlvo = await prisma.user.findUnique({
            where: { username: followingUsername.toLowerCase() }
        });

        if (!usuarioAlvo) {
            throw { status: 404, message: "Usuário não encontrado." };
        }

        if (usuarioAlvo.userId === followerId) {
            throw { status: 400, message: "Você não pode seguir a si mesmo." };
        }

        const jaSegue = await prisma.userFollow.findUnique({
            where: {
                followerID_followingID: {
                    followerID: followerId,
                    followingID: usuarioAlvo.userId
                }
            }
        });

        if (jaSegue) {
            // Unfollow
            await prisma.userFollow.delete({
                where: {
                    followerID_followingID: {
                        followerID: followerId,
                        followingID: usuarioAlvo.userId
                    }
                }
            });
            return { mensagem: `Você deixou de seguir ${usuarioAlvo.username}.`, status: 'unfollowed' };
        } else {
            // Follow
            await prisma.userFollow.create({
                data: {
                    followerID: followerId,
                    followingID: usuarioAlvo.userId
                }
            });
            
            const follower = await prisma.user.findUnique({ where: { userId: followerId } });
            if (follower) {
                await NotificationService.createNotification(
                    usuarioAlvo.userId,
                    'NEW_FOLLOWER',
                    `${follower.username} começou a seguir você.`
                );
            }

            return { mensagem: `Você agora está seguindo ${usuarioAlvo.username}.`, status: 'followed' };
        }
    }

    static async getFollowers(username: string) {
        const usuario = await prisma.user.findUnique({
            where: { username: username.toLowerCase() },
            select: {
                seguidores: {
                    select: {
                        seguidor: {
                            select: {
                                username: true,
                                avatar_url: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!usuario) {
            throw { status: 404, message: "Usuário não encontrado." };
        }

        return usuario.seguidores.map(f => f.seguidor);
    }

    static async getFollowing(username: string) {
        const usuario = await prisma.user.findUnique({
            where: { username: username.toLowerCase() },
            select: {
                seguindo: {
                    select: {
                        seguido: {
                            select: {
                                username: true,
                                avatar_url: true,
                                name: true
                            }
                        }
                    }
                }
            }
        });

        if (!usuario) {
            throw { status: 404, message: "Usuário não encontrado." };
        }

        return usuario.seguindo.map(f => f.seguido);
    }
}
