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

    static async atualizarStatus(req: Request, res: Response) {
        try {
            const userId = (req as any).userId; // Veio do token JWT
            const { id_igdb } = req.params;
            const { status, marco_campanha, marco_secundarias } = req.body;

            const jogoId = Number(id_igdb);

            if (isNaN(jogoId)) {
                res.status(400).json({ erro: "ID do jogo inválido." });
                return;
            }

            // Busca se o jogo realmente está na biblioteca DESTE usuário
            const entradaNaBiblioteca = await prisma.libraryEntry.findFirst({
                where: { userId: userId, id_igdb: jogoId }
            });

            if (!entradaNaBiblioteca) {
                res.status(404).json({ erro: "Este jogo não está na sua biblioteca." });
                return;
            }

            let dataInicio = entradaNaBiblioteca.started_at;
            let dataFim = entradaNaBiblioteca.finished_at;

            if (status === "Jogando" && entradaNaBiblioteca.status !== "Jogando" && !dataInicio) {
                dataInicio = new Date();
            }

            if (status === "Zerado" && entradaNaBiblioteca.status !== "Zerado" && !dataFim) {
                dataFim = new Date();
            }

            // Atualiza os dados no banco
            await prisma.libraryEntry.updateMany({
                where: { userId: userId, id_igdb: jogoId },
                data: {
                    status: status || entradaNaBiblioteca.status,
                    marco_campanha: marco_campanha !== undefined ? marco_campanha : entradaNaBiblioteca.marco_campanha,
                    marco_secundarias: marco_secundarias !== undefined ? marco_secundarias : entradaNaBiblioteca.marco_secundarias,
                    started_at: dataInicio,
                    finished_at: dataFim
                }
            });

            res.status(200).json({ mensagem: "Status do jogo atualizado com sucesso!" });

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao atualizar o jogo na biblioteca." });
        }
    }

    static async removerJogo(req: Request, res: Response) {
        try {
            const userId = (req as any).userId; // Protegido pelo JWT
            const { id_igdb } = req.params;
            
            const jogoId = Number(id_igdb);

            if (isNaN(jogoId)) {
                res.status(400).json({ erro: "ID do jogo inválido." });
                return;
            }

            // Usamos deleteMany porque estamos buscando por duas colunas (userId e id_igdb)
            const deletado = await prisma.libraryEntry.deleteMany({
                where: { 
                    userId: userId, 
                    id_igdb: jogoId 
                }
            });

            // Se o deleteMany retornar count 0, significa que o jogo não tava lá
            if (deletado.count === 0) {
                res.status(404).json({ erro: "Jogo não encontrado na sua biblioteca." });
                return;
            }

            res.status(200).json({ mensagem: "Jogo removido da sua biblioteca." });

        } catch (erro) {
            console.error(erro);
            res.status(500).json({ erro: "Erro ao remover o jogo da biblioteca." });
        }
    }
}