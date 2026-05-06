import prisma from '../libs/prisma';
import { NotificationService } from './NotificationService';

export class CommentService {
    static async adicionarComentario(userId: number, reviewId: number, content: string) {
        if (isNaN(reviewId) || !content) {
            throw { status: 400, message: "ID da review ou conteúdo inválidos." };
        }

        const comentario = await prisma.comment.create({
            data: {
                content: content,
                userId: userId,
                reviewId: reviewId
            },
            include: {
                user: { select: { username: true, avatar_url: true } }
            }
        });

        const review = await prisma.review.findUnique({ where: { reviewId }, select: { userId: true, game: { select: { name: true } } } });
        const commentAuthor = await prisma.user.findUnique({ where: { userId } });
        if (review && commentAuthor && review.userId !== userId) {
            await NotificationService.createNotification(
                review.userId,
                'NEW_COMMENT',
                `${commentAuthor.username} comentou na sua review de ${review.game.name}.`
            );
        }

        return { mensagem: "Comentário adicionado!", comentario };
    }

    static async listarComentarios(reviewId: number) {
        if (isNaN(reviewId)) {
            throw { status: 400, message: "ID da review inválido." };
        }

        const comentarios = await prisma.comment.findMany({
            where: { reviewId: reviewId },
            orderBy: { curtidas: { _count: 'desc' } }, 
            include: {
                user: { select: { username: true, avatar_url: true } },
                _count: { select: { curtidas: true } }
            }
        });

        return comentarios;
    }

    static async deletarComentario(userId: number, commentId: number) {
        const comentario = await prisma.comment.findUnique({
            where: { commentID: commentId }
        });

        if (!comentario) {
            throw { status: 404, message: "Comentário não encontrado." };
        }
        
        if (comentario.userId !== userId) {
            throw { status: 403, message: "Você não tem permissão para apagar este comentário." };
        }

        await prisma.comment.delete({
            where: { commentID: commentId }
        });

        return { mensagem: "Comentário apagado com sucesso!" };
    }

    static async toggleLike(userId: number, commentId: number) {
        if (isNaN(commentId)) {
            throw { status: 400, message: "ID do comentário inválido." };
        }

        const commentExiste = await prisma.comment.findUnique({ where: { commentID: commentId } });
        if (!commentExiste) {
            throw { status: 404, message: "Comentário não encontrado." };
        }

        const likeExistente = await prisma.commentLike.findUnique({
            where: { userId_commentID: { userId, commentID: commentId } }
        });

        if (likeExistente) {
            await prisma.commentLike.delete({ where: { userId_commentID: { userId, commentID: commentId } } });
            return { mensagem: "Like removido do comentário.", curtiu: false };
        } else {
            await prisma.commentLike.create({ data: { userId, commentID: commentId } });

            const comment = await prisma.comment.findUnique({ where: { commentID: commentId }, select: { userId: true } });
            const liker = await prisma.user.findUnique({ where: { userId } });
            if (comment && liker && comment.userId !== userId) {
                await NotificationService.createNotification(
                    comment.userId,
                    'NEW_LIKE_COMMENT',
                    `${liker.username} curtiu seu comentário.`
                );
            }

            return { mensagem: "Comentário curtido!", curtiu: true };
        }
    }
}
