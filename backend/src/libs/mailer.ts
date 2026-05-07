import nodemailer from 'nodemailer';

let transporter: nodemailer.Transporter | null = null;

export const getMailer = async () => {
    if (transporter) return transporter;

    if (process.env.NODE_ENV === 'production') {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
        return transporter;
    }

    // Ambiente de Desenvolvimento (Ethereal)
    console.log("Gerando conta de e-mail Ethereal de testes...");
    const testAccount = await nodemailer.createTestAccount();
    
    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    return transporter;
};

export const sendMail = async (to: string, subject: string, html: string) => {
    const mailer = await getMailer();

    const info = await mailer.sendMail({
        from: '"GlitchLog Team" <noreply@glitchlog.com>',
        to,
        subject,
        html,
    });

    console.log("Mensagem enviada: %s", info.messageId);
    
    if (process.env.NODE_ENV !== 'production') {
        console.log("Preview URL do E-mail: %s", nodemailer.getTestMessageUrl(info));
    }

    return info;
};
