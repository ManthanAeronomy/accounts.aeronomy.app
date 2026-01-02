# Railway Deployment Troubleshooting

## Issue: Deployment Stuck on "Initializing" for 45+ Minutes

### Root Causes

1. **Environment Variables Missing During Build**
   - `lib/mongodb.ts` and `lib/resend.ts` throw errors at module load if env vars are missing
   - Next.js tries to analyze these files during build, causing it to hang

2. **Standalone Output Configuration**
   - `output: 'standalone'` in `next.config.js` might conflict with Railway's build process

3. **Build Timeout**
   - Railway has a default build timeout
   - Missing env vars cause build to hang until timeout

### Solutions

#### Solution 1: Set Environment Variables BEFORE First Deploy

**Critical**: Set ALL environment variables in Railway BEFORE the first deployment:

1. Go to Railway project → **Variables** tab
2. Add these variables (even with placeholder values):
   ```env
   MONGODB_URI=mongodb://placeholder
   RESEND_API_KEY=re_placeholder
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder
   CLERK_SECRET_KEY=sk_test_placeholder
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
3. Then trigger deployment
4. Update with real values after build succeeds

#### Solution 2: Fix Code to Handle Missing Env Vars During Build

The code has been updated to only check env vars at runtime, not at module load.

#### Solution 3: Remove Standalone Output (Temporary)

If still having issues, temporarily remove `output: 'standalone'` from `next.config.js`:

```js
const nextConfig = {
  reactStrictMode: true,
  // output: 'standalone', // Comment out temporarily
}
```

#### Solution 4: Check Railway Build Logs

1. Go to Railway project → **Deployments** tab
2. Click on the stuck deployment
3. Check **Build Logs** for specific errors
4. Look for:
   - "Please add your Mongo URI"
   - "Please add your Resend API key"
   - Build timeout errors
   - Node version issues

#### Solution 5: Use Railway CLI to Debug

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Check build locally
railway run npm run build
```

### Quick Fix Steps

1. **Stop the current deployment** (if possible)
2. **Set all environment variables** in Railway
3. **Update the code** (files have been fixed)
4. **Push changes** to GitHub
5. **Redeploy** on Railway

### Prevention

Always set environment variables BEFORE the first deployment to avoid build-time errors.

