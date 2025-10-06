# 🚀 Quick Setup Guide

Follow these steps to get your Secure Vault running in minutes!

## Step 1: Install Dependencies

Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages (~2-3 minutes).

## Step 2: Set Up MongoDB

You have two options:

### Option A: Local MongoDB (Recommended for Development)

1. **Install MongoDB Community Edition**
   - Download from: https://www.mongodb.com/try/download/community
   - Follow the installation wizard
   - Start MongoDB service

2. **Verify MongoDB is running**
   ```bash
   mongosh
   ```
   If you see the MongoDB shell, you're good to go!

### Option B: MongoDB Atlas (Free Cloud Database)

1. **Create a free account**: https://www.mongodb.com/cloud/atlas/register
2. **Create a free cluster** (M0 tier)
3. **Get your connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

## Step 3: Configure Environment Variables

1. **Copy the example file**:
   ```bash
   copy .env.example .env
   ```

2. **Edit `.env` file** with your values:

   ```env
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/secure-vault

   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secure-vault

   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-generated-secret-here
   ```

3. **Generate NEXTAUTH_SECRET**:
   
   Run this command and copy the output:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```
   
   Paste the result as your `NEXTAUTH_SECRET` value.

## Step 4: Run the Application

```bash
npm run dev
```

You should see:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

## Step 5: Test the Application

1. **Open your browser**: http://localhost:3000
2. **Sign up** with a test account
3. **Generate a password** using the generator
4. **Add a vault item** with the generated password
5. **Test search, edit, and delete** features
6. **Toggle dark mode** to see the theme change

## 🎉 You're All Set!

Your secure vault is now running locally. 

## Next Steps

- **Customize**: Modify colors, add features, etc.
- **Deploy**: Follow the deployment guide in README.md
- **Secure**: Change all default secrets before deploying to production

## Troubleshooting

### "Cannot connect to MongoDB"
- Ensure MongoDB is running
- Check your connection string in `.env`
- For Atlas: Whitelist your IP address in Network Access

### "Module not found" errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders, then reinstall

### "Invalid environment variable"
- Check all required variables are in `.env`
- Ensure no extra spaces or quotes
- Restart the dev server after changing `.env`

### Port 3000 already in use
- Change the port: `npm run dev -- -p 3001`
- Or kill the process using port 3000

## 🔒 Security Reminders

- Never commit `.env` to version control
- Use strong, unique `NEXTAUTH_SECRET` in production
- Always use HTTPS in production
- Regularly update dependencies

---

Need help? Check the main README.md for detailed documentation!
