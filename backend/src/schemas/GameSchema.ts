import { z } from 'zod';

export const buscarJogoSchema = z.object({
    query: z.object({
        nome: z.string().min(1, "O nome do jogo não pode estar vazio.").optional(),
        genre: z.string().optional(),
        minRating: z.string().optional().transform(val => val ? parseFloat(val) : undefined)
    }).refine(data => data.nome || data.genre, {
        message: "Forneça um nome ou um gênero para buscar.",
        path: ["query"]
    })
});

export const buscarDetalhesPorIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "ID do jogo deve ser um número válido")
    })
});
