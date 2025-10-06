
#  Secure Vault - Password Manager

A modern, privacy-first password manager with client-side encryption built with Next.js, TypeScript, and MongoDB.

### Features

- User authentication (Sign Up / Login)
- Generate secure passwords instantly
- Save passwords securely in MongoDB
- Search, edit, and delete passwords
- Copy password feature
- Data encrypted for security


## Technologies Used

- Frontend: React.js, Next.js, CSS
- Backend: Node.js, Express.js
- Database: MongoDB (Cloud)
- Authentication: JWT
- Others: bcrypt, crypto-js, Mongoose

---

## How to Run Locally

1. Clone the repository
```bash
git clone https://github.com/Dileep2409/SecureVault.git


## Go to project directory

cd SecureVault


## Install dependencies

npm install


## Install dependencies

npm install

## Install dependencies

npm install

## Open in browser

http://localhost:5000

## Usage

Sign Up or Login

Generate a new password

Save password with a label

Search, Edit, or Delete saved passwords

Copy password when needed

### Prerequisites

- Node.js 18+ installed
- MongoDB instance (local or MongoDB Atlas)

### Installation

1. Clone the repository**
```bash
cd "C:\Users\hp\Desktop\Password Generator"
```

2. Install dependencies**
```bash
npm install
```

3. Set up environment variables**

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/secure-vault
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secure-vault

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production-min-32-chars
```

To generate a secure `NEXTAUTH_SECRET`, run:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

4. Run the development server
```bash
npm run dev
```

5. Open your browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Production Build

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `MONGODB_URI`
   - `NEXTAUTH_URL` (your production URL)
   - `NEXTAUTH_SECRET`
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- Render
- AWS Amplify

##  Security Features

### Client-Side Encryption
- Zero-Knowledge Architecture: Your master password never leaves your device
- AES-256 Encryption: Industry-standard encryption algorithm
- PBKDF2 Key Derivation: 10,000 iterations for key strengthening
- Unique IVs: Each vault item uses a unique initialization vector

### Best Practices
- Passwords hashed with bcrypt (12 rounds)
- Secure session management
- HTTPS required in production
- No secrets in logs or error messages
- Auto-clearing clipboard after 30 seconds

### Important Security Notes

 Master Password Recovery: If you forget your master password, your vault data cannot be recovered**. This is by design - true zero-knowledge encryption means even we cannot access your data.

 Session Storage: The app temporarily stores your password in session storage to derive the encryption key. This is cleared on logout and when the browser is closed.

##  Usage Guide

### First Time Setup

1. Sign Up: Create an account with your email and a strong master password
2. Remember Your Password: Write down your master password - it cannot be recovered!
3. Sign In: Log in with your credentials

### Generating Passwords

1. Navigate to the Password Generator section
2. Adjust settings (length, character types)
3. Click the refresh button to generate
4. Click copy to copy to clipboard (auto-clears in 30s)

### Managing Vault Items

1. Add Item: Click "Add Item" button
2. Fill Details: Enter title (required), username, password, URL, notes
3. Save: Click "Save" to encrypt and store
4. Edit: Click edit icon on any item
5. Delete: Click trash icon (with confirmation)
6. Search: Use the search bar to filter items

### Security Tips

- Use a unique, strong master password
- Enable dark mode for privacy in public spaces
- Always sign out on shared devices
- Regularly update your vault passwords
- Use the password generator for all new accounts

##  Project Structure

```
secure-vault/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   └── signup/route.ts
│   │   └── vault/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── auth/
│   │   ├── signin/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── globals.css
├── components/
│   ├── PasswordGenerator.tsx
│   ├── VaultItem.tsx
│   ├── VaultList.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── mongodb.ts
│   ├── encryption.ts
│   └── utils.ts
├── models/
│   ├── User.ts
│   └── VaultItem.ts
├── types/
│   └── next-auth.d.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Testing

### Manual Testing Checklist

- [ ] Sign up with new account
- [ ] Sign in with existing account
- [ ] Generate passwords with different options
- [ ] Copy password to clipboard
- [ ] Create vault item
- [ ] Edit vault item
- [ ] Delete vault item
- [ ] Search vault items
- [ ] Toggle dark mode
- [ ] Sign out
- [ ] Verify encryption (check database - should see encrypted data)

##  Contributing

This is a personal project, but suggestions are welcome!

## License

MIT License - feel free to use this project for learning or personal use.

##  Acknowledgments

- Next.js team for the amazing framework
- MongoDB for the database
- CryptoJS for encryption utilities
- Lucide for beautiful icons

##  Support

For issues or questions, please check:
1. This README
2. Environment variables are correctly set
3. MongoDB is running and accessible
4. Node.js version is 18+


Built with and for privacy-conscious users

# SecureVault

