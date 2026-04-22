import { type Request, type Response } from 'express';
import { LibraryService } from '../services/LibraryService';

export class LibraryController {
    static async adicionarJogo(req: Request, res: Response) {
        const userId = req.userId; 
        const { id_igdb, status } = req.body;

        const resultado = await LibraryService.adicionarJogo(userId, id_igdb, status);
        res.status(201).json(resultado);

    }

    static async listarJogos(req: Request, res: Response) {
        const { username } = req.params;

        const biblioteca = await LibraryService.listarJogos(typeof username === 'string' ? username : '');
        res.status(200).json(biblioteca);

    }

    static async atualizarStatus(req: Request, res: Response) {
        const userId = req.userId; 
        const { id_igdb } = req.params;

        const resultado = await LibraryService.atualizarStatus(userId, Number(id_igdb), req.body);
        res.status(200).json(resultado);

    }

    static async removerJogo(req: Request, res: Response) {
        const userId = req.userId; 
        const { id_igdb } = req.params;
        
        const resultado = await LibraryService.removerJogo(userId, Number(id_igdb));
        res.status(200).json(resultado);

    }
}
