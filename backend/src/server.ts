import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import userRoutes from './routes/UserRoutes';
import gameRoutes from './routes/GameRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/jogos', gameRoutes);

// Uma rota de status simples para teste
app.get('/api/status', (req: Request, res: Response) => {
    res.json({ status: 'API rodando, organizada e pronta para o IGDB!' });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});