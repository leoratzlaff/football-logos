import express from 'express';
import cors from 'cors';
import logosRouter from './routes/logos.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Football Badges API is running',
    endpoints: {
      health: 'GET /',
      logo: 'GET /api/:country/:team',
      countries: 'GET /api/countries',
      teams: 'GET /api/:country/teams'
    }
  });
});

// Routes
app.use('/api', logosRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'Endpoint not found. Try GET / for available endpoints.',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

export default app;
