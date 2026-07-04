import express from 'express';
import cors from 'cors';
import portfolioRouter from './modules/portfolio/portfolio.routes';
import projectsRouter from './modules/projects/projects.routes';
import workspacesRouter from './modules/workspaces/workspaces.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Status checks
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: 'SYTU Portfolio & Content Service',
    time: new Date(),
  });
});

// Mount routes
app.use('/api/v1/portfolio', portfolioRouter);
app.use('/api/v1/projects', projectsRouter);
app.use('/api/v1/workspaces', workspacesRouter);

// Mock S3 direct upload endpoint for local testing
app.put(/^\/api\/mock-upload\/(.+)$/, (req, res) => {
  const path = req.params[0];
  console.log(`[S3-Mock] Received direct PUT request for file upload: ${path}`);
  res.json({
    success: true,
    message: 'File uploaded successfully (Mock S3)',
    key: path,
  });
});

// Global error handler
app.use(errorHandler);

export default app;
export { app };
