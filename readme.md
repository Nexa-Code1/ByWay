# ByWay - Modern E-Learning Platform

<div align="center">
  
[![React](https://img.shields.io/badge/React-19-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7+-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-yellow)](LICENSE)

*A comprehensive e-learning platform with video processing, user management, and payment integration*

</div>

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Testing Credentials](#-testing-credentials)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## 📖 Overview

ByWay is a full-featured e-learning platform built with the MERN stack (MongoDB, Express, React, Node.js). The platform enables instructors to create and sell courses while providing students with an interactive learning experience. The application features video processing capabilities, secure user authentication, payment integration, and a modern responsive interface.

### 🎯 Core Objectives
- Provide a seamless learning experience for students
- Empower instructors with easy course creation tools
- Ensure secure transactions and content protection
- Deliver high-quality video content with efficient processing
- Scale to accommodate growing user bases

## 🚀 Features

### 🎓 For Students
- **Course Discovery**: Browse, search, and filter courses by category, difficulty, and rating
- **Enrollment Management**: Enroll in courses, track progress, and manage learning paths
- **Video Learning**: High-quality video playback with progress tracking
- **Wishlist & Cart**: Save courses for later and manage purchases
- **Course Reviews**: Rate and review completed courses
- **Progress Tracking**: Visual progress indicators and completion certificates

### 👨‍🏫 For Instructors
- **Course Creation**: Comprehensive course builder with video uploads
- **Content Management**: Organize courses into sections and lessons
- **Blogs Creation**: Blog text editor for publishing articles

### ⚙️ Platform Features
- **Advanced Video Processing**: FFmpeg integration for video optimization and format conversion
- **Secure Authentication**: JWT-based auth with bcrypt password hashing
- **Payment Integration**: Stripe for secure payment processing
- **Cloud Storage**: Cloudinary for media management and CDN delivery
- **Email Notifications**: Nodemailer integration for user communications
- **Search & Filtering**: Advanced search with real-time suggestions
- **Responsive Design**: Mobile-first approach with modern UI components
- **Real-time Updates**: React Query for efficient state management

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React features with concurrent rendering
- **TypeScript** - Type-safe development with strict type checking
- **Vite** - Next-generation frontend tooling with fast HMR
- **Ant Design** - Enterprise-class UI design system
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **React Router v6** - Declarative routing with nested routes
- **React Query v4** - Server state management with caching
- **Axios** - Promise-based HTTP client with interceptors
- **React Cookie** - Cookie management for authentication

### Backend
- **Node.js v18+** - JavaScript runtime built on Chrome's V8 engine
- **Express.js** - Minimalist web framework for Node.js
- **MongoDB Atlas** - Cloud-based NoSQL database service
- **Mongoose ODM** - Elegant MongoDB object modeling
- **JWT** - JSON Web Tokens for stateless authentication
- **Bcrypt.js** - Secure password hashing algorithm
- **Cloudinary SDK** - Cloud-based media management
- **Stripe SDK** - Payment processing and subscription management
- **Nodemailer** - Email sending for notifications and verification
- **FFmpeg** - Multimedia framework for video processing
- **Multer** - Middleware for handling multipart/form-data
- **CORS** - Cross-origin resource sharing middleware

### Development Tools
- **ESLint** - JavaScript/TypeScript linting with custom rules
- **Prettier** - Code formatting for consistent style
- **Nodemon** - Automatic server restart during development
- **Concurrently** - Run multiple commands concurrently

## 📁 Project Structure

```
ByWay/
├── client/                         # React frontend application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── common/            # Shared components (Buttons, Modals, etc.)
│   │   │   ├── layout/            # Layout components (Header, Footer, Sidebar)
│   │   │   ├── auth/              # Authentication components
│   │   │   ├── courses/           # Course-related components
│   │   │   └── dashboard/         # Dashboard components
│   │   ├── pages/                 # Page-level components
│   │   │   ├── Home/              # Landing page
│   │   │   ├── Auth/              # Authentication pages
│   │   │   ├── Courses/           # Course listing and details
│   │   │   ├── Dashboard/         # User dashboard
│   │   │   └── Instructor/        # Instructor portal
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useAuth/           # Authentication hooks
│   │   │   ├── useCourses/        # Course data hooks
│   │   │   └── useMediaQuery/     # Responsive design hooks
│   │   ├── api/                   # API service layer
│   │   │   ├── auth/              # Authentication API calls
│   │   │   ├── courses/           # Course-related API calls
│   │   │   ├── cart/              # Shopping cart API
│   │   │   ├── payment/           # Payment processing API
│   │   │   └── user/              # User profile API
│   │   ├── utils/                 # Utility functions
│   │   │   ├── formatters/        # Data formatting utilities
│   │   │   ├── validators/        # Form validation helpers
│   │   │   └── constants/         # Application constants
│   │   ├── types/                 # TypeScript type definitions
│   │   │   ├── api/               # API response types
│   │   │   ├── components/        # Component prop types
│   │   │   └── models/            # Data model types
│   │   ├── assets/                # Static assets
│   │   │   ├── images/            # Image assets
│   │   │   ├── icons/             # SVG icons
│   │   │   └── videos/            # Video assets
│   │   ├── styles/                # Global styles and themes
│   │   ├── contexts/              # React context providers
│   │   └── App.tsx                # Main application component
│   ├── public/                    # Static public files
│   ├── package.json               # Frontend dependencies
│   ├── vite.config.js             # Vite configuration
│   ├── tsconfig.json              # TypeScript configuration
│   └── eslint.config.js           # ESLint configuration
├── server/                        # Node.js backend application
│   ├── src/
│   │   ├── controllers/           # Route controllers
│   │   │   ├── authController.js  # Authentication logic
│   │   │   ├── courseController.js # Course management
│   │   │   ├── userController.js   # User profile management
│   │   │   ├── paymentController.js # Payment processing
│   │   │   └── mediaController.js  # Media upload and processing
│   │   ├── models/                # MongoDB models
│   │   │   ├── User.js            # User schema
│   │   │   ├── Course.js          # Course schema
│   │   │   ├── Order.js           # Order schema
│   │   │   └── Review.js          # Review schema
│   │   ├── routes/                # API routes
│   │   │   ├── authRoutes.js      # Authentication routes
│   │   │   ├── courseRoutes.js    # Course management routes
│   │   │   ├── userRoutes.js      # User profile routes
│   │   │   ├── paymentRoutes.js    # Payment routes
│   │   │   └── mediaRoutes.js     # Media upload routes
│   │   ├── middleware/            # Express middleware
│   │   │   ├── authMiddleware.js   # Authentication middleware
│   │   │   ├── errorMiddleware.js  # Error handling middleware
│   │   │   ├── uploadMiddleware.js # File upload middleware
│   │   │   └── validationMiddleware.js # Request validation
│   │   ├── utils/                 # Utility functions
│   │   │   ├── cloudinary.js      # Cloudinary integration
│   │   │   ├── emailService.js     # Email sending utilities
│   │   │   ├── videoProcessor.js  # Video processing utilities
│   │   │   └── validators.js      # Data validation utilities
│   │   ├── config/                # Configuration files
│   │   │   ├── database.js        # Database configuration
│   │   │   ├── cloudinary.js      # Cloudinary configuration
│   │   │   └── stripe.js          # Stripe configuration
│   │   └── app.js                 # Express application setup
│   ├── .env                       # Environment variables (gitignored)
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Server entry point
├── .github/                       # GitHub configuration
│   └── workflows/                 # CI/CD workflows
├── docs/                          # Documentation
│   ├── api/                       # API documentation
│   └── architecture/              # Architecture diagrams
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your development machine:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) or **yarn** (v1.22 or higher)
- **MongoDB** (local installation or cloud instance) - [Download](https://www.mongodb.com/)
- **Git** - [Download](https://git-scm.com/)

Optional but recommended:
- **FFmpeg** (for local video processing) - [Download](https://ffmpeg.org/)
- **Docker** (for containerized deployment) - [Download](https://www.docker.com/)

### Installation

Follow these steps to set up the development environment:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ByWay.git
   cd ByWay
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the `server` directory with the following configuration:

   ```env
   # ========================
   # Application Configuration
   # ========================
   NODE_ENV=development
   PORT=5000
   FRONTEND_URL=http://localhost:5173
   BACKEND_URL=http://localhost:5000
   
   # ========================
   # Database Configuration
   # ========================
   MONGODB_URI=mongodb://localhost:27017/byway
   # For MongoDB Atlas, use:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/byway
   
   # ========================
   # JWT Configuration
   # ========================
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRES_IN=7d
   JWT_COOKIE_EXPIRES_IN=7
   
   # ========================
   # Cloudinary Configuration
   # ========================
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   
   # ========================
   # Stripe Configuration
   # ========================
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   
   # ========================
   # Email Configuration
   # ========================
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_specific_password
   EMAIL_FROM=noreply@byway.com
   
   # ========================
   # File Upload Configuration
   # ========================
   MAX_FILE_SIZE=104857600  # 100MB in bytes
   ALLOWED_IMAGE_TYPES=jpg,jpeg,png,gif,webp
   ALLOWED_VIDEO_TYPES=mp4,avi,mov,wmv,flv
   
   # ========================
   # CORS Configuration
   # ========================
   CORS_ORIGIN=http://localhost:5173
   
   # ========================
   # Security Configuration
   # ========================
   RATE_LIMIT_WINDOW_MS=15*60*1000  # 15 minutes
   RATE_LIMIT_MAX_REQUESTS=100
   ```

5. **Set up frontend environment variables**

   Create a `.env` file in the `client` directory:

   ```env
   VITE_API_BASE_URL=http://localhost:5000/api/v1
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_APP_NAME=ByWay
   ```

### Running the Application

#### Development Mode

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   This starts the Express server on `http://localhost:5000` with hot reload.

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   This starts the Vite development server on `http://localhost:5173`.

#### Production Mode

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server**
   ```bash
   cd server
   npm start
   ```

### Using Docker (Optional)

If you have Docker installed, you can run the entire application using Docker Compose:

```bash
docker-compose up --build
```

This will start both the frontend and backend services along with MongoDB.

## 🔐 Testing Credentials

For development and testing purposes, you can use the following pre-configured accounts:

### Student Account
- **Email**: `tawin78709@meikeya.com`
- **Password**: `12345678`
- **Role**: Student
- **Access**: Browse courses, enroll in courses, track progress, manage wishlist and cart

### Instructor Account
- **Email**: `alex.morgan@eduplatform.com`
- **Password**: `pass1234`
- **Role**: Instructor
- **Access**: Create and manage courses, view analytics, manage students

### Test Cards
For development and testing:

| Card Number | Type | CVC | Expiry |
|-------------|------|-----|--------|
| 4242 4242 4242 4242 | Visa | Any 3 digits | Any future date |
| 5555 5555 5555 4444 | MasterCard | Any 3 digits | Any future date |
| 3782 822463 10005 | American Express | Any 4 digits | Any future date |

## 📋 Available Scripts

### Backend Scripts
```bash
# Development
npm run dev              # Start development server with nodemon
npm run dev:debug        # Start with debug mode enabled
npm run dev:prod         # Start development server in production mode

# Production
npm start                # Start production server
npm run build           # Build for production (if using TypeScript)

# Testing
npm test                # Run test suite
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Run ESLint and fix issues
npm run format          # Format code with Prettier

# Database
npm run db:seed         # Seed database with sample data
npm run db:reset        # Reset database (development only)
```

### Frontend Scripts
```bash
# Development
npm run dev             # Start Vite development server
npm run preview         # Preview production build locally

# Production
npm run build           # Build for production
npm run build:analyze   # Build with bundle analysis

# Testing
npm run test            # Run test suite
npm run test:ui         # Run UI tests
npm run test:coverage   # Run tests with coverage report

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Run ESLint and fix issues
npm run type-check      # Run TypeScript type checking
npm run format          # Format code with Prettier

# Performance
npm run audit           # Run npm audit for security vulnerabilities
npm run bundle-analyze  # Analyze bundle size
```

## 📊 API Documentation

### Base URL
- Development: `http://localhost:5000/api/v1`
- Production: `https://api.byway.com/api/v1`

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"  // or "instructor"
}
```

#### Login User
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/v1/auth/me
Authorization: Bearer <jwt_token>
```

### Course Endpoints

#### Get All Courses
```http
GET /api/v1/courses
Query Parameters:
- page: Page number (default: 1)
- limit: Items per page (default: 10)
- category: Filter by category
- difficulty: Filter by difficulty level
- sort: Sort by field (price, rating, createdAt)
```

#### Get Single Course
```http
GET /api/v1/courses/:id
```

#### Create Course (Instructor Only)
```http
POST /api/v1/courses
Authorization: Bearer <jwt_token>
Content-Type: multipart/form-data

{
  "title": "Course Title",
  "description": "Course Description",
  "price": 99.99,
  "category": "Programming",
  "difficulty": "beginner",
  "thumbnail": <file>,
  "video": <file>
}
```

### Payment Endpoints

#### Create Payment Intent
```http
POST /api/v1/payment/create-payment-intent
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "courseId": "course_id_here",
  "amount": 9999  // Amount in cents
}
```

#### Confirm Payment
```http
POST /api/v1/payment/confirm-payment
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "paymentIntentId": "pi_123456789",
  "courseId": "course_id_here"
}
```

## 🚢 Deployment

### Backend Deployment

#### Option 1: Traditional Server (Ubuntu/Debian)
1. **Set up the server**
   ```bash
   sudo apt update && sudo apt upgrade -y
   sudo apt install nodejs npm git nginx -y
   ```

2. **Clone and configure**
   ```bash
   git clone https://github.com/yourusername/ByWay.git
   cd ByWay/server
   npm install --production
   cp .env.example .env
   # Edit .env with production values
   ```

3. **Set up PM2 for process management**
   ```bash
   sudo npm install -g pm2
   pm2 start server.js --name "byway-backend"
   pm2 startup
   pm2 save
   ```

4. **Configure Nginx as reverse proxy**
   ```bash
   sudo nano /etc/nginx/sites-available/byway
   ```
   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name api.byway.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

#### Option 2: Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d

# Or with Docker directly
docker build -t byway-backend .
docker run -d -p 5000:5000 --name byway-backend byway-backend
```

#### Option 3: Platform as a Service
- **Render**: One-click deployment with automatic SSL
- **Railway**: Simple deployment with database included
- **Heroku**: Traditional PaaS with good free tier

### Frontend Deployment

#### Option 1: Static Hosting (Netlify/Vercel)
1. **Build the project**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables

3. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

#### Option 2: Traditional Web Server
```bash
# Build and copy to web server
cd client
npm run build
scp -r dist/* user@server:/var/www/byway
```

### Database Deployment

#### MongoDB Atlas (Recommended for Production)
1. Create a cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Whitelist your server IP addresses
3. Create a database user with appropriate permissions
4. Use the connection string in your `.env` file

#### Self-hosted MongoDB
```bash
# Install MongoDB
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Create database and user
mongo
> use byway
> db.createUser({
    user: "byway",
    pwd: "secure_password",
    roles: ["readWrite"]
  })
```

## 🤝 Contributing

We welcome contributions from the community! Please follow these steps to contribute:

### Development Workflow

1. **Fork the repository**
   - Click the "Fork" button on GitHub
   - Clone your fork locally
   ```bash
   git clone https://github.com/your-username/ByWay.git
   ```

2. **Set up development environment**
   ```bash
   # Install dependencies
   cd ByWay/server && npm install
   cd ../client && npm install
   
   # Set up environment variables
   cp .env.example .env
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Make your changes**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation as needed

5. **Run tests and linting**
   ```bash
   # Backend
   cd server
   npm test
   npm run lint
   
   # Frontend
   cd client
   npm test
   npm run lint
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

7. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **Create a Pull Request**
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your feature branch
   - Provide a detailed description of your changes

### Contribution Guidelines

- **Code Style**: Follow existing code style and conventions
- **Commit Messages**: Use conventional commits format
- **Testing**: Include tests for new features and bug fixes
- **Documentation**: Update README and relevant documentation
- **Pull Requests**: Keep PRs focused on a single concern

### Reporting Issues

When reporting issues, please include:
1. Clear description of the problem
2. Steps to reproduce
3. Expected vs actual behavior
4. Screenshots if applicable
5. Environment details (OS, Node version, browser)

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

```
Copyright (c) 2024 ByWay

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

## 🆘 Support

### Documentation
- [API Reference](docs/api/README.md)
- [Architecture Guide](docs/architecture/README.md)
- [Deployment Guide](docs/deployment/README.md)

### Getting Help
- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and community support
- **Email**: support@byway.com (for urgent issues)

### Security Issues

If you discover a security vulnerability, please report it responsibly:
1. **Do NOT** create a public GitHub issue
2. Email security@byway.com with details
3. We will respond within 48 hours
4. Once fixed, we'll credit you in our security advisory

---

<div align="center">
  
**ByWay** - Empowering education through technology

</div>
