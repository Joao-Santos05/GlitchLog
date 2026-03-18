import { type Request,type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: number;
    nome: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Pega o token que vem no cabeçalho 
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ erro: "Acesso negado. Cabeçalho de autorização não fornecido." });
        return;
    }

    // Garante que o cabeçalho tem duas partes ("Bearer" e o "Token")
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2) {
        res.status(401).json({ erro: "Formato de token inválido. Use: Bearer <token>" });
        return;
    }

    const token = parts[1] as string;

    try {
        const segredo = process.env.JWT_SECRET as string;
        
        // Resolvemos o conflito de tipos convertendo primeiro para 'unknown'
        const decoded = jwt.verify(token, segredo) as unknown as TokenPayload;

        // Injetamos o ID na requisição
        (req as any).userId = decoded.id; 
        
        next(); //passar para o Controller
    } catch (erro) {
        res.status(401).json({ erro: "Token inválido ou expirado." });
    }
}