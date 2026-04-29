import prisma from '../libs/prisma';
import { IGDBService } from './igdbService';

export class LibraryService {
    static async adicionarJogo(userId: number, id_igdb: number, status: string) {
        if (!id_igdb || !status) {
            throw { status: 400, message: "Faltam dados obrigatórios (id_igdb, status)." };
        }

        const jaExiste = await prisma.libraryEntry.findFirst({
            where: {
                userId: userId,
                id_igdb: id_igdb
            }
        });

        if (jaExiste) {
            throw { status: 409, message: "Este jogo já está na sua biblioteca!" };
        }

        let jogo = await prisma.game.findUnique({
            where: { id_igdb: id_igdb }
        });

        if (!jogo) {
            const igdbData = await IGDBService.fazerQuery({
                endpoint: 'games',
                fields: ['name'],
                where: `id = ${id_igdb}`,
                limit: 1
            });

            if (!igdbData || igdbData.length === 0) {
                throw { status: 404, message: "ID inválido. Jogo não encontrado na base da Twitch." };
            }

            jogo = await prisma.game.create({
                data: {
                    id_igdb: id_igdb,
                    name: igdbData[0].name
                }
            });
        }

        let dataInicio = null;
        let dataFim = null;

        if (status === 'Jogando') {
            dataInicio = new Date();
        } else if (status === 'Zerado') {
            dataInicio = new Date();
            dataFim = new Date();
        }

        const novaEntrada = await prisma.libraryEntry.create({
            data: {
                userId: userId, 
                id_igdb: id_igdb,
                status: status,
                started_at: dataInicio,
                finished_at: dataFim
            }
        });

        // Remove da wishlist automaticamente
        await prisma.wishlistEntry.deleteMany({
            where: { userId: userId, id_igdb: id_igdb }
        });

        return {
            mensagem: `${jogo.name} foi adicionado à sua biblioteca!`,
            entrada: novaEntrada
        };
    }

    static async listarJogos(username: string) {
        if (!username) {
            throw { status: 400, message: "Username é obrigatório." };
        }

        const usuario = await prisma.user.findUnique({
            where: { username: typeof username === 'string' ? username.toLowerCase() : ''}
        });

        if (!usuario) {
            throw { status: 404, message: "Usuário não encontrado." };
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

        return respostaFormatada;
    }

    static async atualizarStatus(userId: number, id_igdb: number, data: any) {
        const { status, marco_campanha, marco_secundarias } = data;
        const jogoId = Number(id_igdb);

        if (isNaN(jogoId)) {
            throw { status: 400, message: "ID do jogo inválido." };
        }

        const entradaNaBiblioteca = await prisma.libraryEntry.findFirst({
            where: { userId: userId, id_igdb: jogoId }
        });

        if (!entradaNaBiblioteca) {
            throw { status: 404, message: "Este jogo não está na sua biblioteca." };
        }

        let dataInicio = entradaNaBiblioteca.started_at;
        let dataFim = entradaNaBiblioteca.finished_at;

        if (status === "Jogando" && entradaNaBiblioteca.status !== "Jogando" && !dataInicio) {
            dataInicio = new Date();
        }

        if (status === "Zerado" && entradaNaBiblioteca.status !== "Zerado" && !dataFim) {
            dataFim = new Date();
        }

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

        return { mensagem: "Status do jogo atualizado com sucesso!" };
    }

    static async removerJogo(userId: number, id_igdb: number) {
        const jogoId = Number(id_igdb);

        if (isNaN(jogoId)) {
            throw { status: 400, message: "ID do jogo inválido." };
        }

        const deletado = await prisma.libraryEntry.deleteMany({
            where: { 
                userId: userId, 
                id_igdb: jogoId 
            }
        });

        if (deletado.count === 0) {
            throw { status: 404, message: "Jogo não encontrado na sua biblioteca." };
        }

        return { mensagem: "Jogo removido da sua biblioteca." };
    }
}
