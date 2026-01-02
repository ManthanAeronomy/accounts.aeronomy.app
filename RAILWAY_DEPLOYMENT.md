# Railway Deployment Guide

Complete guide for deploying the Aeronomy Account Management System to Railway.

## Prerequisites

1. **Railway Account**: Sign up at [railway.app](https://railway.app)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Clerk Account**: For authentication (get API keys from [dashboard.clerk.com](https://dashboard.clerk.com))
4. **Resend Account**: For email service (get API key from [resend.com](https://resend.com))
5. **MongoDB**: Either use Railway's MongoDB service or MongoDB Atlas

---

## Step-by-Step Deployment

### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 2. Create a New Project on Railway

1. Go to [railway.app](https://railway.app) and sign in
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository
5. Railway will automatically detect it's a Next.js app

### 3. Set Up MongoDB Database

**Option A: Use Railway's MongoDB Service (Recommended)**
1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"Add MongoDB"**
3. Railway will create a MongoDB instance
4. Click on the MongoDB service
5. Go to the **"Variables"** tab
6. Copy the `MONGO_URL` or `MONGODB_URI` value

**Option B: Use MongoDB Atlas**
1. Create a cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a database user
3. Whitelist Railway's IP (or use `0.0.0.0/0` for all IPs)
4. Get your connection string

### 4. Configure Environment Variables

In your Railway project, go to the **"Variables"** tab and add:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key_here
CLERK_SECRET_KEY=sk_live_your_key_here

# MongoDB (from Railway MongoDB service or Atlas)
MONGODB_URI=mongodb://... (provided by Railway or your Atlas connection string)

# Resend Email Service
RESEND_API_KEY=re_your_api_key_here

# Application URL (Update after deployment)
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

**Important Notes:**
- Use **production** Clerk keys (pk_live_... and sk_live_...) for production
- The `NEXT_PUBLIC_APP_URL` should be updated after you get your Railway domain
- Railway will automatically provide a domain like `your-app.railway.app`

### 5. Configure Clerk for Production

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **"Domains"** or **"Settings"**
4. Add your Railway domain to allowed origins:
   - `https://your-app.railway.app`
   - `https://*.railway.app` (if using Railway's wildcard domain)
5. Update OAuth redirect URLs if using social login

### 6. Configure Resend

1. Go to [Resend Dashboard](https://resend.com)
2. Verify your domain (or use Resend's test domain for development)
3. Update the sender email in `lib/resend.ts` if needed:
   ```typescript
   from: 'Aeronomy <onboarding@yourdomain.com>'
   ```

### 7. Deploy

Railway will automatically:
1. Detect your Next.js app
2. Run `npm install`
3. Run `npm run build`
4. Start the app with `npm start`

**Monitor the deployment:**
- Go to the **"Deployments"** tab to see build logs
- Check for any errors in the logs

### 8. Get Your Domain

1. After successful deployment, go to **"Settings"**
2. Under **"Domains"**, Railway provides a default domain
3. Copy the domain (e.g., `your-app.railway.app`)
4. Update `NEXT_PUBLIC_APP_URL` in Railway variables with this domain
5. Redeploy if needed (Railway auto-redeploys on variable changes)

### 9. Custom Domain (Optional)

1. In Railway project **"Settings"** → **"Domains"**
2. Click **"Custom Domain"**
3. Add your domain (e.g., `accounts.aeronomy.com`)
4. Follow DNS configuration instructions
5. Update `NEXT_PUBLIC_APP_URL` with your custom domain

---

## Environment Variables Reference

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key | Clerk Dashboard → API Keys |
| `CLERK_SECRET_KEY` | Clerk secret key | Clerk Dashboard → API Keys |
| `MONGODB_URI` | MongoDB connection string | Railway MongoDB service or Atlas |
| `RESEND_API_KEY` | Resend API key | Resend Dashboard → API Keys |
| `NEXT_PUBLIC_APP_URL` | Your app URL | Railway domain or custom domain |

---

## Railway-Specific Configuration

### Build Settings

Railway automatically detects Next.js and uses:
- **Build Command**: `npm run build` (automatic)
- **Start Command**: `npm start` (automatic)
- **Node Version**: Latest LTS (automatic)

### Resource Limits

Railway's free tier includes:
- 512MB RAM
- 1GB storage
- 100GB bandwidth/month

For production, consider upgrading if needed.

---

## Post-Deployment Checklist

- [ ] All environment variables are set correctly
- [ ] Clerk domain/redirect URLs are configured
- [ ] MongoDB connection is working (check logs)
- [ ] Email service (Resend) is configured
- [ ] `NEXT_PUBLIC_APP_URL` matches your Railway domain
- [ ] Test sign-up flow
- [ ] Test email verification
- [ ] Test login flow
- [ ] Test OAuth (if enabled)

---

## Troubleshooting

### Build Fails

1. Check build logs in Railway dashboard
2. Ensure all dependencies are in `package.json`
3. Check for TypeScript errors: `npm run build` locally first

### MongoDB Connection Issues

1. Verify `MONGODB_URI` is correct
2. If using Atlas, check IP whitelist (add `0.0.0.0/0` for Railway)
3. Check MongoDB service logs in Railway

### Clerk Authentication Not Working

1. Verify Clerk keys are production keys (pk_live_...)
2. Check Clerk dashboard for allowed domains
3. Ensure `NEXT_PUBLIC_APP_URL` matches your Railway domain

### Email Not Sending

1. Verify Resend API key is correct
2. Check Resend dashboard for errors
3. Verify sender domain is verified in Resend

### App Crashes on Startup

1. Check Railway logs for errors
2. Verify all environment variables are set
3. Check MongoDB connection
4. Ensure Node.js version is compatible

---

## Monitoring

Railway provides:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, network usage
- **Deployments**: Deployment history and rollback

Access these from your Railway project dashboard.

---

## Continuous Deployment

Railway automatically deploys when you push to your connected GitHub branch:
1. Push code to GitHub
2. Railway detects the push
3. Builds and deploys automatically
4. Updates are live in minutes

---

## Cost Estimation

**Free Tier:**
- $5 free credit/month
- Suitable for development/testing

**Production:**
- Pay-as-you-go pricing
- Typically $5-20/month for small apps
- Scales with usage

---

## Support

- Railway Docs: [docs.railway.app](https://docs.railway.app)
- Railway Discord: [discord.gg/railway](https://discord.gg/railway)
- Project Issues: Check GitHub issues

---

## Quick Reference Commands

```bash
# View Railway CLI (if installed)
railway login
railway link
railway up

# Or use Railway dashboard for all operations
```

---

**Last Updated**: 2024
**Railway Version**: Latest

