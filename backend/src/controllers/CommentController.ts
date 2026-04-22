import { type Request, type Response } from 'express';
import { CommentService } from '../services/CommentService';

export class CommentController {
    
    static async adicionarComentario(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const reviewId = Number(req.params.reviewId);
            const { content } = req.body;

            const resultado = await CommentService.adicionarComentario(userId, reviewId, content);
            res.status(201).json(resultado);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao adicionar comentário." });
        }
    }

    static async listarComentarios(req: Request, res: Response) {
        try {
            const reviewId = Number(req.params.reviewId);
            const comentarios = await CommentService.listarComentarios(reviewId);
            res.status(200).json(comentarios);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao buscar comentários." });
        }
    }

    static async deletarComentario(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const commentId = Number(req.params.commentId);

            const resultado = await CommentService.deletarComentario(userId, commentId);
            res.status(200).json(resultado);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao deletar comentário." });
        }
    }

    static async toggleLike(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const commentId = Number(req.params.commentId);

            const resultado = await CommentService.toggleLike(userId, commentId);
            res.status(resultado.mensagem === "Comentário curtido!" ? 201 : 200).json(resultado);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao processar like no comentário." });
        }
    }
}
