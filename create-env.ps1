# PowerShell script to create .env file
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Creating .env file for Secure Vault" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Step 1: Generating NEXTAUTH_SECRET..." -ForegroundColor Yellow
$secret = node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

Write-Host "Step 2: Creating .env file..." -ForegroundColor Yellow

$envContent = @"
# Secure Vault Environment Configuration

MONGODB_URI=mongodb+srv://dileepsengar5141:dileepsengar5141@cluster0.vuko71c.mongodb.net/secure-vault?retryWrites=true&w=majority&appName=Cluster0

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=$secret
"@

$envContent | Out-File -FilePath ".env" -Encoding UTF8

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host " SUCCESS! .env file created!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "File location: $PWD\.env" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Yellow
Write-Host " IMPORTANT: Restart your server NOW!" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Go to your terminal running 'npm run dev'" -ForegroundColor White
Write-Host "2. Press Ctrl+C to stop the server" -ForegroundColor White
Write-Host "3. Run: npm run dev" -ForegroundColor White
Write-Host "4. Go to http://localhost:3000" -ForegroundColor White
Write-Host "5. Try signup again" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
