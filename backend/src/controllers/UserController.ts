import { type Request, type Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    static async criarUsuario(req: Request, res: Response) {
        const usuario = await UserService.criarUsuario(req.body);
        res.status(201).json(usuario);
    }
    
    static async login(req: Request, res: Response) {
        const resultado = await UserService.login(req.body);
        res.status(200).json(resultado);
    }

    static async excluirUsuario(req: Request, res: Response) {
        const userId = req.userId;
        const resultado = await UserService.excluirUsuario(userId);
        res.status(200).json(resultado);
    }

    static async listarUsuarios(req: Request, res: Response) {
        const usuarios = await UserService.listarUsuarios();
        res.status(200).json(usuarios);
    }

    static async buscarPerfilPublico(req: Request, res: Response) {
        const { username } = req.params;
        const usuario = await UserService.buscarPerfilPublico(typeof username === 'string' ? username : '');
        res.status(200).json(usuario);
    }

    static async meuPerfil(req: Request, res: Response) {
        const userId = req.userId; 
        const meuPerfil = await UserService.meuPerfil(userId);
        res.status(200).json(meuPerfil);
    }

    static async atualizarPerfil(req: Request, res: Response) {
        const userId = req.userId; 
        const resultado = await UserService.atualizarPerfil(userId, req.body);
        res.status(200).json(resultado);
    }
}
