# Hey - Decentralized Social Media Platform

A modern, full-stack social media application built with React, Node.js, GraphQL, and Prisma. This platform features user authentication, posts, comments, groups, notifications, and more.

## 🚀 Quick Start

### Deploy to Vercel (One-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fhey&project-name=hey-social-media&repository-name=hey-social-media&build-command=npm%20run%20build&output-directory=dist&root-directory=apps%2Fweb)

**Quick Deploy Instructions:**
1. Fork this repository to your GitHub account
2. Click the "Deploy with Vercel" button above
3. Follow the [Vercel Deployment Guide](VERCEL_DEPLOYMENT.md) for full setup

### Local Development

#### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18 or higher)
- [pnpm](https://pnpm.io/installation) (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hey
   ```

2. **Install dependencies**
   ```bash
   # For API
   cd apps/api
   npm install

   # For Web
   cd ../web
   npm install
   ```

3. **Set up the API**
   ```bash
   cd apps/api
   
   # Copy environment variables
   cp .env.example .env
   
   # Generate Prisma client
   npm run db:generate
   
   # Create database
   npm run db:push
   
   # Start API server
   npm run dev
   ```

4. **Set up the Web app**
   ```bash
   cd apps/web
   
   # Copy environment variables
   cp .env.example .env
   
   # Start web server
   npm run dev
   ```

5. **Access the application**
   - Web app: http://localhost:4783
   - API GraphQL Playground: http://localhost:4000/graphql
   - API Health check: http://localhost:4000/health

## 🏗️ Architecture

### Backend (API)
- **Framework**: Node.js with Express
- **GraphQL**: Apollo Server with TypeGraphQL
- **Database**: SQLite (development) with Prisma ORM
- **Authentication**: JWT tokens
- **Caching**: Redis (optional)

### Frontend (Web)
- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **GraphQL Client**: Apollo Client
- **Routing**: React Router

## 🔥 Features

### Core Features
- ✅ User registration and authentication
- ✅ Create and view posts
- ✅ Like and bookmark posts
- ✅ Comment on posts with nested replies
- ✅ Follow/unfollow users
- ✅ User profiles with customizable info
- ✅ Real-time notifications
- ✅ Group creation and management
- ✅ Media uploads (images and videos)
- ✅ Search functionality
- ✅ Timeline/feed algorithms

### Advanced Features
- ✅ Mobile-responsive design
- ✅ Dark/light theme support
- ✅ SEO optimization with OpenGraph
- ✅ Rate limiting and security
- ✅ Error handling and validation
- ✅ Performance optimization

## 📁 Project Structure

```
hey/
├── apps/
│   ├── api/                    # Backend API
│   │   ├── src/
│   │   │   ├── resolvers/      # GraphQL resolvers
│   │   │   ├── middleware/     # Authentication & security
│   │   │   ├── types/          # TypeScript types
│   │   │   └── index.ts        # Server entry point
│   │   ├── prisma/
│   │   │   └── schema.prisma   # Database schema
│   │   └── package.json
│   └── web/                    # Frontend React app
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── hooks/          # Custom hooks
│       │   ├── store/          # State management
│       │   └── routes.tsx      # App routing
│       └── package.json
├── README.md
└── LICENSE
```

## 🔌 API Endpoints

### Authentication
- `mutation register(input: RegisterInput!): AuthPayload!`
- `mutation login(input: LoginInput!): AuthPayload!`
- `query me: User`

### Posts
- `query posts(limit: Int, cursor: String): [Post!]!`
- `query post(id: ID!): Post`
- `mutation createPost(input: CreatePostInput!): Post!`
- `mutation likePost(postId: ID!): Boolean!`
- `mutation bookmarkPost(postId: ID!): Boolean!`

### Users
- `query users(limit: Int): [User!]!`
- `query user(address: String, username: String): User`
- `mutation updateProfile(input: UpdateProfileInput!): User!`
- `mutation followUser(userAddress: String!): Boolean!`

### Comments
- `query comments(postId: ID!, limit: Int): [Comment!]!`
- `mutation createComment(input: CreateCommentInput!): Comment!`
- `mutation likeComment(commentId: ID!): Boolean!`

### Groups
- `query groups(limit: Int): [Group!]!`
- `query group(id: ID!): Group`
- `mutation createGroup(input: CreateGroupInput!): Group!`
- `mutation joinGroup(groupId: ID!): Boolean!`

### Notifications
- `query notifications(limit: Int): [Notification!]!`
- `mutation markNotificationAsRead(notificationId: ID!): Boolean!`
- `mutation markAllNotificationsAsRead: Boolean!`

## 🚀 Deployment

### Backend Deployment
The API can be deployed to any Node.js hosting platform:
- Heroku, Railway, or Render for easy deployment
- AWS, Google Cloud, or Azure for production
- Configure PostgreSQL for production database

### Frontend Deployment
The web app can be deployed to any static hosting:
- Vercel, Netlify, or GitHub Pages for easy deployment
- AWS S3 + CloudFront for production
- Configure environment variables for production API

## 🧪 Development

### Running Tests
```bash
# API tests
cd apps/api
npm test

# Web tests
cd apps/web
npm test
```

### Database Management
```bash
# View database
npm run db:studio

# Reset database
npm run db:push --force-reset

# Create migration
npm run db:migrate
```

## 🔒 Security Features

- JWT token authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Helmet.js security headers
- SQL injection prevention with Prisma
- XSS protection

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the GNU AGPL-3.0 License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by decentralized social media principles
- Designed for scalability and performance

---

**Happy coding! 🚀**
