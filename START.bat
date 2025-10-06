@echo off
echo ========================================
echo  Secure Vault - Starting Development Server
echo ========================================
echo.

if not exist node_modules (
    echo ERROR: Dependencies not installed
    echo Please run INSTALL.bat first
    pause
    exit /b 1
)

if not exist .env (
    echo ERROR: .env file not found
    echo Please run INSTALL.bat first
    pause
    exit /b 1
)

echo Starting development server...
echo.
echo The app will be available at:
echo http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
