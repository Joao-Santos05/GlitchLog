import { type Request, type Response } from 'express';
import { GameService } from '../services/GameService';

export class GameController {
    static async buscarJogo(req: Request, res: Response) {
        const nomeDoJogo = req.query.nome as string | undefined;
        const genre = req.query.genre as string | undefined;
        const minRatingRaw = req.query.minRating;
        const minRating = minRatingRaw ? Number(minRatingRaw) : undefined;

        const jogos = await GameService.buscarJogo(nomeDoJogo, genre, minRating);
        res.status(200).json(jogos);
    }

    static async getTrendingGames(req: Request, res: Response) {
        const jogos = await GameService.getTrendingGames();
        res.status(200).json(jogos);
    }

    static async buscarDetalhesPorId(req: Request, res: Response) {
        const { id } = req.params;
        const igdbId = Number(id);
        const jogo = await GameService.buscarDetalhesPorId(igdbId);
        res.status(200).json(jogo);
    }
}
