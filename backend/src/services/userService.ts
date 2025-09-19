import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth';

// In a real app, this would be in a database
const users = new Map<string, {
  id: string;
  email: string;
  passwordHash: string;
  apiKey?: string;
}>();

export class UserService {
  static async register(email: string, password: string): Promise<string> {
    if (users.has(email)) {
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const id = Math.random().toString(36).substring(7);

    users.set(email, {
      id,
      email,
      passwordHash
    });

    return generateToken(id, email);
  }

  static async login(email: string, password: string): Promise<string> {
    const user = users.get(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    return generateToken(user.id, email);
  }

  static async validateApiKey(apiKey: string): Promise<boolean> {
    // In a real app, this would validate against a database
    // For now, we'll just check if any user has this API key
    return Array.from(users.values()).some(user => user.apiKey === apiKey);
  }
}
