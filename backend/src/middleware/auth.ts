import { Request, Response, NextFunction } from 'express';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secure-jwt-secret-key-here';
const IS_PROD = process.env.NODE_ENV === 'production';
if (IS_PROD && (process.env.JWT_SECRET === undefined || process.env.JWT_SECRET === 'your-super-secure-jwt-secret-key-here')) {
  console.warn('WARNING: JWT_SECRET is not set securely in production. Set a strong JWT_SECRET in environment variables.');
}
const JWT_EXPIRY = process.env.JWT_EXPIRY || '1h';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

export const generateToken = (userId: string, email: string): string => {
  const secret = JWT_SECRET as Secret;
  const payload = { id: userId, email };
  const options = { expiresIn: '1h' } as SignOptions;
  return jwt.sign(payload, secret, options);
};

export const validateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }

    const decoded = jwt.verify(token, JWT_SECRET as Secret);
    req.user = decoded as { id: string; email: string };
    next();
  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Rate limiting per user
export const userRateLimit = new Map<string, { count: number; resetTime: number }>();

export const checkUserRateLimit = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  const userId = req.user.id;
  const now = Date.now();
  const limit = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100');
  const window = parseInt(process.env.RATE_LIMIT_WINDOW || '900000');

  const userLimit = userRateLimit.get(userId);

  if (!userLimit || now > userLimit.resetTime) {
    userRateLimit.set(userId, {
      count: 1,
      resetTime: now + window
    });
    return next();
  }

  if (userLimit.count >= limit) {
    return res.status(429).json({
      error: 'Rate limit exceeded. Please try again later.'
    });
  }

  userLimit.count++;
  next();
};

// Request validation token
export const generateRequestToken = (req: Request): string => {
  const timestamp = Date.now();
  const payload = {
    timestamp,
    path: req.path,
    method: req.method
  };
  const options = { expiresIn: '30s' } as SignOptions;
  return jwt.sign(payload, JWT_SECRET as Secret, options);
};

export const validateRequestToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestToken = req.headers['x-request-token'] as string;
    if (!requestToken) {
      return res.status(401).json({ error: 'Request token missing' });
    }

    const decoded = jwt.verify(requestToken, JWT_SECRET as Secret) as {
      timestamp: number;
      path: string;
      method: string;
    };

    // Validate request matches token
    if (decoded.path !== req.path || decoded.method !== req.method) {
      return res.status(401).json({ error: 'Invalid request token' });
    }

    // Check token age (30 seconds)
    const age = Date.now() - decoded.timestamp;
    if (age > 30000) {
      return res.status(401).json({ error: 'Request token expired' });
    }

    next();
  } catch (error) {
    console.error('Request token validation error:', error);
    return res.status(401).json({ error: 'Invalid request token' });
  }
};
