import { type Request, type Response } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    static async criarUsuario(req: Request, res: Response) {
        try {
            const usuario = await UserService.criarUsuario(req.body);
            res.status(201).json(usuario);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao criar o usuário." });
        }
    }
    
    static async login(req: Request, res: Response) {
        try {
            const resultado = await UserService.login(req.body);
            res.status(200).json(resultado);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro interno ao realizar login." });
        }
    }

    static async excluirUsuario(req: Request, res: Response) {
        try {
            const userId = req.userId;
            const resultado = await UserService.excluirUsuario(userId);
            res.status(200).json(resultado);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro interno ao excluir a conta." });
        }
    }

    static async listarUsuarios(req: Request, res: Response) {
        try {
            const usuarios = await UserService.listarUsuarios();
            res.status(200).json(usuarios);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao buscar os usuários." });
        }
    }

    static async buscarPerfilPublico(req: Request, res: Response) {
        try {
            const { username } = req.params;
            const usuario = await UserService.buscarPerfilPublico(typeof username === 'string' ? username : '');
            res.status(200).json(usuario);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao buscar o perfil do usuário." });
        }
    }

    static async meuPerfil(req: Request, res: Response) {
        try {
            const userId = req.userId; 
            const meuPerfil = await UserService.meuPerfil(userId);
            res.status(200).json(meuPerfil);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro ao buscar os dados do perfil." });
        }
    }

    static async atualizarPerfil(req: Request, res: Response) {
        try {
            const userId = req.userId; 
            const resultado = await UserService.atualizarPerfil(userId, req.body);
            res.status(200).json(resultado);
        } catch (erro: any) {
            console.error(erro);
            res.status(erro.status || 500).json({ erro: erro.message || "Erro interno ao atualizar o perfil." });
        }
    }
}
