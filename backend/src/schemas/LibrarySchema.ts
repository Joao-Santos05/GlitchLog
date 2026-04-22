import { z } from 'zod';

export const adicionarJogoBibliotecaSchema = z.object({
    body: z.object({
        id_igdb: z.number({ message: "ID do jogo é obrigatório" }),
        name: z.string({ message: "Nome do jogo é obrigatório" }),
        cover_url: z.string().optional(),
        status: z.enum(['QUERO_JOGAR', 'JOGANDO', 'FINALIZADO', 'ABANDONADO'], { 
            message: "Status inválido" 
        })
    })
});

export const atualizarStatusJogoSchema = z.object({
    params: z.object({
        id_igdb: z.string().regex(/^\d+$/, "id_igdb deve ser um número válido")
    }),
    body: z.object({
        status: z.enum(['QUERO_JOGAR', 'JOGANDO', 'FINALIZADO', 'ABANDONADO'], { 
            message: "Status inválido" 
        })
    })
});

export const removerJogoBibliotecaSchema = z.object({
    params: z.object({
        id_igdb: z.string().regex(/^\d+$/, "id_igdb deve ser um número válido")
    })
});
