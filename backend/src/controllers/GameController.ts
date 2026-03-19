import { type Request, type Response } from 'express';
import { IGDBService } from '../services/igdbService';

export class GameController {
    static async buscarJogo(req: Request, res: Response) {
        try {
            // Lê o parâmetro "?nome=" da URL
            const nomeDoJogo = req.query.nome as string;

            if (!nomeDoJogo) {
                res.status(400).json({ erro: "Você precisa enviar o nome do jogo!" });
                return;
            }

            // CONSULTA COM A BUSCA GENÉRICA:
            const jogosBrutos = await IGDBService.fazerQuery({
                endpoint: 'games',
                fields: ['name', 'cover.url', 'rating', 'summary', 'first_release_date'],
                search: nomeDoJogo,
                limit: 10
            });

            // Percorremos a lista de jogos para "limpar" as URLs das capas
            const jogosLimpos = jogosBrutos.map((jogo: any) => {
                if (jogo.cover && jogo.cover.url) {
                    // Adiciona o https: e troca t_thumb por t_cover_big
                    let urlLimpa = jogo.cover.url.replace('t_thumb', 't_cover_big');
                    if (urlLimpa.startsWith('//')) {
                        urlLimpa = 'https:' + urlLimpa;
                    }
                    jogo.cover.url = urlLimpa;
                }
                return jogo;
            });

            // 4. ENVIAR DE VOLTA NO JSON:
            res.status(200).json(jogosLimpos);
            
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar jogos no IGDB." });
        }
    }
}