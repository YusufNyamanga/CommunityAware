import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes';
import instructionRoutes from './routes/instructionRoutes';
import knowledgeBaseRoutes from './routes/knowledgeBaseRoutes';
import uploadRoutes from './routes/uploadRoutes';

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
// Configure CORS before other middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key']
}));

// Other security middleware
app.use(helmet());

// Body parsing middleware
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    url: req.url,
    headers: req.headers,
    body: req.body
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Routes
app.use('/api/ai', aiRoutes);
app.use('/api/instructions', instructionRoutes);
app.use('/api/knowledge', knowledgeBaseRoutes);
app.use('/api/upload', uploadRoutes);

// Error handling
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error occurred:', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    headers: req.headers
  });
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('API Keys configured:', {
    zai: !!process.env.ZAI_API_KEY
  });
});
