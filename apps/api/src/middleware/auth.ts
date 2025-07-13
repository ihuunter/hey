import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../types/context';

interface AuthPayload {
  user: User;
  isAuthenticated: boolean;
}

export const authMiddleware = (req: Request): AuthPayload => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return { user: undefined as any, isAuthenticated: false };
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    return {
      user: decoded.user,
      isAuthenticated: true,
    };
  } catch (error) {
    return { user: undefined as any, isAuthenticated: false };
  }
};

export const generateToken = (user: User): string => {
  return jwt.sign(
    { user },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  );
};