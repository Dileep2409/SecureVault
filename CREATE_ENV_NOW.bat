@echo off
echo ========================================
echo  Creating .env file NOW
echo ========================================
echo.

echo Step 1: Generating NEXTAUTH_SECRET...
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))" > temp_secret.txt
set /p SECRET=<temp_secret.txt
del temp_secret.txt

echo Step 2: Creating .env file...
echo # Secure Vault Environment Configuration > .env
echo. >> .env
echo MONGODB_URI=mongodb+srv://dileepsengar5141:dileepsengar5141@cluster0.vuko71c.mongodb.net/secure-vault?retryWrites=true^&w=majority^&appName=Cluster0 >> .env
echo. >> .env
echo NEXTAUTH_URL=http://localhost:3000 >> .env
echo. >> .env
echo NEXTAUTH_SECRET=%SECRET% >> .env

echo.
echo ========================================
echo  SUCCESS! .env file created!
echo ========================================
echo.
echo File location: %CD%\.env
echo.
echo ========================================
echo  IMPORTANT: Restart your server NOW!
echo ========================================
echo.
echo 1. Go to your terminal running npm run dev
echo 2. Press Ctrl+C to stop the server
echo 3. Run: npm run dev
echo 4. Go to http://localhost:3000
echo 5. Try signup again
echo.
echo ========================================
pause
