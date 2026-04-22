import { type Request, type Response } from 'express';
import { GameService } from '../services/GameService';

export class GameController {
    static async buscarJogo(req: Request, res: Response) {
        try {
            const nomeDoJogo = typeof req.query.nome === 'string' ? req.query.nome : '';
            const jogos = await GameService.buscarJogo(nomeDoJogo);
            res.status(200).json(jogos);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao buscar jogos no IGDB." });
        }
    }

    static async buscarDetalhesPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const igdbId = Number(id);
            const jogo = await GameService.buscarDetalhesPorId(igdbId);
            res.status(200).json(jogo);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao buscar os detalhes do jogo." });
        }
    }
}
