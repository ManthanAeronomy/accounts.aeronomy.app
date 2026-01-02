# Quick Railway Deployment Guide

## ✅ Railway CLI Installed

The Railway CLI is now installed. Follow these steps:

## Step 1: Login (Interactive - Requires Browser)

Run this command in your terminal:

```powershell
railway login
```

This will:
- Open your browser automatically
- Ask you to authorize the CLI
- Complete authentication

**After login, come back here for the next steps.**

## Step 2: Link or Create Project

### If you already have a Railway project:

```powershell
railway link
```

Select your project from the list.

### If you need to create a new project:

```powershell
railway init
```

## Step 3: Set Environment Variables

**IMPORTANT**: Set these BEFORE deploying to avoid build errors:

```powershell
# MongoDB (get from Railway MongoDB service or Atlas)
railway variables set MONGODB_URI="mongodb://your_connection_string"

# Resend API Key
railway variables set RESEND_API_KEY="re_your_api_key"

# Clerk Keys (use production keys for production)
railway variables set NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_your_key"
railway variables set CLERK_SECRET_KEY="sk_live_your_key"

# App URL (update after deployment with your Railway domain)
railway variables set NEXT_PUBLIC_APP_URL="https://your-app.railway.app"
```

## Step 4: Deploy

```powershell
railway up
```

This will build and deploy your app. The build should complete in 2-5 minutes now that the code is fixed.

## Step 5: Get Your Domain & Update URL

After deployment succeeds:

```powershell
# Get your Railway domain
railway domain

# Or check in Railway dashboard
railway open
```

Then update `NEXT_PUBLIC_APP_URL`:

```powershell
railway variables set NEXT_PUBLIC_APP_URL="https://your-actual-domain.railway.app"
```

## Step 6: Configure Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Add your Railway domain to allowed origins
3. Update OAuth redirect URLs if using social login

## Monitor Deployment

```powershell
# View logs in real-time
railway logs

# Check status
railway status

# Open dashboard
railway open
```

## Troubleshooting

### Build still hanging?
- Check logs: `railway logs`
- Verify all env vars are set: `railway variables`
- Make sure you pushed the code fixes

### Need to cancel deployment?
- Go to Railway dashboard
- Cancel the stuck deployment
- Fix issues and redeploy

---

**Ready?** Start with `railway login` and follow the steps above! 🚀

