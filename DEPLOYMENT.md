# Deployment Guide

This guide covers deploying the Hey social media platform to production.

## 🚀 Quick Deploy Options

### Option 1: Railway (Recommended)
Railway provides easy deployment for both frontend and backend.

#### Backend (API) Deployment
1. Connect your GitHub repository to Railway
2. Create a new service for the API
3. Set the root directory to `apps/api`
4. Configure environment variables:
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-production-secret
   NODE_ENV=production
   PORT=4000
   ```
5. Deploy with PostgreSQL addon

#### Frontend (Web) Deployment
1. Create another service for the web app
2. Set the root directory to `apps/web`
3. Configure environment variables:
   ```
   VITE_IS_PRODUCTION=true
   NEXT_PUBLIC_LENS_NETWORK=mainnet
   ```
4. Deploy with static hosting

### Option 2: Vercel + Heroku
- Frontend: Deploy to Vercel
- Backend: Deploy to Heroku with PostgreSQL addon

### Option 3: AWS
- Frontend: S3 + CloudFront
- Backend: ECS/Lambda with RDS PostgreSQL

## 🗄️ Database Setup

### PostgreSQL (Production)
1. Update `apps/api/prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Run migrations:
   ```bash
   cd apps/api
   npm run db:migrate
   ```

## 🔐 Environment Variables

### Backend (.env)
```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database"
LENS_DATABASE_URL="postgresql://user:password@host:5432/lens_database"

# Redis (optional)
REDIS_URL="redis://host:6379"

# Authentication
JWT_SECRET="your-super-secret-jwt-key"
PRIVATE_KEY="your-private-key-for-lens-signing"

# External Services
EVER_ACCESS_KEY="your-4everland-access-key"
EVER_ACCESS_SECRET="your-4everland-secret-key"
OPENROUTER_API_KEY="your-openrouter-api-key"

# API Configuration
PORT=4000
NODE_ENV=production
SHARED_SECRET="your-shared-secret"

# Lens Protocol
NEXT_PUBLIC_LENS_NETWORK="mainnet"
```

### Frontend (.env)
```env
VITE_IS_PRODUCTION=true
NEXT_PUBLIC_LENS_NETWORK=mainnet
```

## 🌐 Domain Setup

### Custom Domain
1. Point your domain to the deployed services
2. Set up SSL certificates
3. Configure CORS in the backend for your domain

### Example DNS Records
```
A    @           IP_ADDRESS
A    api         API_IP_ADDRESS
CNAME www        your-domain.com
```

## 📊 Monitoring & Analytics

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics
- **Uptime Monitoring**: UptimeRobot
- **Performance**: New Relic

### Backend Monitoring
Add monitoring to your API server:
```javascript
// In apps/api/src/index.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
});
```

## 🔧 Production Optimizations

### Backend
- Enable Redis caching
- Set up rate limiting
- Configure security headers
- Use PM2 for process management
- Set up log rotation

### Frontend
- Enable production build optimizations
- Configure CDN for static assets
- Set up service workers for offline support
- Enable gzip compression

## 🔒 Security Checklist

- [ ] HTTPS enabled on all domains
- [ ] Strong JWT secrets
- [ ] Rate limiting configured
- [ ] Input validation on all endpoints
- [ ] CORS properly configured
- [ ] Security headers enabled
- [ ] Database connection secured
- [ ] Regular security updates

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Ensure database is accessible
   - Verify firewall rules

2. **CORS Errors**
   - Update CORS configuration in backend
   - Check frontend environment variables

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Debugging Commands
```bash
# Check API health
curl https://your-api.com/health

# Check GraphQL endpoint
curl -X POST https://your-api.com/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "query { posts(limit: 1) { id } }"}'

# Check database connection
cd apps/api
npm run db:studio
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: |
          cd apps/api && npm install
          cd ../web && npm install
          
      - name: Run tests
        run: |
          cd apps/api && npm test
          cd ../web && npm test
          
      - name: Deploy to Railway
        # Add your deployment commands here
```

## 📈 Scaling Considerations

### Database Scaling
- Set up read replicas
- Enable connection pooling
- Consider database sharding for large datasets

### Application Scaling
- Implement horizontal scaling
- Use load balancers
- Consider microservices architecture

### CDN & Caching
- Set up CloudFront or similar CDN
- Implement Redis caching
- Enable browser caching

## 🎯 Performance Optimization

### Backend
- Database query optimization
- Implement pagination
- Use DataLoader for GraphQL
- Enable compression

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis

## 📞 Support

For deployment issues:
1. Check the troubleshooting section
2. Review server logs
3. Create an issue on GitHub
4. Contact support team

---

**Happy deploying! 🚀**