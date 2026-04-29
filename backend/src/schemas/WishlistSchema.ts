import { z } from 'zod';

export const adicionarWishlistSchema = z.object({
    body: z.object({
        id_igdb: z.number({ message: "ID do jogo é obrigatório" })
    })
});

export const removerWishlistSchema = z.object({
    params: z.object({
        id_igdb: z.string().regex(/^\d+$/, "id_igdb deve ser um número válido")
    })
});

export const listarWishlistSchema = z.object({
    params: z.object({
        username: z.string({ message: "Username é obrigatório" })
    })
});
