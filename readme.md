# ByWay

A modern MERN stack application with video processing capabilities, user authentication, and payment integration.

## 🚀 Features

- **Video Processing**: Upload, process, and manage video content with FFmpeg integration
- **User Authentication**: Secure user registration and login with JWT tokens
- **Payment Integration**: Stripe integration for payment processing
- **Cloud Storage**: Cloudinary integration for media storage
- **Search Functionality**: Advanced search capabilities for content discovery
- **Responsive Design**: Modern UI built with React, Ant Design, and Tailwind CSS
- **Real-time Updates**: React Query for efficient data fetching and caching
- **Email Notifications**: Nodemailer integration for user communications

## 🛠️ Tech Stack

### Frontend

- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Ant Design** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Query** - Server state management
- **Axios** - HTTP client
- **React Cookie** - Cookie management

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **Bcrypt** - Password hashing
- **Cloudinary** - Cloud media storage
- **Stripe** - Payment processing
- **Nodemailer** - Email sending
- **FFmpeg** - Video processing
- **Multer** - File upload handling

## 📁 Project Structure

```
ByWay/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── api/           # API service functions
│   │   ├── utils/         # Utility functions
│   │   ├── types/         # TypeScript type definitions
│   │   └── assets/        # Static assets
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend application
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── utils/         # Utility functions
│   │   └── DB/           # Database configuration
│   └── package.json
└── readme.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for media storage)
- Stripe account (for payments)
- Email service (for notifications)

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd ByWay
    ```

2. **Install dependencies**

    ```bash
    # Install server dependencies
    cd server
    npm install

    # Install client dependencies
    cd ../client
    npm install
    ```

3. **Environment Variables**

    Create a `.env` file in the `server` directory:

    ```env
    # Database
    MONGODB_URI=your_mongodb_connection_string

    # JWT
    JWT_SECRET=your_jwt_secret_key

    # Cloudinary
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    # Stripe
    STRIPE_SECRET_KEY=your_stripe_secret_key
    STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

    # Email
    EMAIL_HOST=your_email_host
    EMAIL_PORT=587
    EMAIL_USER=your_email_address
    EMAIL_PASS=your_email_password

    # Frontend URLs
    FRONTEND_DEFAULT_URL=http://localhost:5173
    FRONTEND_URL=your_frontend_url

    # Environment
    NODE_ENV=development
    ```

4. **Start the development servers**

    In separate terminal windows:

    ```bash
    # Start the backend server
    cd server
    npm run dev

    # Start the frontend development server
    cd client
    npm run dev
    ```

    The application will be available at:
    - Frontend: http://localhost:5173
    - Backend: http://localhost:5000

## 📝 Available Scripts

### Server

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run dev:prod` - Start development server in production mode

### Client

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Database Setup

1. Set up a MongoDB database (local or cloud)
2. Update the `MONGODB_URI` in your `.env` file
3. The application will automatically connect on startup

### Cloudinary Setup

1. Create a Cloudinary account
2. Get your cloud name, API key, and API secret
3. Add these to your `.env` file

### Stripe Setup

1. Create a Stripe account
2. Get your secret and publishable keys
3. Add these to your `.env` file

## 🎯 Key Features Implementation

### Video Processing

- Upload videos through the frontend
- Automatic processing with FFmpeg
- Storage on Cloudinary CDN
- Duration extraction and metadata handling

### Authentication

- User registration with email validation
- Secure password hashing with bcrypt
- JWT-based authentication
- Protected routes and middleware

### Payment System

- Stripe integration for one-time payments
- Secure payment processing
- Webhook handling for payment confirmation

### Search Functionality

- Advanced search with filters
- Real-time search results
- Search history and suggestions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions, please open an issue in the repository.
