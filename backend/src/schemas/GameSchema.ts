import { z } from 'zod';

export const buscarJogoSchema = z.object({
    query: z.object({
        nome: z.string({ message: "O parâmetro nome é obrigatório na busca." }).min(1, "O nome do jogo não pode estar vazio.")
    })
});

export const buscarDetalhesPorIdSchema = z.object({
    params: z.object({
        id: z.string().regex(/^\d+$/, "ID do jogo deve ser um número válido")
    })
});
