import { type Request, type Response } from 'express';
import { CommentService } from '../services/CommentService';

export class CommentController {
    
    static async adicionarComentario(req: Request, res: Response) {
        const userId = req.userId;
        const reviewId = Number(req.params.reviewId);
        const { content } = req.body;

        const resultado = await CommentService.adicionarComentario(userId, reviewId, content);
        res.status(201).json(resultado);
    }

    static async listarComentarios(req: Request, res: Response) {
        const reviewId = Number(req.params.reviewId);
        const comentarios = await CommentService.listarComentarios(reviewId);
        res.status(200).json(comentarios);
    }

    static async deletarComentario(req: Request, res: Response) {
        const userId = req.userId;
        const commentId = Number(req.params.commentId);

        const resultado = await CommentService.deletarComentario(userId, commentId);
        res.status(200).json(resultado);
    }

    static async toggleLike(req: Request, res: Response) {
        const userId = req.userId;
        const commentId = Number(req.params.commentId);

        const resultado = await CommentService.toggleLike(userId, commentId);
        res.status(resultado.mensagem === "Comentário curtido!" ? 201 : 200).json(resultado);
    }
}
