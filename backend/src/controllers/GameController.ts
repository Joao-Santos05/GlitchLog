import { type Request, type Response } from 'express';
import prisma from '../libs/prisma';
import { IGDBService } from '../services/igdbService';

const limparImagem = (url: string | undefined): string | null => {
    if (!url) return null;
    let urlLimpa = url.replace('t_thumb', 't_1080p');
    if (urlLimpa.startsWith('//')) {
        urlLimpa = 'https:' + urlLimpa;
    }
    return urlLimpa;
};

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

            // ENVIAR DE VOLTA NO JSON:
            res.status(200).json(jogosLimpos);
            
        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar jogos no IGDB." });
        }
    }

    static async buscarDetalhesPorId(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const igdbId = Number(id);

            if (!igdbId || isNaN(igdbId)) {
                res.status(400).json({ erro: "ID do jogo inválido." });
                return;
            }

            
            const jogoLocal = await prisma.game.findUnique({
                where: { id_igdb: igdbId }
            });

            if (jogoLocal) {
                console.log(`Jogo ${jogoLocal.name} encontrado no cache local.`);
                res.status(200).json(jogoLocal);
                return;
            }

            //Se não existe, busca os detalhes completos na Twitch
            console.log(`Buscando detalhes do jogo ${igdbId} na Twitch...`);
            
            const campos = [
                'name',
                'summary',
                'first_release_date',
                'rating',
                'rating_count',
                'involved_companies.company.name',
                'involved_companies.developer',
                'cover.url',
                'artworks.url',
                'genres.name',
                'platforms.abbreviation',
                'similar_games.name',
                'similar_games.cover.url'
            ];

            const igdbData = await IGDBService.fazerQuery({
                endpoint: 'games',
                fields: campos,
                where: `id = ${igdbId}`,
                limit: 1
            });

            if (!igdbData || igdbData.length === 0) {
                res.status(404).json({ erro: "Jogo não encontrado na base da Twitch." });
                return;
            }

            const jogoBruto = igdbData[0];

            // Processamento e Limpeza dos Dados
            let anoLancamento = null;
            if (jogoBruto.first_release_date) {
                anoLancamento = new Date(jogoBruto.first_release_date * 1000).getFullYear();
            }

            const capaGrande = limparImagem(jogoBruto.cover?.url);
            const artworkFundo = limparImagem(jogoBruto.artworks?.[0]?.url);

            let desenvolvedora = "Desconhecida";
            const empresasEnvolvidas = jogoBruto.involved_companies || [];
            const devPrincipal = empresasEnvolvidas.find((ec: any) => ec.developer === true);
            if (devPrincipal) {
                desenvolvedora = devPrincipal.company.name;
            } else if (empresasEnvolvidas.length > 0) {
                desenvolvedora = empresasEnvolvidas[0].company.name; 
            }

            const generos = jogoBruto.genres?.map((g: any) => g.name).join(', ') || 'N/A';
            const plataformas = jogoBruto.platforms?.map((p: any) => p.abbreviation).join(', ') || 'N/A';
            const notaFormatada = jogoBruto.rating ? parseFloat(jogoBruto.rating.toFixed(1)) : null;

            const jogosSimilares = jogoBruto.similar_games?.map((sim: any) => ({
                id_igdb: sim.id,
                nome: sim.name,
                capa_url: limparImagem(sim.cover?.url)
            })) || [];

            // Salvar o Jogo no Nosso Banco de Dados (SCRUM-46)
            console.log(`Salvando jogo ${jogoBruto.name} no banco de dados local...`);
            
            const novoJogoLocal = await prisma.game.create({
                data: {
                    id_igdb: igdbId,
                    name: jogoBruto.name,
                    bio: jogoBruto.summary, 
                    cover_url: capaGrande,
                    background_url: artworkFundo, 
                    release_year: anoLancamento,
                    developer: desenvolvedora,
                    genre: generos,
                    platforms: plataformas,
                    rating: notaFormatada,
                    rating_count: jogoBruto.rating_count,
                    similar_games_json: JSON.stringify(jogosSimilares) 
                }
            });

            res.status(200).json(novoJogoLocal);

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar os detalhes do jogo." });
        }
    }
}