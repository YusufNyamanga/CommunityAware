import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request Headers:', req.headers);
  const apiKey = req.headers['x-api-key'];
  console.log('Received API Key:', apiKey);
  console.log('Expected API Key:', process.env.API_KEY_SECRET);
  console.log('API Key Match:', apiKey === process.env.API_KEY_SECRET);
  
  if (!apiKey) {
    console.log('No API key provided');
    return res.status(401).json({ error: 'No API key provided' });
  }
  
  if (apiKey !== process.env.API_KEY_SECRET) {
    console.log('Invalid API key');
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  console.log('Authentication successful');
  next();
};
