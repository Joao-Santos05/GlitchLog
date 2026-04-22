import { type Request, type Response } from 'express';
import { GameService } from '../services/GameService';

export class GameController {
    static async buscarJogo(req: Request, res: Response) {
        const nomeDoJogo = typeof req.query.nome === 'string' ? req.query.nome : '';
        const jogos = await GameService.buscarJogo(nomeDoJogo);
        res.status(200).json(jogos);
    }

    static async buscarDetalhesPorId(req: Request, res: Response) {
        const { id } = req.params;
        const igdbId = Number(id);
        const jogo = await GameService.buscarDetalhesPorId(igdbId);
        res.status(200).json(jogo);
    }
}
