# 🚀 Create Your .env File

## ✅ Quick Setup (Choose One Method)

### Method 1: Automatic (Recommended) ⚡

**Just double-click**: `SETUP_ENV.bat`

This will automatically:
- Generate NEXTAUTH_SECRET
- Create .env file with your MongoDB credentials
- Configure everything correctly

---

### Method 2: Manual (If automatic doesn't work) 📝

**Step 1: Generate NEXTAUTH_SECRET**

Open Command Prompt and run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the output (it will look like: `xK8vN2pQ7mR4sT6uW9yZ1aB3cD5eF7gH9iJ0kL2mN4o=`)

**Step 2: Create .env file**

1. Create a new file in the project root folder
2. Name it exactly: `.env` (with the dot, no extension)
3. Paste this content:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://dileepsengar5141:dileepsengar5141@cluster0.vuko71c.mongodb.net/secure-vault?retryWrites=true&w=majority&appName=Cluster0

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000

# Replace the line below with your generated secret from Step 1
NEXTAUTH_SECRET=PASTE_YOUR_GENERATED_SECRET_HERE
```

4. Replace `PASTE_YOUR_GENERATED_SECRET_HERE` with the secret you generated in Step 1
5. Save the file

---

## 🔄 After Creating .env File

**Step 1: Restart the server**

Stop the current server (press `Ctrl+C`) and start again:
```bash
npm run dev
```

Or double-click: `START.bat`

**Step 2: Test Signup**

1. Go to http://localhost:3000
2. Click "Sign up"
3. Enter your email and password
4. Click "Create Account"

✅ **It should work now!**

---

## 📋 Your Configuration Summary

Your MongoDB Atlas connection is configured with:
- **Database**: secure-vault
- **Cluster**: cluster0.vuko71c.mongodb.net
- **User**: dileepsengar5141
- **Connection**: Successful ✅

---

## 🐛 Troubleshooting

### "Database not configured" error
- Make sure .env file exists in project root
- Check file is named exactly `.env` (not .env.txt)
- Restart the dev server

### "Database connection failed" error
- Check your MongoDB Atlas cluster is running
- Verify IP whitelist includes 0.0.0.0/0 (allow all)
- Check password is correct in connection string

### Can't create .env file
- Make sure you're in the project root folder
- Use a text editor (Notepad, VS Code, etc.)
- Save as "All Files" type, not "Text Document"

---

## ✅ Verification

After setup, you should see:
1. ✅ No "Database not configured" error
2. ✅ Can create account successfully
3. ✅ Redirected to sign in page
4. ✅ Can sign in to dashboard

---

## 🎉 Success!

Once your .env file is created and server restarted:
- Signup will work
- You can create accounts
- You can start using the password manager

**Enjoy your secure vault!** 🔒
