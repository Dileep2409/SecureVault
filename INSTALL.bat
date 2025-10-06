@echo off
echo ========================================
echo  Secure Vault - Installation Script
echo ========================================
echo.

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/4] Checking for .env file...
if not exist .env (
    echo Creating .env file from template...
    copy .env.example .env
    echo.
    echo IMPORTANT: Please edit .env file with your configuration:
    echo - Add your MongoDB connection string
    echo - Generate and add NEXTAUTH_SECRET
    echo.
    echo To generate NEXTAUTH_SECRET, run:
    echo node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
    echo.
    pause
) else (
    echo .env file already exists
)
echo.

echo [3/4] Verifying configuration...
if not exist .env (
    echo ERROR: .env file not found
    pause
    exit /b 1
)
echo Configuration file found
echo.

echo [4/4] Installation complete!
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo 1. Edit .env file with your MongoDB URI and secrets
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
echo For detailed instructions, see QUICKSTART.md
echo ========================================
pause
