import { type Request, type Response } from 'express';
import { ReviewService } from '../services/ReviewService';

export class ReviewController {
    
    static async criarReview(req: Request, res: Response) {
        try {
            const userId = req.userId; 
            const id_igdb = Number(req.params.id_igdb);
            const resultado = await ReviewService.criarReview(userId, id_igdb, req.body);

            res.status(201).json(resultado);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao processar a review." });
        }
    }

    static async deletarReview(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const id_igdb = Number(req.params.id_igdb);
            
            const resultado = await ReviewService.deletarReview(userId, id_igdb);
            res.status(200).json(resultado);

        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao deletar a review." });
        }
    }

    static async listarReviews(req: Request, res: Response) {
        try {
            const id_igdb = Number(req.params.id_igdb);
            const sort = typeof req.query.sort === 'string' ? req.query.sort : undefined; 

            const reviews = await ReviewService.listarReviews(id_igdb, sort);
            res.status(200).json(reviews);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao listar reviews." });
        }
    }

    static async listarReviewsDoUsuario(req: Request, res: Response) {
        try {
            const { username } = req.params;
            const reviews = await ReviewService.listarReviewsDoUsuario(typeof username === 'string' ? username : '');
            res.status(200).json(reviews);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro interno ao buscar as reviews do usuário." });
        }
    }

    static async toggleLike(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const reviewId = Number(req.params.reviewId);
    
            const resultado = await ReviewService.toggleLike(userId, reviewId);
            res.status(resultado.mensagem === "Review curtida!" ? 201 : 200).json(resultado);
    
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro interno ao processar o like." });
        }
    }
}
