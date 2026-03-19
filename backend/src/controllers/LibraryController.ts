import {type Request,type Response } from 'express';
import prisma from '../libs/prisma';
import { IGDBService } from '../services/igdbService';

export class LibraryController {
    static async adicionarJogo(req: Request, res: Response) {
        try {
            // Pegamos o ID do Token JWT
            // O nosso authMiddleware já validou e injetou esse dado na requisição
            const userId = (req as any).userId; 

            // O front-end envia APENAS as informações do jogo
            const { id_igdb, status } = req.body;

            if (!id_igdb || !status) {
                res.status(400).json({ erro: "Faltam dados obrigatórios (id_igdb, status)." });
                return;
            }

            const jaExiste = await prisma.libraryEntry.findFirst({
                where: {
                    userId: userId,
                    id_igdb: id_igdb
                }
            });

            if (jaExiste) {
                res.status(409).json({ erro: "Este jogo já está na sua biblioteca!" });
                return;
            }

            let jogo = await prisma.game.findUnique({
                where: { id_igdb: id_igdb }
            });

            // Se o jogo não existe no nosso banco, buscamos na Twitch
            if (!jogo) {
                const igdbData = await IGDBService.fazerQuery({
                    endpoint: 'games',
                    fields: ['name'],
                    where: `id = ${id_igdb}`,
                    limit: 1
                });

                if (!igdbData || igdbData.length === 0) {
                    res.status(404).json({ erro: "ID inválido. Jogo não encontrado na base da Twitch." });
                    return;
                }

                jogo = await prisma.game.create({
                    data: {
                        id_igdb: id_igdb,
                        name: igdbData[0].name
                    }
                });
            }

            // Lógica de Datas
            let dataInicio = null;
            let dataFim = null;

            if (status === 'Jogando') {
                dataInicio = new Date();
            } else if (status === 'Zerado') {
                dataInicio = new Date();
                dataFim = new Date();
            }

            // Cria o vínculo na Biblioteca
            const novaEntrada = await prisma.libraryEntry.create({
                data: {
                    userId: userId, // Usando o ID do JWT
                    id_igdb: id_igdb,
                    status: status,
                    started_at: dataInicio,
                    finished_at: dataFim
                }
            });

            res.status(201).json({
                mensagem: `${jogo.name} foi adicionado à sua biblioteca!`,
                entrada: novaEntrada
            });

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro interno ao adicionar jogo na biblioteca." });
        }
    }

    static async listarJogos(req: Request, res: Response) {
        try {
            // Pegamos o username da URL (Ex: /api/biblioteca/username)
            const { username } = req.params;

            if (!username) {
                res.status(400).json({ erro: "Username é obrigatório." });
                return;
            }

            const usuario = await prisma.user.findUnique({
                where: { username: (username as string).toLowerCase()}
            });

            if (!usuario) {
                res.status(404).json({ erro: "Usuário não encontrado." });
                return;
            }

            const biblioteca = await prisma.libraryEntry.findMany({
                where: { 
                    userId: usuario.userId 
                },
                include: { game: true },
                orderBy: { started_at: 'desc' }
            });

            const respostaFormatada = biblioteca.map((entrada: any) => ({
                id_igdb: entrada.id_igdb,
                nome: entrada.game.name, 
                status: entrada.status,
                marco_campanha: entrada.marco_campanha,
                marco_secundarias: entrada.marco_secundarias,
                comecou_em: entrada.started_at,
                zerou_em: entrada.finished_at
            }));

            res.status(200).json(respostaFormatada);

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao buscar a biblioteca." });
        }
    }
}