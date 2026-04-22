import { type Request, type Response } from 'express';
import { FavoriteService } from '../services/FavoriteService';

export class FavoriteController {
    static async definirFavorito(req: Request, res: Response) {
        const userId = req.userId; 
        const { id_igdb, slot } = req.body;

        const resultado = await FavoriteService.definirFavorito(userId, id_igdb, slot);
        res.status(200).json(resultado);
    }
}
