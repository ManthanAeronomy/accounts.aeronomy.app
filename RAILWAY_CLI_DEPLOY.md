# Deploy to Railway using CLI

## Step 1: Login to Railway

Open your terminal and run:

```bash
railway login
```

This will:
1. Open your browser
2. Ask you to authorize Railway CLI
3. Complete authentication

## Step 2: Link Your Project

### Option A: Link to Existing Project

If you already created a project on Railway:

```bash
railway link
```

Select your project from the list.

### Option B: Create New Project

```bash
railway init
```

This will:
- Create a new Railway project
- Link it to your current directory
- Set up deployment

## Step 3: Set Environment Variables

Set all required environment variables:

```bash
# MongoDB
railway variables set MONGODB_URI="your_mongodb_connection_string"

# Resend
railway variables set RESEND_API_KEY="re_your_key"

# Clerk
railway variables set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_your_key"
railway variables set CLERK_SECRET_KEY="sk_live_your_key"

# App URL (update after getting Railway domain)
railway variables set NEXT_PUBLIC_APP_URL="https://your-app.railway.app"
```

**Or set them all at once:**

```bash
railway variables set MONGODB_URI="your_uri" RESEND_API_KEY="re_key" NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_key" CLERK_SECRET_KEY="sk_key" NEXT_PUBLIC_APP_URL="https://your-app.railway.app"
```

## Step 4: Deploy

```bash
railway up
```

This will:
- Build your Next.js app
- Deploy to Railway
- Show deployment progress

## Step 5: Get Your Domain

After deployment:

```bash
railway domain
```

Or check Railway dashboard for your domain.

## Step 6: Update App URL

Once you have your Railway domain, update `NEXT_PUBLIC_APP_URL`:

```bash
railway variables set NEXT_PUBLIC_APP_URL="https://your-actual-domain.railway.app"
```

## Useful Commands

```bash
# View logs
railway logs

# View environment variables
railway variables

# Open project in browser
railway open

# Check deployment status
railway status

# View service info
railway service
```

## Quick Deploy Script

You can also use the PowerShell script:

```powershell
.\deploy-railway.ps1
```

## Troubleshooting

### Not Logged In
```bash
railway login
```

### Project Not Linked
```bash
railway link
```

### Build Fails
```bash
# Check logs
railway logs

# Test build locally first
npm run build
```

### Environment Variables Not Set
```bash
# List all variables
railway variables

# Set missing ones
railway variables set KEY=value
```

---

**Need help?** Check Railway docs: https://docs.railway.app

