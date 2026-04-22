import prisma from '../libs/prisma';

export class FavoriteService {
    static async definirFavorito(userId: number, id_igdb: number, slot: number) {
        if (slot < 1 || slot > 4) {
            throw { status: 400, message: "O slot do favorito deve ser entre 1 e 4." };
        }

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

        return { 
            mensagem: "Jogo favoritado com sucesso!", 
            favorito: favoritoSalvo 
        };
    }
}
