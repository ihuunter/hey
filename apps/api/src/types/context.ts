import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { RedisClientType } from 'redis';

export interface User {
  id: string;
  address: string;
  username?: string;
  email?: string;
  displayName?: string;
  bio?: string;
  avatar?: string;
  cover?: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Context {
  req: Request;
  res: Response;
  prisma: PrismaClient;
  redis: RedisClientType;
  user?: User;
  isAuthenticated: boolean;
}