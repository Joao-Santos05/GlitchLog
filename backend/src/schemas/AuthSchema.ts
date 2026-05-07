import { z } from 'zod';

export const forgotPasswordSchema = z.object({
    body: z.object({
        email: z.string({ message: "E-mail é obrigatório" }).email("Formato de e-mail inválido")
    })
});

export const resetPasswordSchema = z.object({
    body: z.object({
        token: z.string({ message: "Token é obrigatório" }),
        novaSenha: z.string({ message: "Nova senha é obrigatória" }).min(6, "A nova senha deve ter no mínimo 6 caracteres")
    })
});

export const enable2FASchema = z.object({
    body: z.object({
        token: z.string({ message: "Código 2FA é obrigatório" }).min(6).max(6)
    })
});
