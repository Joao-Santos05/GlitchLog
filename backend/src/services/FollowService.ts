import prisma from '../libs/prisma';

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
            
            // Opcional: Criar notificação
            await prisma.notification.create({
                data: {
                    userId: usuarioAlvo.userId,
                    type: `NEW_FOLLOWER_${followerId}`
                }
            });

            return { mensagem: `Você agora está seguindo ${usuarioAlvo.username}.`, status: 'followed' };
        }
    }
}
