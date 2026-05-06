import prisma from '../libs/prisma';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { sendMail } from '../libs/mailer';

export class AuthService {
    static async forgotPassword(email: string) {
        if (!email) throw { status: 400, message: "E-mail é obrigatório." };

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Retorna 200 para evitar enumeramento de e-mails
            return { message: "Se o e-mail existir, um link de recuperação foi enviado." };
        }

        // Gera token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        
        // Expira em 1 hora
        const expireDate = new Date(Date.now() + 60 * 60 * 1000);

        await prisma.user.update({
            where: { email },
            data: {
                resetPasswordToken: hashToken,
                resetPasswordExpires: expireDate
            }
        });

        const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;
        const message = `
            <h2>Recuperação de Senha - GlitchLog</h2>
            <p>Você (ou alguém) solicitou a redefinição da sua senha.</p>
            <p>Clique no link abaixo para criar uma nova senha. Este link expira em 1 hora.</p>
            <a href="${resetUrl}" target="_blank">Redefinir Minha Senha</a>
            <p>Se você não solicitou, apenas ignore este e-mail.</p>
        `;

        await sendMail(user.email, "GlitchLog - Redefinição de Senha", message);

        return { message: "Se o e-mail existir, um link de recuperação foi enviado." };
    }

    static async resetPassword(token: string, novaSenha: string) {
        if (!token || !novaSenha) throw { status: 400, message: "Token e nova senha são obrigatórios." };

        const hashToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await prisma.user.findFirst({
            where: {
                resetPasswordToken: hashToken,
                resetPasswordExpires: { gt: new Date() } 
            }
        });

        if (!user) {
            throw { status: 400, message: "Token inválido ou expirado." };
        }

        const novaSenhaHash = await bcrypt.hash(novaSenha, 10);

        await prisma.user.update({
            where: { userId: user.userId },
            data: {
                senha_hash: novaSenhaHash,
                resetPasswordToken: null,
                resetPasswordExpires: null
            }
        });

        return { message: "Senha redefinida com sucesso! Você já pode fazer login." };
    }

    static async generate2FA(userId: number) {
        const user = await prisma.user.findUnique({ where: { userId } });
        if (!user) throw { status: 404, message: "Usuário não encontrado." };

        const secret = speakeasy.generateSecret({ 
            name: `GlitchLog (${user.email})` 
        });

        await prisma.user.update({
            where: { userId },
            data: { twoFactorSecret: secret.base32 }
        });

        if (!secret.otpauth_url) {
            throw { status: 500, message: "Falha ao gerar URL do OTP." };
        }

        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

        return {
            secret: secret.base32,
            qrCodeUrl
        };
    }

    static async enable2FA(userId: number, token: string) {
        if (!token) throw { status: 400, message: "Token (código) é obrigatório." };

        const user = await prisma.user.findUnique({ where: { userId } });
        if (!user || !user.twoFactorSecret) {
            throw { status: 400, message: "Segredo 2FA não gerado para este usuário." };
        }

        const verified = speakeasy.totp.verify({
            secret: user.twoFactorSecret,
            encoding: 'base32',
            token: token
        });

        if (!verified) {
            throw { status: 400, message: "Código 2FA inválido." };
        }

        await prisma.user.update({
            where: { userId },
            data: { isTwoFactorEnabled: true }
        });

        return { message: "Autenticação de Dois Fatores ativada com sucesso!" };
    }
}
