import { z } from 'zod';

export const adicionarFavoritoSchema = z.object({
    body: z.object({
        id_igdb: z.number({ message: "ID do jogo é obrigatório" }),
        name: z.string({ message: "Nome do jogo é obrigatório" }),
        cover_url: z.string().optional(),
        slot: z.number({ message: "Slot é obrigatório" }).min(1).max(4)
    })
});

export const removerFavoritoSchema = z.object({
    params: z.object({
        slot: z.string().regex(/^[1-4]$/, "slot deve ser um número de 1 a 4")
    })
});
