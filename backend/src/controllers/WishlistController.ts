import { type Request, type Response } from 'express';
import { WishlistService } from '../services/WishlistService';

export class WishlistController {
    static async adicionarJogo(req: Request, res: Response) {
        const userId = req.userId; 
        const { id_igdb } = req.body;

        const resultado = await WishlistService.adicionarJogo(userId, id_igdb);
        res.status(201).json(resultado);
    }

    static async listarWishlist(req: Request, res: Response) {
        const { username } = req.params;
        const loggedUserId = req.userId; // Pode ser undefined se a rota não usar authMiddleware estrito, ou definiremos o authMiddleware como opcional se a wishlist for pública

        const wishlist = await WishlistService.listarWishlist(typeof username === 'string' ? username : '', loggedUserId);
        res.status(200).json(wishlist);
    }

    static async removerJogo(req: Request, res: Response) {
        const userId = req.userId; 
        const { id_igdb } = req.params;
        
        const resultado = await WishlistService.removerJogo(userId, Number(id_igdb));
        res.status(200).json(resultado);
    }
}
