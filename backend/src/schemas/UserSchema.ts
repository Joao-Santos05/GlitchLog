import { z } from 'zod';

export const criarUsuarioSchema = z.object({
    body: z.object({
        nome: z.string({ message: "Nome é obrigatório" }).min(2, "Nome deve ter no mínimo 2 caracteres"),
        username: z.string({ message: "Username é obrigatório" }).min(3, "Username deve ter no mínimo 3 caracteres"),
        email: z.string({ message: "E-mail é obrigatório" }).email("Formato de e-mail inválido"),
        senha: z.string({ message: "Senha é obrigatória" }).min(6, "Senha deve ter no mínimo 6 caracteres")
    })
});

export const loginSchema = z.object({
    body: z.object({
        email: z.string({ message: "E-mail é obrigatório" }).email("Formato de e-mail inválido"),
        senha: z.string({ message: "Senha é obrigatória" })
    })
});

export const atualizarPerfilSchema = z.object({
    body: z.object({
        username: z.string().min(3).optional(),
        bio: z.string().optional(),
        email: z.string().email().optional(),
        oldPassword: z.string().optional(),
        newPassword: z.string().min(6).optional(),
        avatar_url: z.string().url().optional(),
        background_url: z.string().url().optional(),
        wishlist_is_public: z.boolean().optional()
    })
});

export const buscarPerfilPublicoSchema = z.object({
    params: z.object({
        username: z.string({ message: "Username é obrigatório" })
    })
});
