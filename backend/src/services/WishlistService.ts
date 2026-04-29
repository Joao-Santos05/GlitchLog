import prisma from '../libs/prisma';
import { IGDBService } from './igdbService';

export class WishlistService {
    static async adicionarJogo(userId: number, id_igdb: number) {
        if (!id_igdb) {
            throw { status: 400, message: "Faltam dados obrigatórios (id_igdb)." };
        }

        const jaExiste = await prisma.wishlistEntry.findFirst({
            where: {
                userId: userId,
                id_igdb: id_igdb
            }
        });

        if (jaExiste) {
            throw { status: 409, message: "Este jogo já está na sua wishlist!" };
        }

        // Verifica se o jogo existe no banco local
        let jogo = await prisma.game.findUnique({
            where: { id_igdb: id_igdb }
        });

        if (!jogo) {
            const igdbData = await IGDBService.fazerQuery({
                endpoint: 'games',
                fields: ['name', 'cover.url'],
                where: `id = ${id_igdb}`,
                limit: 1
            });

            if (!igdbData || igdbData.length === 0) {
                throw { status: 404, message: "ID inválido. Jogo não encontrado na base da Twitch." };
            }

            let cover_url = null;
            if (igdbData[0].cover && igdbData[0].cover.url) {
                cover_url = igdbData[0].cover.url.replace('t_thumb', 't_1080p');
            }

            jogo = await prisma.game.create({
                data: {
                    id_igdb: id_igdb,
                    name: igdbData[0].name,
                    cover_url: cover_url
                }
            });
        }

        const novaEntrada = await prisma.wishlistEntry.create({
            data: {
                userId: userId, 
                id_igdb: id_igdb
            }
        });

        return {
            mensagem: `${jogo.name} foi adicionado à sua wishlist!`,
            entrada: novaEntrada
        };
    }

    static async listarWishlist(username: string, loggedUserId?: number) {
        if (!username) {
            throw { status: 400, message: "Username é obrigatório." };
        }

        const usuario = await prisma.user.findUnique({
            where: { username: typeof username === 'string' ? username.toLowerCase() : ''}
        });

        if (!usuario) {
            throw { status: 404, message: "Usuário não encontrado." };
        }

        // Verificação de privacidade
        if (!usuario.wishlist_is_public && usuario.userId !== loggedUserId) {
            throw { status: 403, message: "A wishlist deste usuário é privada." };
        }

        const wishlist = await prisma.wishlistEntry.findMany({
            where: { 
                userId: usuario.userId 
            },
            include: { game: true },
            orderBy: { addedAt: 'desc' }
        });

        const respostaFormatada = wishlist.map((entrada: any) => ({
            id_igdb: entrada.id_igdb,
            nome: entrada.game.name,
            cover_url: entrada.game.cover_url,
            adicionado_em: entrada.addedAt
        }));

        return respostaFormatada;
    }

    static async removerJogo(userId: number, id_igdb: number) {
        const jogoId = Number(id_igdb);

        if (isNaN(jogoId)) {
            throw { status: 400, message: "ID do jogo inválido." };
        }

        const deletado = await prisma.wishlistEntry.deleteMany({
            where: { 
                userId: userId, 
                id_igdb: jogoId 
            }
        });

        if (deletado.count === 0) {
            throw { status: 404, message: "Jogo não encontrado na sua wishlist." };
        }

        return { mensagem: "Jogo removido da sua wishlist." };
    }
}
