# 🔧 Fix "An error occurred. Please try again" Error

## The Problem

You're seeing this error because the application isn't configured yet. The `.env` file with database credentials is missing.

## ✅ Quick Fix (5 Minutes)

### Step 1: Create .env File

1. **Copy the example file**:
   ```bash
   copy .env.example .env
   ```

2. **Or create manually**: Create a new file named `.env` in the project root

### Step 2: Choose MongoDB Option

#### Option A: MongoDB Atlas (Recommended - Free & Easy)

1. **Sign up**: Go to https://www.mongodb.com/cloud/atlas/register
2. **Create free cluster**: 
   - Click "Build a Database"
   - Choose "Free" (M0)
   - Select a region close to you
   - Click "Create"
3. **Create database user**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `admin` (or your choice)
   - Password: Generate a strong password (save it!)
   - User Privileges: "Atlas admin"
   - Click "Add User"
4. **Whitelist IP**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"
5. **Get connection string**:
   - Go back to "Database"
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `secure-vault`

   Example:
   ```
   mongodb+srv://admin:YourPassword123@cluster0.xxxxx.mongodb.net/secure-vault
   ```

#### Option B: Local MongoDB (If Already Installed)

If you have MongoDB installed locally:
```
mongodb://localhost:27017/secure-vault
```

### Step 3: Configure .env File

Open `.env` and add:

```env
# MongoDB Connection (choose one option above)
MONGODB_URI=mongodb+srv://admin:YourPassword@cluster0.xxxxx.mongodb.net/secure-vault

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000

# Generate this secret (run the command below)
NEXTAUTH_SECRET=your-secret-here
```

### Step 4: Generate NEXTAUTH_SECRET

Run this command in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and paste it as your `NEXTAUTH_SECRET` in `.env`

Example `.env` file:
```env
MONGODB_URI=mongodb+srv://admin:MyPass123@cluster0.abc123.mongodb.net/secure-vault
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=xK8vN2pQ7mR4sT6uW9yZ1aB3cD5eF7gH9iJ0kL2mN4oP6qR8sT0uV2wX4yZ6aB8c
```

### Step 5: Restart the Server

1. **Stop the server**: Press `Ctrl+C` in the terminal
2. **Start again**: 
   ```bash
   npm run dev
   ```
   Or double-click `START.bat`

### Step 6: Test Signup

1. Go to http://localhost:3000
2. Click "Sign up"
3. Enter email and password
4. Click "Create Account"

✅ **It should work now!**

---

## 🐛 Still Having Issues?

### Error: "Database not configured"
- Make sure `.env` file exists in the project root
- Check that `MONGODB_URI` is set in `.env`
- Restart the dev server after creating `.env`

### Error: "Database connection failed"
- **For Atlas**: 
  - Check your IP is whitelisted (0.0.0.0/0)
  - Verify the password in connection string is correct
  - Make sure you replaced `<password>` with actual password
- **For Local**:
  - Check MongoDB is running: `mongosh`
  - Verify connection string: `mongodb://localhost:27017/secure-vault`

### Error: "User already exists"
- This email is already registered
- Try a different email or sign in instead

### Server won't start
- Check all environment variables are set
- Make sure no syntax errors in `.env`
- Delete `.next` folder and restart: `rm -rf .next && npm run dev`

---

## 📋 Complete .env Template

```env
# ===========================================
# MongoDB Configuration
# ===========================================
# Choose ONE option:

# Option 1: MongoDB Atlas (Cloud - Recommended)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secure-vault

# Option 2: Local MongoDB
# MONGODB_URI=mongodb://localhost:27017/secure-vault

# ===========================================
# NextAuth Configuration
# ===========================================
NEXTAUTH_URL=http://localhost:3000

# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
NEXTAUTH_SECRET=your-generated-secret-here

# ===========================================
# Notes
# ===========================================
# - Never commit this file to version control
# - Use strong, unique NEXTAUTH_SECRET in production
# - For production, update NEXTAUTH_URL to your domain
```

---

## ✅ Verification

After setup, you should be able to:
1. ✅ Sign up with new account
2. ✅ See success message
3. ✅ Redirect to sign in page
4. ✅ Sign in with your credentials
5. ✅ Access the dashboard

---

## 🚀 Next Steps

Once signup works:
1. Test password generator
2. Add items to vault
3. Test search functionality
4. Try dark mode toggle

---

## 📞 Need More Help?

- **Quick Setup**: See `QUICKSTART.md`
- **Detailed Setup**: See `SETUP.md`
- **Full Docs**: See `README.md`

---

**Most Common Fix**: Just create the `.env` file with MongoDB URI and restart the server! 🎉
