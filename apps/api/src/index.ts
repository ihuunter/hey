import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import dotenv from 'dotenv';

// Import resolvers
import { UserResolver } from './resolvers/UserResolver';
import { PostResolver } from './resolvers/PostResolver';
import { CommentResolver } from './resolvers/CommentResolver';
import { AuthResolver } from './resolvers/AuthResolver';
import { GroupResolver } from './resolvers/GroupResolver';
import { NotificationResolver } from './resolvers/NotificationResolver';

// Import middleware
import { authMiddleware } from './middleware/auth';
import { Context } from './types/context';

dotenv.config();

const main = async () => {
  // Initialize Prisma client
  const prisma = new PrismaClient();
  
  // Initialize Redis client
  const redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });
  
  await redis.connect();
  
  // Create Express app
  const app = express();
  
  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));
  
  // CORS configuration
  app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://hey.xyz', 'https://www.hey.xyz']
      : ['http://localhost:4783', 'http://localhost:3000'],
    credentials: true,
  }));
  
  // Build GraphQL schema
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      PostResolver,
      CommentResolver,
      AuthResolver,
      GroupResolver,
      NotificationResolver
    ],
    emitSchemaFile: true,
    validate: false,
  });
  
  // Create Apollo Server
  const server = new ApolloServer<Context>({
    schema,
    formatError: (error) => {
      console.error(error);
      return {
        message: error.message,
        code: error.extensions?.code,
        path: error.path,
      };
    },
  });
  
  await server.start();
  
  // Apply GraphQL middleware
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = authMiddleware(req);
        
        return {
          req,
          res,
          prisma,
          redis,
          user: auth.user,
          isAuthenticated: auth.isAuthenticated,
        };
      },
    })
  );
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  // Sitemap endpoints (for SEO)
  app.get('/sitemap/all.xml', async (req, res) => {
    res.set('Content-Type', 'text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://hey.xyz</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
        </url>
      </urlset>`);
  });
  
  // OpenGraph endpoints
  app.get('/og/*', async (req, res) => {
    const path = req.path.replace('/og', '');
    
    // Basic OpenGraph HTML response
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta property="og:title" content="Hey - Decentralized Social Media" />
          <meta property="og:description" content="Connect, share, and discover on Hey - the decentralized social media platform built on Lens Protocol" />
          <meta property="og:image" content="https://hey.xyz/og-image.png" />
          <meta property="og:url" content="https://hey.xyz${path}" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Hey - Decentralized Social Media" />
          <meta name="twitter:description" content="Connect, share, and discover on Hey" />
          <meta name="twitter:image" content="https://hey.xyz/og-image.png" />
        </head>
        <body>
          <h1>Hey - Decentralized Social Media</h1>
          <p>Connect, share, and discover on Hey - the decentralized social media platform built on Lens Protocol</p>
        </body>
      </html>
    `);
  });
  
  const httpServer = createServer(app);
  
  const PORT = process.env.PORT || 4000;
  
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`📊 Health check at http://localhost:${PORT}/health`);
  });
  
  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await server.stop();
    await prisma.$disconnect();
    await redis.disconnect();
    process.exit(0);
  });
};

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});