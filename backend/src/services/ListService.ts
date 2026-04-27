import prisma from '../libs/prisma';

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

        // Deleta os jogos que já poderiam estar na lista para evitar conflito de chaves primárias
        const gameIds = games.map(g => g.id_igdb);
        await prisma.listItem.deleteMany({
            where: {
                listId: listId,
                id_igdb: { in: gameIds }
            }
        });

        // Adiciona os jogos usando createMany
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
