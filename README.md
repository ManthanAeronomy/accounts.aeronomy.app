# Aeronomy Account Management System

A compliance-first account management system for Aeronomy's Sustainable Aviation Fuel (SAF) marketplace platform with email verification.

## Features

- 🔐 **Custom Authentication**: Email/password login with Clerk integration
- 📧 **Email Verification**: 6-digit code verification via Resend
- 🎨 **Modern UI**: Travel-themed design with aviation imagery
- 👥 **Social Login**: Google, Apple, and Facebook OAuth
- 🗄️ **MongoDB**: Secure user data storage
- ⚡ **Next.js 14**: App Router with TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- Clerk account
- Resend account

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key

# MongoDB
MONGODB_URI=mongodb://localhost:27017/aeronomy-accounts
# Or MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/aeronomy-accounts

# Resend Email
RESEND_API_KEY=re_your_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Application Flow

### User Journey

1. **Login** (`/`) - Homepage with email/password or social login
2. **Sign Up** (`/sign-up`) - Create new account
3. **Email Verification** (`/verify-email`) - Enter 6-digit code sent to email
4. **Dashboard** (`/dashboard`) - Account overview and management
5. **Profile** (`/dashboard/profile`) - Edit account details

### Routes

- `/` - Login page (homepage)
- `/sign-up` - Registration page
- `/verify-email` - Email verification page (protected)
- `/dashboard` - User dashboard (protected, requires verified email)
- `/dashboard/profile` - Edit profile (protected)
- `/forgot-password` - Password reset
- `/sso-callback` - OAuth callback handler

### API Endpoints

- `POST /api/auth/verify-email` - Send verification code
- `POST /api/auth/verify-code` - Verify email with code
- `GET /api/accounts` - Get user account
- `POST /api/accounts` - Create account
- `PATCH /api/accounts` - Update account

## Configuration

### Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Enable email/password authentication
4. Enable OAuth providers (Google, Apple, Facebook)
5. Copy API keys to `.env.local`

### Resend Setup

1. Go to [Resend Dashboard](https://resend.com)
2. Verify your domain (or use Resend's test domain for development)
3. Create an API key
4. Update the sender email in `lib/resend.ts`:
   ```typescript
   from: 'Aeronomy <onboarding@yourdomain.com>'
   ```

### MongoDB Setup

**Local:**
```bash
mongod --dbpath=/path/to/data
```

**Atlas:**
1. Create a cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist your IP
4. Copy the connection string to `.env.local`

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose
- **Email**: Resend SDK
- **Styling**: Tailwind CSS
- **Fonts**: Inter (Google Fonts)

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── accounts/          # Account CRUD operations
│   │   └── auth/              # Verification endpoints
│   ├── dashboard/             # Protected dashboard pages
│   ├── page.tsx               # Login page (homepage)
│   ├── sign-up/               # Registration page
│   ├── verify-email/          # Email verification
│   └── forgot-password/       # Password reset
├── lib/
│   ├── mongodb.ts             # Database connection
│   ├── resend.ts              # Email utilities
│   └── user-service.ts        # User operations
├── models/
│   ├── User.ts                # User schema
│   └── VerificationCode.ts   # Verification code schema
└── middleware.ts              # Route protection
```

## Features in Detail

### Email Verification

- 6-digit code sent via Resend
- 10-minute expiration
- Auto-focus and paste support
- Resend code functionality
- Beautiful email template

### Authentication

- Email/password login
- OAuth (Google, Apple, Facebook)
- Remember me functionality
- Password visibility toggle
- Forgot password flow

### Account Management

- User profile editing
- Role-based access (buyer/seller/admin)
- Company information
- Account status tracking
- Email verification status

## Security

- Protected routes with Clerk middleware
- Email verification required for dashboard access
- Secure password handling via Clerk
- MongoDB connection with proper error handling
- Environment variables for sensitive data

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Deployment

### Railway

**Quick Start:**
1. Push code to GitHub
2. Create new project on [Railway](https://railway.app)
3. Connect your GitHub repository
4. Add MongoDB service (or use Atlas)
5. Set environment variables (see below)
6. Deploy automatically

**Detailed Guide:** See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for complete step-by-step instructions.

**Required Environment Variables:**
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
MONGODB_URI=mongodb://... (from Railway MongoDB or Atlas)
RESEND_API_KEY=re_...
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

### Vercel (Alternative)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Ensure all environment variables are set in your deployment platform:
- Clerk keys (use production keys: `pk_live_...` and `sk_live_...`)
- MongoDB URI (from Railway MongoDB service or Atlas)
- Resend API key
- App URL (your Railway domain or custom domain)

## Troubleshooting

### Email not sending
- Verify Resend API key
- Check sender domain verification
- Review Resend dashboard for errors

### Clerk authentication issues
- Verify API keys are correct
- Check Clerk dashboard for application settings
- Ensure OAuth providers are enabled

### MongoDB connection errors
- Verify connection string
- Check IP whitelist (Atlas)
- Ensure database user has correct permissions

## License

Private - Aeronomy
