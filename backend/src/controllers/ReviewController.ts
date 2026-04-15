import { type Request, type Response } from 'express';
import prisma from '../libs/prisma';

export class ReviewController {
    
    // NOTA: Trocar a lógica futuramente para criar review e adicionar jogo aconteçam em uma única transação, para evitar que tenhamos reviews "soltas" de jogos que não estão na biblioteca do usuário. Por enquanto, deixei separado para facilitar os testes.
    static async criarReview(req: Request, res: Response) {
        try {
            const userId = (req as any).userId; 
            const { id_igdb } = req.params;
            const { nota, reviewText } = req.body; 

            const jogoId = Number(id_igdb);

            // Validações
            if (isNaN(jogoId)) {
                res.status(400).json({ erro: "ID do jogo inválido." });
                return;
            }
            
            if (nota === undefined || nota < 0.5 || nota > 5 || nota % 0.5 !== 0) {
                res.status(400).json({ erro: "A nota deve ser entre 0.5 e 5.0, em incrementos de 0.5." });
                return;
            }

                const jogoExiste = await prisma.game.findUnique({
                where: { id_igdb: jogoId }
            });

            if (!jogoExiste) {
                res.status(404).json({ erro: "O jogo precisa ser carregado no sistema antes de ser avaliado." });
                return;
            }

            // Upsert: Salva a nota/texto isoladamente
            const reviewSalva = await prisma.review.upsert({
                where: {
                    userId_id_igdb: {
                        userId: userId,
                        id_igdb: jogoId
                    }
                },
                update: {
                    nota: nota,
                    reviewText: reviewText
                },
                create: {
                    nota: nota,
                    reviewText: reviewText,
                    userId: userId,
                    id_igdb: jogoId
                }
            });

            res.status(201).json({ 
                mensagem: "Review salva com sucesso!", 
                review: reviewSalva 
            });

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao processar a review." });
        }
    }

    static async deletarReview(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const { id_igdb } = req.params;
            
            const jogoId = Number(id_igdb);

            if (isNaN(jogoId)) {
                res.status(400).json({ erro: "ID do jogo inválido." });
                return;
            }

            // Deleta a review específica daquele usuário para aquele jogo
            const deletado = await prisma.review.deleteMany({
                where: { 
                    userId: userId, 
                    id_igdb: jogoId 
                }
            });

            if (deletado.count === 0) {
                res.status(404).json({ erro: "Review não encontrada." });
                return;
            }

            res.status(200).json({ mensagem: "Review apagada com sucesso." });

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao deletar a review." });
        }
    }

    static async listarReviews(req: Request, res: Response) {
        try {
            const { id_igdb } = req.params;
            const jogoId = Number(id_igdb);

            if (isNaN(jogoId)) {
                res.status(400).json({ erro: "ID do jogo inválido." });
                return;
            }

            const reviews = await prisma.review.findMany({
                where: { id_igdb: jogoId },
                include: {
                    user: {
                        select: {
                            username: true,
                            avatar_url: true
                        }
                    }
                },
                // NOTA: Adicionar outras formas de ordenação futuramente (ex: mais curtidas, mais recentes, etc)
                orderBy: {
                    reviewId: 'desc' 
                }
            });

            res.status(200).json(reviews);

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar as reviews." });
        }
    }

    static async listarReviewsDoUsuario(req: Request, res: Response) {
        try {
            const { username } = req.params;

            const reviews = await prisma.review.findMany({
                where: {
                    user: {
                        username: String(username).toLowerCase()
                    }
                },
                orderBy: {
                    createdAt: 'desc' // Traz as mais recentes primeiro
                },
                select: {
                    reviewId: true,
                    nota: true,
                    reviewText: true,
                    createdAt: true,
                    updatedAt: true,
                    // Traz os detalhes do jogo avaliado
                    game: {
                        select: {
                            id_igdb: true,
                            name: true,
                            cover_url: true
                        }
                    },
                    // Traz a contagem de interações sociais
                    _count: {
                        select: {
                            curtidas: true,
                            comentarios: true
                        }
                    }
                }
            });

            res.status(200).json(reviews);

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro interno ao buscar as reviews do usuário." });
        }
    }

    static async toggleLike(req: Request, res: Response) {
        try {
            const userId = (req as any).userId;
            const reviewId = parseInt(String(req.params.reviewId));
    
            if (isNaN(reviewId)) {
                return res.status(400).json({ erro: "ID da review inválido." });
            }
    
            const reviewExiste = await prisma.review.findUnique({
                where: { reviewId: reviewId }
            });
    
            if (!reviewExiste) {
                return res.status(404).json({ erro: "Review não encontrada." });
            }
    
            const likeExistente = await prisma.reviewLike.findUnique({
                where: {
                    userId_reviewId: {
                        userId: userId,
                        reviewId: reviewId
                    }
                }
            });
    
            if (likeExistente) {
                await prisma.reviewLike.delete({
                    where: {
                        userId_reviewId: {
                            userId: userId,
                            reviewId: reviewId
                        }
                    }
                });
                return res.status(200).json({ mensagem: "Like removido.", curtiu: false });
            } else {
                await prisma.reviewLike.create({
                    data: {
                        userId: userId,
                        reviewId: reviewId
                    }
                });
                return res.status(201).json({ mensagem: "Review curtida!", curtiu: true });
            }
    
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ erro: "Erro interno ao processar o like." });
        }
    }
}
