# One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fhey&project-name=hey-social-media&repository-name=hey-social-media&build-command=npm%20run%20build&output-directory=dist&root-directory=apps%2Fweb)

## Deploy Both Frontend and Backend

### Step 1: Deploy Frontend (Web App)
Click the button above to deploy the frontend to Vercel. This will:
- Create a new project from the `apps/web` directory
- Build the React app with Vite
- Deploy to a global CDN

### Step 2: Deploy Backend (API)
1. Create a new project in Vercel
2. Import your GitHub repository
3. Set the **Root Directory** to `apps/api`
4. Configure the environment variables listed below

## Required Environment Variables

### For Frontend Project
```
VITE_IS_PRODUCTION=true
VITE_API_URL=https://your-api-project.vercel.app
NEXT_PUBLIC_LENS_NETWORK=mainnet
```

### For Backend Project
```
DATABASE_URL=postgresql://username:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=production
SHARED_SECRET=your-shared-secret
```

## Custom Deploy URLs

### Deploy Frontend Only
```
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fhey&project-name=hey-web&repository-name=hey-web&build-command=npm%20run%20build&output-directory=dist&root-directory=apps%2Fweb&env=VITE_IS_PRODUCTION,VITE_API_URL,NEXT_PUBLIC_LENS_NETWORK
```

### Deploy Backend Only
```
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fhey&project-name=hey-api&repository-name=hey-api&build-command=npm%20run%20build&root-directory=apps%2Fapi&env=DATABASE_URL,JWT_SECRET,NODE_ENV,SHARED_SECRET
```

## Quick Setup Guide

1. **Fork the Repository**: Fork this repository to your GitHub account
2. **Click Deploy Button**: Use the deploy button above
3. **Configure Variables**: Set the required environment variables
4. **Deploy Backend**: Create a second project for the API
5. **Update API URL**: Update the frontend's `VITE_API_URL` to point to your API deployment

## Database Setup

After deploying, you'll need a PostgreSQL database:

1. **Vercel Postgres** (Recommended)
   - Go to your API project dashboard
   - Click "Storage" → "Create Database" → "Postgres"
   - Copy the connection string to `DATABASE_URL`

2. **External Database**
   - Use Railway, Supabase, or any PostgreSQL provider
   - Copy the connection string to `DATABASE_URL`

## Custom Domains

Once deployed, you can add custom domains:
- Frontend: `yourapp.com`
- Backend: `api.yourapp.com`

## Support

Need help? Check the [Vercel Deployment Guide](VERCEL_DEPLOYMENT.md) for detailed instructions.