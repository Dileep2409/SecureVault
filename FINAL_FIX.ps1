# PowerShell Script to Create .env File
Write-Host "Creating .env file..." -ForegroundColor Green

$envContent = @"
MONGODB_URI=mongodb+srv://dileepsengar5141:dileepsengar5141@cluster0.vuko71c.mongodb.net/secure-vault?retryWrites=true&w=majority&appName=Cluster0

NEXTAUTH_URL=http://localhost:3000

NEXTAUTH_SECRET=xK8vN2pQ7mR4sT6uW9yZ1aB3cD5eF7gH9iJ0kL2mN4oP6qR8sT0uV2wX4yZ6aB8cD0eF2gH4iJ6k
"@

# Get script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$envPath = Join-Path $scriptPath ".env"

# Write .env file
$envContent | Out-File -FilePath $envPath -Encoding UTF8 -NoNewline

Write-Host ""
Write-Host "SUCCESS! .env file created at:" -ForegroundColor Green
Write-Host $envPath -ForegroundColor Yellow
Write-Host ""
Write-Host "File contents:" -ForegroundColor Cyan
Get-Content $envPath
Write-Host ""
Write-Host "NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Go to your terminal running 'npm run dev'" -ForegroundColor White
Write-Host "2. Press Ctrl+C to stop the server" -ForegroundColor White
Write-Host "3. Run: npm run dev" -ForegroundColor White
Write-Host "4. Go to http://localhost:3000" -ForegroundColor White
Write-Host "5. Try signup again - it will work!" -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
