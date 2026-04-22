import { type Request, type Response, type NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(erro: any, req: Request, res: Response, next: NextFunction) {
    if (erro instanceof ZodError) {
        res.status(400).json({
            erro: "Erro de validação.",
            detalhes: erro.issues.map(e => ({ campo: e.path.join('.'), mensagem: e.message }))
        });
        return;
    }

    if (erro.status && erro.message) {
        res.status(erro.status).json({ erro: erro.message });
        return;
    }

    // Caso seja erro do Prisma sobre registro já existente ou não encontrado, podemos tratar também
    if (erro.code === 'P2002') {
        res.status(409).json({ erro: "Já existe um registro com estes dados." });
        return;
    }

    if (erro.code === 'P2025') {
        res.status(404).json({ erro: "Registro não encontrado." });
        return;
    }

    console.error("Erro interno:", erro);
    res.status(500).json({ erro: "Erro interno do servidor." });
}
