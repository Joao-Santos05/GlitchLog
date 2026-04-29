import { z } from 'zod';

export const createListSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'O título é obrigatório').max(100, 'O título deve ter no máximo 100 caracteres'),
    summary: z.string().max(500, 'O resumo deve ter no máximo 500 caracteres').optional(),
    isPublic: z.boolean().optional(),
  })
});

export const updateListSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'O título é obrigatório').max(100, 'O título deve ter no máximo 100 caracteres').optional(),
    summary: z.string().max(500, 'O resumo deve ter no máximo 500 caracteres').optional().nullable(),
    isPublic: z.boolean().optional(),
  })
});

export const addGamesToListSchema = z.object({
  body: z.object({
    games: z.array(
      z.object({
        id_igdb: z.number().int().positive('ID do jogo inválido'),
        ordem: z.number().int().min(1, 'A ordem deve ser maior ou igual a 1'),
      })
    ).min(1, 'A lista de jogos não pode estar vazia'),
  })
});