import { z } from 'zod';

export const adicionarReviewSchema = z.object({
    body: z.object({
        id_igdb: z.number({ message: "ID do jogo é obrigatório" }),
        name: z.string({ message: "Nome do jogo é obrigatório" }),
        cover_url: z.string().optional(),
        nota: z.number({ message: "Nota é obrigatória" }).min(0).max(10),
        reviewText: z.string().optional()
    })
});

export const atualizarReviewSchema = z.object({
    params: z.object({
        reviewId: z.string().regex(/^\d+$/, "reviewId deve ser um número válido")
    }),
    body: z.object({
        nota: z.number().min(0).max(10).optional(),
        reviewText: z.string().optional()
    })
});

export const listarReviewsSchema = z.object({
    params: z.object({
        id_igdb: z.string().regex(/^\d+$/, "id_igdb deve ser um número válido")
    }),
    query: z.object({
        sort: z.enum(['recent', 'likes']).optional()
    })
});

export const reviewIdParamSchema = z.object({
    params: z.object({
        reviewId: z.string().regex(/^\d+$/, "reviewId deve ser um número válido")
    })
});

export const usernameParamSchema = z.object({
    params: z.object({
        username: z.string({ message: "Username é obrigatório" })
    })
});
