import { type Request, type Response, type NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
    id: number;
    nome: string;
}

export function optionalAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return next(); // Não tem token, continua sem req.userId
    }

    const parts = authHeader.split(' ');
    
    if (parts.length !== 2) {
        return next(); // Token malformado, continua sem req.userId
    }

    const token = parts[1];
    if (!token) {
        return next();
    }

    try {
        const segredo = process.env.JWT_SECRET;
        if (!segredo) throw new Error("JWT_SECRET is missing");
        
        const decoded = jwt.verify(token, segredo) as unknown as TokenPayload;

        req.userId = decoded.id; 
        next();
    } catch (erro) {
        // Se o token for inválido, continua sem userId
        next();
    }
}
