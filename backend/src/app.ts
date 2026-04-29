import express, { type Request, type Response } from 'express';
import userRoutes from './routes/UserRoutes';
import gameRoutes from './routes/GameRoutes';
import libraryRoutes from './routes/LibraryRoutes';
import reviewRoutes from './routes/ReviewRoutes';
import favoriteRoutes from './routes/FavoriteRoutes';
import listRoutes from './routes/ListRoutes';
import { errorHandler } from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());

app.use('/api/usuarios', userRoutes);
app.use('/api/jogos', gameRoutes);
app.use('/api/biblioteca', libraryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favoritos', favoriteRoutes);
app.use('/api/listas', listRoutes);

// Uma rota de status simples para teste
app.get('/api/status', (req: Request, res: Response) => {
    res.json({ status: 'API rodando, organizada e pronta para o IGDB!' });
});

app.use(errorHandler);

export default app;
