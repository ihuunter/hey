# Vercel Deployment Guide

Deploy your Hey social media platform to Vercel in minutes!

## 🚀 Quick Deploy

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Node.js 18+ installed locally

### Method 1: One-Click Deploy (Recommended)

1. **Fork this repository** to your GitHub account

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your forked repository
   - Deploy both `/apps/api` and `/apps/web` as separate projects

3. **Configure Environment Variables** (see below)

### Method 2: Manual CLI Deploy

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy API**:
   ```bash
   cd apps/api
   vercel
   ```

4. **Deploy Web App**:
   ```bash
   cd apps/web
   vercel
   ```

### Method 3: Automated Script

1. **Make script executable**:
   ```bash
   chmod +x deploy-vercel.sh
   ```

2. **Run deployment**:
   ```bash
   ./deploy-vercel.sh
   ```

## 🔐 Environment Variables

### API Environment Variables
Set these in your Vercel dashboard for the API project:

```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=production
SHARED_SECRET=your-shared-secret-for-internal-api
REDIS_URL=redis://localhost:6379
PRIVATE_KEY=your-private-key-for-lens-signing
EVER_ACCESS_KEY=your-4everland-access-key
EVER_ACCESS_SECRET=your-4everland-secret-key
OPENROUTER_API_KEY=your-openrouter-api-key
NEXT_PUBLIC_LENS_NETWORK=mainnet
```

### Web App Environment Variables
Set these in your Vercel dashboard for the web project:

```env
VITE_IS_PRODUCTION=true
VITE_API_URL=https://your-api-project.vercel.app
NEXT_PUBLIC_LENS_NETWORK=mainnet
```

## 🗄️ Database Setup

### Option 1: Vercel Postgres (Recommended)
1. Go to your API project in Vercel dashboard
2. Navigate to "Storage" tab
3. Create a new "Postgres" database
4. Copy the connection string to `DATABASE_URL`

### Option 2: External Database
Use any PostgreSQL provider:
- **Railway**: Easy PostgreSQL hosting
- **Supabase**: Free tier with good performance
- **PlanetScale**: MySQL alternative
- **AWS RDS**: Production-grade database

## 🌐 Custom Domain Setup

### Add Custom Domain
1. Go to your project in Vercel dashboard
2. Navigate to "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

### Example DNS Setup
```
CNAME  www     your-project.vercel.app
CNAME  api     your-api-project.vercel.app
```

## 📊 Monitoring & Analytics

### Built-in Vercel Analytics
- Enable in project settings
- Track performance metrics
- Monitor function execution

### Add Custom Analytics
```typescript
// In apps/web/src/main.tsx
import { Analytics } from '@vercel/analytics/react';

// Add to your app
<Analytics />
```

## 🔧 Performance Optimization

### API Optimizations
- Use edge functions for better performance
- Enable caching for static responses
- Optimize database queries

### Web App Optimizations
- Enable Vercel Speed Insights
- Use Web Vitals monitoring
- Implement code splitting

## 🚨 Common Issues & Solutions

### 1. Build Failures
**Issue**: TypeScript errors during build
**Solution**: 
```bash
cd apps/web
npm run typecheck
```

### 2. API Deployment Issues
**Issue**: Serverless function timeout
**Solution**: Increase timeout in `vercel.json`:
```json
{
  "functions": {
    "src/index.ts": {
      "maxDuration": 60
    }
  }
}
```

### 3. Database Connection Issues
**Issue**: Database connection fails
**Solution**: 
- Check `DATABASE_URL` format
- Ensure database is accessible from Vercel
- Verify connection string

### 4. CORS Issues
**Issue**: Frontend can't connect to API
**Solution**: Update CORS settings in API:
```typescript
app.use(cors({
  origin: ['https://your-frontend.vercel.app'],
  credentials: true,
}));
```

## 📈 Scaling Considerations

### Function Limits
- Serverless functions have execution time limits
- Consider breaking down large operations
- Use background jobs for heavy processing

### Database Scaling
- Monitor connection pool usage
- Implement connection pooling
- Consider read replicas for heavy read workloads

## 🔐 Security Best Practices

### Environment Variables
- Never commit secrets to git
- Use Vercel's encrypted environment variables
- Rotate secrets regularly

### API Security
- Rate limiting is automatically handled by Vercel
- Implement proper authentication
- Validate all inputs

## 🚀 Deployment Workflow

### Automatic Deployments
1. **Push to main branch** → Automatic production deployment
2. **Push to other branches** → Preview deployments
3. **Pull requests** → Preview deployments with comments

### Manual Deployments
```bash
# Production deployment
vercel --prod

# Preview deployment
vercel
```

## 📝 Project Structure for Vercel

```
hey/
├── apps/
│   ├── api/
│   │   ├── vercel.json          # API deployment config
│   │   ├── src/
│   │   │   └── index.ts         # Main API handler
│   │   └── package.json
│   └── web/
│       ├── vercel.json          # Web deployment config
│       ├── dist/                # Built files
│       └── package.json
├── deploy-vercel.sh             # Deployment script
└── VERCEL_DEPLOYMENT.md         # This file
```

## 🎯 Testing Your Deployment

### API Health Check
```bash
curl https://your-api-project.vercel.app/health
```

### GraphQL Endpoint
```bash
curl -X POST https://your-api-project.vercel.app/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ posts(limit: 1) { id } }"}'
```

### Web App
Visit `https://your-web-project.vercel.app`

## 📞 Support

### Getting Help
- Check [Vercel Documentation](https://vercel.com/docs)
- Join [Vercel Discord](https://vercel.com/discord)
- Create issue on GitHub repository

### Useful Commands
```bash
# View deployments
vercel ls

# View logs
vercel logs

# Remove deployment
vercel remove

# Check project info
vercel inspect
```

## 🎉 You're Live!

Once deployed, your Hey social media platform will be:
- ✅ Globally distributed via Vercel's CDN
- ✅ Automatically scaled based on traffic
- ✅ Secured with HTTPS
- ✅ Monitored with built-in analytics

**Congratulations! Your social media platform is now live on Vercel! 🚀**

---

Need help? Check the troubleshooting section or create an issue on GitHub.