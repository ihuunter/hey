#!/bin/bash

# Deploy Hey Social Media Platform to Vercel

echo "🚀 Starting deployment to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy API first
echo "📡 Deploying API to Vercel..."
cd apps/api

# Set up environment variables for API
echo "Setting up API environment..."
vercel env add DATABASE_URL
vercel env add JWT_SECRET
vercel env add REDIS_URL
vercel env add NODE_ENV
vercel env add SHARED_SECRET

# Deploy API
vercel --prod

# Get API URL
API_URL=$(vercel ls --scope=your-username | grep api | head -1 | awk '{print $2}')
echo "API deployed to: $API_URL"

# Deploy Web App
echo "🌐 Deploying Web App to Vercel..."
cd ../web

# Set up environment variables for web app
echo "Setting up Web environment..."
vercel env add VITE_IS_PRODUCTION
vercel env add VITE_API_URL
vercel env add NEXT_PUBLIC_LENS_NETWORK

# Deploy web app
vercel --prod

echo "✅ Deployment complete!"
echo "🎉 Your Hey social media platform is now live!"

# Get web URL
WEB_URL=$(vercel ls --scope=your-username | grep web | head -1 | awk '{print $2}')
echo "Web app: $WEB_URL"
echo "API: $API_URL"