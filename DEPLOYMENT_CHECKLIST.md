# Railway Deployment Checklist

Quick checklist for deploying to Railway.

## Pre-Deployment

- [ ] Code is pushed to GitHub
- [ ] All local tests pass
- [ ] `npm run build` succeeds locally
- [ ] No TypeScript errors
- [ ] No linting errors

## Railway Setup

- [ ] Created Railway account
- [ ] Created new project on Railway
- [ ] Connected GitHub repository
- [ ] Railway detected Next.js automatically

## Database Setup

- [ ] Added MongoDB service on Railway (OR)
- [ ] Set up MongoDB Atlas cluster
- [ ] Got MongoDB connection string
- [ ] Tested MongoDB connection

## Environment Variables

Add these in Railway → Variables tab:

- [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (production key: `pk_live_...`)
- [ ] `CLERK_SECRET_KEY` (production key: `sk_live_...`)
- [ ] `MONGODB_URI` (from Railway MongoDB or Atlas)
- [ ] `RESEND_API_KEY` (from Resend dashboard)
- [ ] `NEXT_PUBLIC_APP_URL` (will update after deployment)

## Clerk Configuration

- [ ] Switched to production keys in Clerk dashboard
- [ ] Added Railway domain to Clerk allowed origins
- [ ] Updated OAuth redirect URLs (if using social login)
- [ ] Tested Clerk authentication

## Resend Configuration

- [ ] Verified sender domain in Resend (or using test domain)
- [ ] Updated sender email in `lib/resend.ts` if needed
- [ ] Tested email sending

## Deployment

- [ ] Railway build completed successfully
- [ ] No errors in deployment logs
- [ ] App is running (check status)
- [ ] Got Railway domain (e.g., `your-app.railway.app`)

## Post-Deployment

- [ ] Updated `NEXT_PUBLIC_APP_URL` with Railway domain
- [ ] Redeployed after updating URL (if needed)
- [ ] Tested homepage loads
- [ ] Tested sign-up flow
- [ ] Tested email verification
- [ ] Tested login flow
- [ ] Tested dashboard access
- [ ] Tested profile editing
- [ ] Tested OAuth (if enabled)

## Monitoring

- [ ] Checked Railway logs for errors
- [ ] Monitored resource usage (CPU, memory)
- [ ] Set up alerts (optional)

## Custom Domain (Optional)

- [ ] Added custom domain in Railway
- [ ] Configured DNS records
- [ ] Updated `NEXT_PUBLIC_APP_URL` with custom domain
- [ ] SSL certificate issued (automatic)
- [ ] Tested custom domain

## Security

- [ ] All environment variables are set (no secrets in code)
- [ ] Using production Clerk keys
- [ ] MongoDB connection is secure
- [ ] HTTPS is enabled (automatic on Railway)

## Documentation

- [ ] Updated team with deployment URL
- [ ] Documented any custom configurations
- [ ] Saved environment variable backup (secure location)

---

**Quick Links:**
- Railway Dashboard: https://railway.app
- Clerk Dashboard: https://dashboard.clerk.com
- Resend Dashboard: https://resend.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas

