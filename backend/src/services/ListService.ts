import prisma from '../libs/prisma';
import { IGDBService } from './igdbService';

const limparImagem = (url: string | undefined): string | null => {
    if (!url) return null;
    let urlLimpa = url.replace('t_thumb', 't_1080p');
    if (urlLimpa.startsWith('//')) urlLimpa = 'https:' + urlLimpa;
    return urlLimpa;
}

export class ListService {
    static async createList(userId: number, data: any) {
        const { title, summary, isPublic } = data;

        const novaLista = await prisma.list.create({
            data: {
                title,
                summary,
                isPublic: isPublic !== undefined ? isPublic : true,
                userId
            }
        });

        return novaLista;
    }

    static async addGamesToList(userId: number, listId: number, games: { id_igdb: number, ordem: number }[]) {
        // Verifica se a lista existe e pertence ao usuário
        const lista = await prisma.list.findUnique({
            where: { listId }
        });

        if (!lista) {
            throw { status: 404, message: "Lista não encontrada." };
        }

        if (lista.userId !== userId) {
            throw { status: 403, message: "Você não tem permissão para modificar esta lista." };
        }

        const gameIds = games.map(g => g.id_igdb);

        const jogosLocais = await prisma.game.findMany({
            where: { id_igdb: { in: gameIds } },
            select: { id_igdb: true }
        });

        const idsLocais = jogosLocais.map(j => j.id_igdb);

        const idsFaltantes = gameIds.filter(id => !idsLocais.includes(id));

        if (idsFaltantes.length > 0) {
            const igdbData = await IGDBService.fazerQuery({
                endpoint: 'games',
                fields: ['name', 'cover.url', 'artworks.url'],
                where: `id = (${idsFaltantes.join(',')})`,
                limit: idsFaltantes.length
            });

            if (igdbData && igdbData.length > 0) {
                const novosJogos = igdbData.map((jogo: any) => ({
                    id_igdb: jogo.id,
                    name: jogo.name,
                    cover_url: limparImagem(jogo.cover?.url)?.replace('t_1080p', 't_cover_big'), // Capa em tamanho adequado
                    background_url: limparImagem(jogo.artworks?.[0]?.url)
                }));

                await prisma.game.createMany({
                    data: novosJogos,
                    skipDuplicates: true
                });
            }
        }

        await prisma.listItem.deleteMany({
            where: {
                listId: listId,
                id_igdb: { in: gameIds }
            }
        });

        const listItemsData = games.map(g => ({
            listId: listId,
            id_igdb: g.id_igdb,
            ordem: g.ordem
        }));

        await prisma.listItem.createMany({
            data: listItemsData
        });

        return { message: "Jogos adicionados à lista com sucesso." };
    }

    static async getMyLists(userId: number) {
        const listas = await prisma.list.findMany({
            where: { userId: userId }, // Traz todas as listas do usuário, independente de serem públicas ou privadas
            include: {
                _count: {
                    select: { listItems: true }
                }
            },
            orderBy: {
                listId: 'desc' // As mais recentes primeiro
            }
        });

        return listas;
    }

    static async getUserLists(username: string) {
        const user = await prisma.user.findUnique({
            where: { username: username.toLowerCase() }
        });

        if (!user) {
            throw { status: 404, message: "Usuário não encontrado." };
        }

        const listas = await prisma.list.findMany({
            where: { userId: user.userId, isPublic: true },
            include: {
                _count: {
                    select: { listItems: true }
                }
            },
            orderBy: {
                listId: 'desc'
            }
        });

        return listas;
    }

    static async getListById(listId: number) {
        const lista = await prisma.list.findUnique({
            where: { listId },
            include: {
                user: {
                    select: { username: true, avatar_url: true }
                },
                listItems: {
                    orderBy: {
                        ordem: 'asc'
                    },
                    include: {
                        game: {
                            select: { id_igdb: true, name: true, cover_url: true }
                        }
                    }
                }
            }
        });

        if (!lista) {
            throw { status: 404, message: "Lista não encontrada." };
        }

        return lista;
    }

    static async updateList(userId: number, listId: number, data: any) {
        const { title, summary, isPublic } = data;

        const lista = await prisma.list.findUnique({
            where: { listId }
        });

        if (!lista) {
            throw { status: 404, message: "Lista não encontrada." };
        }

        if (lista.userId !== userId) {
            throw { status: 403, message: "Você não tem permissão para modificar esta lista." };
        }

        const listaAtualizada = await prisma.list.update({
            where: { listId },
            data: {
                title: title !== undefined ? title : lista.title,
                summary: summary !== undefined ? summary : lista.summary,
                isPublic: isPublic !== undefined ? isPublic : lista.isPublic
            }
        });

        return listaAtualizada;
    }

    static async deleteList(userId: number, listId: number) {
        const lista = await prisma.list.findUnique({
            where: { listId }
        });

        if (!lista) {
            throw { status: 404, message: "Lista não encontrada." };
        }

        if (lista.userId !== userId) {
            throw { status: 403, message: "Você não tem permissão para excluir esta lista." };
        }

        await prisma.list.delete({
            where: { listId }
        });

        return { message: "Lista excluída com sucesso." };
    }

    static async removeGameFromList(userId: number, listId: number, id_igdb: number) {
        const lista = await prisma.list.findUnique({
            where: { listId }
        });

        if (!lista) {
            throw { status: 404, message: "Lista não encontrada." };
        }

        if (lista.userId !== userId) {
            throw { status: 403, message: "Você não tem permissão para modificar esta lista." };
        }

        const listItem = await prisma.listItem.findUnique({
            where: {
                listId_id_igdb: {
                    listId: listId,
                    id_igdb: id_igdb
                }
            }
        });

        if (!listItem) {
            throw { status: 404, message: "Jogo não encontrado nesta lista." };
        }

        await prisma.listItem.delete({
            where: {
                listId_id_igdb: {
                    listId: listId,
                    id_igdb: id_igdb
                }
            }
        });

        return { message: "Jogo removido da lista com sucesso." };
    }
}
