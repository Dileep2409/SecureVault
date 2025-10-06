# ⚡ Quick Start - 5 Minutes to Running App

Get your Secure Vault running in 5 minutes!

## 📋 Prerequisites Checklist

Before starting, make sure you have:
- [ ] Node.js 18+ installed ([Download](https://nodejs.org/))
- [ ] MongoDB installed OR MongoDB Atlas account ([Setup](https://www.mongodb.com/cloud/atlas))
- [ ] Terminal/Command Prompt open
- [ ] Code editor (VS Code recommended)

## 🚀 5-Minute Setup

### 1️⃣ Install Dependencies (2 min)

```bash
cd "C:\Users\hp\Desktop\Password Generator"
npm install
```

Wait for installation to complete...

### 2️⃣ Setup Environment (1 min)

**Copy the example file:**
```bash
copy .env.example .env
```

**Edit `.env` file** and add:

```env
# Choose ONE option:

# Option A - Local MongoDB (if installed):
MONGODB_URI=mongodb://localhost:27017/secure-vault

# Option B - MongoDB Atlas (free cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secure-vault

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=REPLACE_WITH_GENERATED_SECRET
```

**Generate secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output and paste it as `NEXTAUTH_SECRET` in `.env`

### 3️⃣ Start MongoDB (30 sec)

**If using local MongoDB:**
- Windows: MongoDB should auto-start as a service
- Mac: `brew services start mongodb-community`
- Linux: `sudo systemctl start mongod`

**If using MongoDB Atlas:**
- Make sure your cluster is running
- Whitelist your IP: 0.0.0.0/0 (for testing)

### 4️⃣ Run the App (30 sec)

```bash
npm run dev
```

You should see:
```
✓ Ready in 2.5s
○ Local:   http://localhost:3000
```

### 5️⃣ Test It! (1 min)

1. Open browser: http://localhost:3000
2. Click "Sign up"
3. Create account: test@example.com / TestPass123!
4. Generate a password
5. Add it to your vault
6. Done! 🎉

## ✅ Verification Checklist

- [ ] App loads at http://localhost:3000
- [ ] Can create an account
- [ ] Can sign in
- [ ] Password generator works
- [ ] Can add vault items
- [ ] Can search vault items
- [ ] Dark mode toggle works
- [ ] Copy to clipboard works

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
mongosh
# If this fails, MongoDB is not running
```

**Fix:**
- Local: Start MongoDB service
- Atlas: Check connection string and IP whitelist

### "Module not found"
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### "Port 3000 already in use"
```bash
# Use different port
npm run dev -- -p 3001
```

### "Invalid environment variable"
```bash
# Check .env file exists
dir .env

# Make sure no extra spaces in .env
# Restart dev server after editing .env
```

## 📁 Project Structure

```
secure-vault/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Main app
│   └── ...
├── components/            # React components
├── lib/                   # Utilities
├── models/                # Database models
├── .env                   # Your secrets (DO NOT COMMIT)
├── package.json           # Dependencies
└── README.md             # Full documentation
```

## 🎯 Next Steps

### For Development:
1. Read `README.md` for full documentation
2. Explore the code
3. Customize the UI
4. Add features

### For Production:
1. Read `DEPLOYMENT.md`
2. Set up MongoDB Atlas
3. Deploy to Vercel
4. Configure custom domain

## 📚 Documentation

- **README.md** - Complete documentation
- **SETUP.md** - Detailed setup guide
- **DEPLOYMENT.md** - Production deployment
- **FEATURES.md** - Feature list and roadmap

## 🔒 Security Notes

⚠️ **Important:**
- Never commit `.env` file
- Use strong `NEXTAUTH_SECRET` in production
- Master password cannot be recovered if forgotten
- All vault data is encrypted client-side

## 💡 Tips

- **Development**: Use local MongoDB for faster iteration
- **Testing**: Create multiple test accounts
- **Dark Mode**: Toggle with moon/sun icon in header
- **Search**: Works on title, username, URL, and notes
- **Copy**: Auto-clears clipboard after 30 seconds

## 🆘 Need Help?

1. Check `SETUP.md` for detailed instructions
2. Check `README.md` troubleshooting section
3. Verify all prerequisites are installed
4. Make sure MongoDB is running
5. Check `.env` file is configured correctly

## 🎉 Success!

If you can:
- ✅ Sign up and sign in
- ✅ Generate passwords
- ✅ Add vault items
- ✅ Search and filter

**You're all set!** Start building your secure password vault! 🚀

---

**Total Time**: ~5 minutes
**Difficulty**: Easy
**Status**: Ready to use!
