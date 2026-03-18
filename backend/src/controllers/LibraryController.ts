import {type Request,type Response } from 'express';
import prisma from '../libs/prisma';
import { IGDBService } from '../services/igdbService';

export class LibraryController {
    static async adicionarJogo(req: Request, res: Response) {
        try {
            // O front-end envia as informações básicas: userId, id_igdb e status
            // NOTA: TROCAR USERID PELO JWT NO FUTURO, MAS POR ENQUANTO VAMOS DE USERID DIRETO PARA FACILITAR OS TESTES
            const { userId, id_igdb, status } = req.body;

            if (!userId || !id_igdb || !status) {
                res.status(400).json({ erro: "Faltam dados obrigatórios (userId, id_igdb, status)." });
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

            //Se o jogo não existe no nosso banco, buscamos na Twitch!
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
                    userId: userId,
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
}