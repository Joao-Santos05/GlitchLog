import { type Request, type Response } from 'express';
import prisma from '../libs/prisma';

export class CommentController {
    
    static async adicionarComentario(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const reviewId = parseInt(String(req.params.reviewId));
            const { content } = req.body;

            if (isNaN(reviewId) || !content) {
                return res.status(400).json({ erro: "ID da review ou conteúdo inválidos." });
            }

            const comentario = await prisma.comment.create({
                data: {
                    content: content,
                    userId: userId,
                    reviewId: reviewId
                },
                include: {
                    user: { select: { username: true, avatar_url: true } } // Já devolve quem comentou pro Front
                }
            });

            res.status(201).json({ mensagem: "Comentário adicionado!", comentario });
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao adicionar comentário." });
        }
    }

    static async listarComentarios(req: Request, res: Response) {
        try {
            const reviewId = parseInt(String(req.params.reviewId));

            if (isNaN(reviewId)) return res.status(400).json({ erro: "ID da review inválido." });

            const comentarios = await prisma.comment.findMany({
                where: { reviewId: reviewId },
                orderBy: { curtidas: { _count: 'desc' } }, // Os mais populares primeiro
                include: {
                    user: { select: { username: true, avatar_url: true } },
                    _count: { select: { curtidas: true } }
                }
            });

            res.status(200).json(comentarios);
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar comentários." });
        }
    }

    static async deletarComentario(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const commentID = parseInt(String(req.params.commentId));

            const comentario = await prisma.comment.findUnique({
                where: { commentID: commentID }
            });

            if (!comentario) return res.status(404).json({ erro: "Comentário não encontrado." });
            
            // Trava de segurança: só o dono do comentário pode apagar
            if (comentario.userId !== userId) {
                return res.status(403).json({ erro: "Você não tem permissão para apagar este comentário." });
            }

            await prisma.comment.delete({
                where: { commentID: commentID }
            });

            res.status(200).json({ mensagem: "Comentário apagado com sucesso!" });
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao deletar comentário." });
        }
    }

    static async toggleLike(req: Request, res: Response) {
    try {
        const userId = (req as any).userId;
        const commentId = parseInt(req.params.commentId as string);

        if (isNaN(commentId)) return res.status(400).json({ erro: "ID do comentário inválido." });

        const commentExiste = await prisma.comment.findUnique({ where: { commentID: commentId } });
        if (!commentExiste) return res.status(404).json({ erro: "Comentário não encontrado." });

        // Toggle: Se já existe, deleta. Se não, cria.
        const likeExistente = await prisma.commentLike.findUnique({
            where: { userId_commentID: { userId, commentID: commentId } }
        });

        if (likeExistente) {
            await prisma.commentLike.delete({ where: { userId_commentID: { userId, commentID: commentId } } });
            return res.status(200).json({ mensagem: "Like removido do comentário.", curtiu: false });
        } else {
            await prisma.commentLike.create({ data: { userId, commentID: commentId } });
            return res.status(201).json({ mensagem: "Comentário curtido!", curtiu: true });
        }
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: "Erro ao processar like no comentário." });
    }
}
}