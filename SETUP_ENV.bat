@echo off
echo ========================================
echo  Creating .env file for Secure Vault
echo ========================================
echo.

echo Generating NEXTAUTH_SECRET...
for /f "delims=" %%i in ('node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"') do set SECRET=%%i

echo.
echo Creating .env file...
(
echo # Secure Vault Environment Configuration
echo.
echo # MongoDB Connection
echo MONGODB_URI=mongodb+srv://dileepsengar5141:dileepsengar5141@cluster0.vuko71c.mongodb.net/secure-vault?retryWrites=true^&w=majority^&appName=Cluster0
echo.
echo # NextAuth Configuration
echo NEXTAUTH_URL=http://localhost:3000
echo NEXTAUTH_SECRET=%SECRET%
) > .env

echo.
echo ========================================
echo  SUCCESS! .env file created
echo ========================================
echo.
echo Your configuration:
echo - MongoDB: Connected to Atlas
echo - NEXTAUTH_SECRET: Generated
echo - NEXTAUTH_URL: http://localhost:3000
echo.
echo ========================================
echo  Next Steps:
echo ========================================
echo 1. Restart your dev server:
echo    - Press Ctrl+C to stop
echo    - Run: npm run dev
echo.
echo 2. Test the app:
echo    - Go to http://localhost:3000
echo    - Click "Sign up"
echo    - Create your account
echo.
echo ========================================
pause
