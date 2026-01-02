# Fix: Railway Deployment Stuck on "Initializing"

## Problem
Railway deployment hangs on "Initializing" for 45+ minutes.

## Root Cause
The code was checking for environment variables at **module load time** (when files are imported), which happens during the build process. If env vars aren't set, it throws errors that cause the build to hang.

## ✅ Solution Applied

### 1. Code Fixed
- ✅ `lib/mongodb.ts` - Now checks env vars at runtime only
- ✅ `lib/resend.ts` - Now checks env vars at runtime only
- ✅ Build will no longer fail if env vars are missing

### 2. Immediate Action Required

**Set environment variables in Railway BEFORE deploying:**

1. Go to Railway project → **Variables** tab
2. Add these 5 variables (use placeholder values if needed initially):

```env
MONGODB_URI=mongodb://placeholder
RESEND_API_KEY=re_placeholder
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder
CLERK_SECRET_KEY=sk_test_placeholder
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

3. **Then** push the code changes and redeploy

### 3. If Still Having Issues

#### Option A: Remove Standalone Output (Temporary)

Edit `next.config.js`:

```js
const nextConfig = {
  reactStrictMode: true,
  // output: 'standalone', // Comment this out temporarily
}
```

#### Option B: Check Build Logs

1. Railway project → **Deployments** tab
2. Click on the stuck deployment
3. Check **Build Logs** for errors
4. Look for specific error messages

#### Option C: Cancel and Restart

1. Cancel the stuck deployment
2. Set all environment variables
3. Push code changes
4. Trigger new deployment

## Step-by-Step Fix

1. **Stop current deployment** (if possible)
2. **Set environment variables** in Railway (see above)
3. **Pull latest code** (with fixes):
   ```bash
   git pull origin main
   ```
4. **Push to trigger new deployment**:
   ```bash
   git add .
   git commit -m "Fix Railway deployment - move env checks to runtime"
   git push origin main
   ```
5. **Monitor deployment** - should complete in 2-5 minutes

## Verification

After deployment succeeds:
- ✅ Build completes successfully
- ✅ App starts without errors
- ✅ Update env vars with real values
- ✅ Test the application

## Prevention

**Always set environment variables in Railway BEFORE the first deployment** to avoid build-time errors.

---

## Quick Checklist

- [ ] Code fixes applied (lib/mongodb.ts, lib/resend.ts)
- [ ] Environment variables set in Railway
- [ ] Code pushed to GitHub
- [ ] New deployment triggered
- [ ] Build completes successfully
- [ ] App is running
- [ ] Updated env vars with real values

---

**Need more help?** See `RAILWAY_TROUBLESHOOTING.md` for detailed troubleshooting.

