import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { apiRoutes } from './interfaces/routes';
import { errorHandler } from './interfaces/middleware/errorHandler';
// import { authMiddleware } from './interfaces/middleware/authMiddleware';

const app = express();

app.use(cors({ origin: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => res.send('OK'));

import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', apiRoutes);

app.use(errorHandler);

export default app;
