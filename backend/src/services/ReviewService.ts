import prisma from '../libs/prisma';

export class ReviewService {
    static async criarReview(userId: number, id_igdb: number, data: any) {
        const { nota, reviewText } = data; 
        const jogoId = Number(id_igdb);

        if (isNaN(jogoId)) {
            throw { status: 400, message: "ID do jogo inválido." };
        }
        
        if (nota === undefined || nota < 0.5 || nota > 5 || nota % 0.5 !== 0) {
            throw { status: 400, message: "A nota deve ser entre 0.5 e 5.0, em incrementos de 0.5." };
        }

        const jogoExiste = await prisma.game.findUnique({
            where: { id_igdb: jogoId }
        });

        if (!jogoExiste) {
            throw { status: 404, message: "O jogo precisa ser carregado no sistema antes de ser avaliado." };
        }

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

        return { 
            mensagem: "Review salva com sucesso!", 
            review: reviewSalva 
        };
    }

    static async deletarReview(userId: number, id_igdb: number) {
        const jogoId = Number(id_igdb);

        if (isNaN(jogoId)) {
            throw { status: 400, message: "ID do jogo inválido." };
        }

        const deletado = await prisma.review.deleteMany({
            where: { 
                userId: userId, 
                id_igdb: jogoId 
            }
        });

        if (deletado.count === 0) {
            throw { status: 404, message: "Review não encontrada." };
        }

        return { mensagem: "Review apagada com sucesso." };
    }

    static async listarReviews(id_igdb: number, sort: string | undefined) {
        let orderLogic: any = { createdAt: 'desc' }; 

        if (sort === 'popular') {
            orderLogic = { curtidas: { _count: 'desc' } };
        }

        const reviews = await prisma.review.findMany({
            where: { id_igdb: id_igdb },
            orderBy: orderLogic,
            include: {
                user: { select: { username: true, avatar_url: true } },
                _count: { select: { curtidas: true, comentarios: true } }
            }
        });

        return reviews;
    }

    static async listarReviewsDoUsuario(username: string) {
        const reviews = await prisma.review.findMany({
            where: {
                user: {
                    username: typeof username === 'string' ? username.toLowerCase() : ''
                }
            },
            orderBy: {
                createdAt: 'desc' 
            },
            select: {
                reviewId: true,
                nota: true,
                reviewText: true,
                createdAt: true,
                updatedAt: true,
                game: {
                    select: {
                        id_igdb: true,
                        name: true,
                        cover_url: true
                    }
                },
                _count: {
                    select: {
                        curtidas: true,
                        comentarios: true
                    }
                }
            }
        });

        return reviews;
    }

    static async toggleLike(userId: number, reviewId: number) {
        if (isNaN(reviewId)) {
            throw { status: 400, message: "ID da review inválido." };
        }

        const reviewExiste = await prisma.review.findUnique({
            where: { reviewId: reviewId }
        });

        if (!reviewExiste) {
            throw { status: 404, message: "Review não encontrada." };
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
            return { mensagem: "Like removido.", curtiu: false };
        } else {
            await prisma.reviewLike.create({
                data: {
                    userId: userId,
                    reviewId: reviewId
                }
            });
            return { mensagem: "Review curtida!", curtiu: true };
        }
    }
}
