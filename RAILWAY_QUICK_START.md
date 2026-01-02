# Railway Quick Start Guide

## What You Need for Railway Deployment

### 1. **Railway Account & Repository**
- ✅ Railway account: [railway.app](https://railway.app)
- ✅ Code pushed to GitHub

### 2. **Required Services & API Keys**

#### Clerk (Authentication)
- Get from: [dashboard.clerk.com](https://dashboard.clerk.com)
- Need: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`
- **Important**: Use **production keys** (`pk_live_...` and `sk_live_...`) for production

#### MongoDB (Database)
- **Option 1**: Use Railway's MongoDB service (recommended)
  - Add MongoDB service in Railway project
  - Get connection string from Railway
- **Option 2**: Use MongoDB Atlas
  - Create cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
  - Whitelist IP: `0.0.0.0/0` (allows Railway)
  - Get connection string

#### Resend (Email Service)
- Get from: [resend.com](https://resend.com)
- Need: `RESEND_API_KEY`
- Verify your domain (or use test domain)

### 3. **Environment Variables to Set in Railway**

Go to Railway project → **Variables** tab and add:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key
CLERK_SECRET_KEY=sk_live_your_key
MONGODB_URI=mongodb://your_connection_string
RESEND_API_KEY=re_your_key
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

**Note**: Update `NEXT_PUBLIC_APP_URL` after Railway gives you a domain.

---

## Deployment Steps (5 Minutes)

1. **Create Railway Project**
   - Go to [railway.app](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

2. **Add MongoDB** (if using Railway's service)
   - Click "+ New" → "Database" → "Add MongoDB"
   - Copy the connection string

3. **Set Environment Variables**
   - Go to "Variables" tab
   - Add all 5 variables listed above

4. **Deploy**
   - Railway auto-deploys on push
   - Or click "Deploy" button
   - Wait for build to complete

5. **Get Your Domain**
   - Go to "Settings" → "Domains"
   - Copy your Railway domain
   - Update `NEXT_PUBLIC_APP_URL` with this domain
   - Redeploy if needed

6. **Configure Clerk**
   - Go to Clerk dashboard
   - Add Railway domain to allowed origins
   - Update OAuth redirect URLs

---

## Files Created for Railway

✅ `railway.json` - Railway configuration  
✅ `RAILWAY_DEPLOYMENT.md` - Complete deployment guide  
✅ `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist  
✅ `next.config.js` - Updated with standalone output  

---

## Common Issues & Solutions

**Build Fails**
- Check Railway logs
- Run `npm run build` locally first
- Fix any TypeScript errors

**MongoDB Connection Error**
- Verify `MONGODB_URI` is correct
- If using Atlas, check IP whitelist
- Test connection string

**Clerk Not Working**
- Use production keys (`pk_live_...`)
- Add Railway domain to Clerk allowed origins
- Check `NEXT_PUBLIC_APP_URL` matches your domain

**Email Not Sending**
- Verify Resend API key
- Check Resend dashboard for errors
- Verify sender domain

---

## Cost

- **Free Tier**: $5 credit/month (good for testing)
- **Production**: ~$5-20/month (pay-as-you-go)

---

## Need Help?

- 📖 Full Guide: See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md)
- ✅ Checklist: See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- 🚂 Railway Docs: [docs.railway.app](https://docs.railway.app)

---

**That's it!** Your app should be live on Railway in minutes. 🚀

