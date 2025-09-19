import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { generateRequestToken } from '../middleware/auth';

export const authController = {
async register(req: Request, res: Response) {
    console.log('Register request received:', req.body);
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const token = await UserService.register(email, password);
      const requestToken = generateRequestToken(req);

      res.json({
        token,
        requestToken
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({
        error: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }

      const token = await UserService.login(email, password);
      const requestToken = generateRequestToken(req);

      res.json({
        token,
        requestToken
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({
        error: error instanceof Error ? error.message : 'Authentication failed'
      });
    }
  }
};
