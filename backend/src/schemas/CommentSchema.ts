import { z } from 'zod';

export const adicionarComentarioSchema = z.object({
    params: z.object({
        reviewId: z.string().regex(/^\d+$/, "reviewId deve ser um número válido")
    }),
    body: z.object({
        content: z.string({ message: "O conteúdo do comentário é obrigatório" }).min(1, "O comentário não pode ser vazio")
    })
});

export const commentIdParamSchema = z.object({
    params: z.object({
        commentId: z.string().regex(/^\d+$/, "commentId deve ser um número válido")
    })
});
