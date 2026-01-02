# Railway Deployment Script
# Run this after logging in to Railway CLI

Write-Host "🚂 Railway Deployment Script" -ForegroundColor Cyan
Write-Host ""

# Check if logged in
Write-Host "Checking Railway login status..." -ForegroundColor Yellow
$loginCheck = railway whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Not logged in to Railway" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please run: railway login" -ForegroundColor Yellow
    Write-Host "This will open a browser for authentication" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Logged in to Railway" -ForegroundColor Green
Write-Host ""

# Link to existing project or create new
Write-Host "Linking to Railway project..." -ForegroundColor Yellow
railway link

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to link project" -ForegroundColor Red
    Write-Host "You may need to create a project first at https://railway.app" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Project linked" -ForegroundColor Green
Write-Host ""

# Check environment variables
Write-Host "Checking environment variables..." -ForegroundColor Yellow
railway variables

Write-Host ""
Write-Host "⚠️  IMPORTANT: Set these environment variables in Railway:" -ForegroundColor Yellow
Write-Host "   - MONGODB_URI" -ForegroundColor White
Write-Host "   - RESEND_API_KEY" -ForegroundColor White
Write-Host "   - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" -ForegroundColor White
Write-Host "   - CLERK_SECRET_KEY" -ForegroundColor White
Write-Host "   - NEXT_PUBLIC_APP_URL" -ForegroundColor White
Write-Host ""
Write-Host "You can set them with: railway variables set KEY=value" -ForegroundColor Cyan
Write-Host "Or set them in Railway dashboard: https://railway.app" -ForegroundColor Cyan
Write-Host ""

# Deploy
Write-Host "Deploying to Railway..." -ForegroundColor Yellow
railway up

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment initiated!" -ForegroundColor Green
    Write-Host "Check status at: https://railway.app" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed" -ForegroundColor Red
    Write-Host "Check logs with: railway logs" -ForegroundColor Yellow
}

