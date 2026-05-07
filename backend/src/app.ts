import express, { type Request, type Response } from 'express';
import userRoutes from './routes/UserRoutes';
import gameRoutes from './routes/GameRoutes';
import libraryRoutes from './routes/LibraryRoutes';
import reviewRoutes from './routes/ReviewRoutes';
import favoriteRoutes from './routes/FavoriteRoutes';
import listRoutes from './routes/ListRoutes';
import wishlistRoutes from './routes/WishlistRoutes';
import followRoutes from './routes/FollowRoutes';
import notificationRoutes from './routes/NotificationRoutes';
import authRoutes from './routes/AuthRoutes';
import { errorHandler } from './middlewares/ErrorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

const app = express();

app.use(express.json());

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/usuarios', userRoutes);
app.use('/api/jogos', gameRoutes);
app.use('/api/biblioteca', libraryRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favoritos', favoriteRoutes);
app.use('/api/listas', listRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/seguidores', followRoutes);
app.use('/api/notificacoes', notificationRoutes);
app.use('/api/auth', authRoutes);

// Uma rota de status simples para teste
app.get('/api/status', (req: Request, res: Response) => {
    res.json({ status: 'API rodando, organizada e pronta para o IGDB!' });
});

app.use(errorHandler);

export default app;
