import { type Request, type Response } from 'express';
import { ListService } from '../services/ListService';

export class ListController {
    static async createList(req: Request, res: Response) {
        const userId = req.userId;
        const lista = await ListService.createList(userId, req.body);
        res.status(201).json(lista);
    }

    static async addGamesToList(req: Request<{ id: string }>, res: Response) {
        const userId = req.userId;
        const listId = parseInt(req.params.id);
        const { games } = req.body;
        
        const resultado = await ListService.addGamesToList(userId, listId, games);
        res.status(200).json(resultado);
    }

    static async getUserLists(req: Request<{ username: string }>, res: Response) {
        const { username } = req.params;
        const listas = await ListService.getUserLists(username);
        res.status(200).json(listas);
    }

    static async getListById(req: Request<{ id: string }>, res: Response) {
        const listId = parseInt(req.params.id);
        const lista = await ListService.getListById(listId);
        res.status(200).json(lista);
    }

    static async updateList(req: Request<{ id: string }>, res: Response) {
        const userId = req.userId;
        const listId = parseInt(req.params.id);
        const lista = await ListService.updateList(userId, listId, req.body);
        res.status(200).json(lista);
    }

    static async deleteList(req: Request<{ id: string }>, res: Response) {
        const userId = req.userId;
        const listId = parseInt(req.params.id);
        const resultado = await ListService.deleteList(userId, listId);
        res.status(200).json(resultado);
    }

    static async removeGameFromList(req: Request<{ id: string, id_igdb: string }>, res: Response) {
        const userId = req.userId;
        const listId = parseInt(req.params.id);
        const id_igdb = parseInt(req.params.id_igdb);
        
        const resultado = await ListService.removeGameFromList(userId, listId, id_igdb);
        res.status(200).json(resultado);
    }
}
