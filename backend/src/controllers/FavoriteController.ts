import {type Request,type Response } from 'express';
import prisma from '../libs/prisma';

export class FavoriteController {
    static async definirFavorito(req: Request, res: Response) {
        try {
            const userId = (req as any).userId; 
            
            const { id_igdb, slot } = req.body;

            if (slot < 1 || slot > 4) {
                return res.status(400).json({ erro: "O slot do favorito deve ser entre 1 e 4." });
            }

            // Se já tem um jogo no Slot 1, ele atualiza. Se o Slot 1 tá vazio, ele cria.
            const favoritoSalvo = await prisma.favoriteGame.upsert({
                where: {
                    userId_slot: {
                        userId: userId,
                        slot: slot
                    }
                },
                update: {
                    id_igdb: id_igdb
                },
                create: {
                    userId: userId,
                    slot: slot,
                    id_igdb: id_igdb
                }
            });

            return res.status(200).json({ 
                mensagem: "Jogo favoritado com sucesso!", 
                favorito: favoritoSalvo 
            });

        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ erro: "Erro ao salvar jogo favorito." });
        }
    }
}