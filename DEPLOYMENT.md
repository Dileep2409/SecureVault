# 🌐 Deployment Guide

Deploy your Secure Vault to production for free!

## Prerequisites

- GitHub account
- MongoDB Atlas account (free tier)
- Vercel account (free tier)

## Option 1: Vercel (Recommended) ⭐

Vercel is the easiest way to deploy Next.js apps and offers a generous free tier.

### Step 1: Prepare MongoDB Atlas

1. **Create MongoDB Atlas cluster** (if not already done)
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free M0 cluster
   - Create a database user
   - Whitelist all IPs (0.0.0.0/0) for production

2. **Get connection string**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database password

### Step 2: Push to GitHub

1. **Initialize git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub repository**
   - Go to https://github.com/new
   - Create a new repository (don't initialize with README)

3. **Push code**:
   ```bash
   git remote add origin https://github.com/yourusername/secure-vault.git
   git branch -M main
   git push -u origin main
   ```

### Step 3: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com/signup
2. **Import project**:
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure environment variables**:
   
   Add these in the Vercel dashboard:
   
   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string |
   | `NEXTAUTH_URL` | Your Vercel deployment URL (e.g., https://your-app.vercel.app) |
   | `NEXTAUTH_SECRET` | Generate a new secure secret |

   To generate `NEXTAUTH_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
   ```

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app is live! 🎉

### Step 4: Update NEXTAUTH_URL

After first deployment:
1. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
2. Update `NEXTAUTH_URL` environment variable with this URL
3. Redeploy (Vercel will auto-redeploy on git push)

## Option 2: Railway

Railway offers $5 free credit per month.

### Steps:

1. **Sign up**: https://railway.app/
2. **New Project** → "Deploy from GitHub repo"
3. **Select your repository**
4. **Add environment variables**:
   - `MONGODB_URI`
   - `NEXTAUTH_URL` (Railway will provide this)
   - `NEXTAUTH_SECRET`
5. **Deploy**

## Option 3: Render

Render offers free tier for web services.

### Steps:

1. **Sign up**: https://render.com/
2. **New** → "Web Service"
3. **Connect repository**
4. **Configure**:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. **Add environment variables**
6. **Create Web Service**

## Option 4: Netlify

### Steps:

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**:
   ```bash
   npm run build
   ```

3. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

4. **Set environment variables** in Netlify dashboard

## Post-Deployment Checklist

- [ ] Test sign up functionality
- [ ] Test sign in functionality
- [ ] Test password generation
- [ ] Test vault CRUD operations
- [ ] Test search functionality
- [ ] Test dark mode toggle
- [ ] Verify encryption (check MongoDB - data should be encrypted)
- [ ] Test on mobile devices
- [ ] Check HTTPS is working
- [ ] Verify no secrets in browser console/network tab

## Security Hardening for Production

### 1. Environment Variables
- ✅ Use strong, unique `NEXTAUTH_SECRET` (min 32 characters)
- ✅ Never commit `.env` files
- ✅ Rotate secrets regularly

### 2. MongoDB Security
- ✅ Use strong database passwords
- ✅ Enable MongoDB authentication
- ✅ Restrict IP whitelist (if possible)
- ✅ Enable MongoDB encryption at rest
- ✅ Regular backups

### 3. Application Security
- ✅ HTTPS only (enforced by Vercel/Railway/Render)
- ✅ Set secure headers in `next.config.js`:

```javascript
// next.config.js
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
```

### 4. Rate Limiting (Optional)
Consider adding rate limiting for API routes to prevent brute force attacks.

### 5. Monitoring
- Set up error tracking (Sentry, LogRocket)
- Monitor MongoDB performance
- Set up uptime monitoring

## Custom Domain (Optional)

### Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` to your custom domain

### Railway/Render:
Similar process in their respective dashboards.

## Continuous Deployment

Once connected to GitHub, deployments are automatic:
- Push to `main` branch → Auto-deploy to production
- Create PR → Preview deployment

## Rollback

If something goes wrong:

**Vercel**: Go to Deployments → Select previous deployment → Promote to Production

**Railway/Render**: Similar rollback options in dashboard

## Performance Optimization

### 1. Enable Caching
Vercel automatically handles this for static assets.

### 2. Database Indexing
Add indexes to MongoDB for faster queries:

```javascript
// In MongoDB shell or Compass
db.vaultitems.createIndex({ userId: 1, updatedAt: -1 })
db.users.createIndex({ email: 1 })
```

### 3. Image Optimization
If you add images later, use Next.js Image component.

## Monitoring & Analytics

### Free Options:
- **Vercel Analytics**: Built-in, enable in dashboard
- **Google Analytics**: Add tracking code
- **Plausible**: Privacy-friendly analytics

## Backup Strategy

### MongoDB Atlas:
- Enable automated backups (available in free tier)
- Download manual backups periodically

### Code:
- GitHub is your backup
- Consider GitLab/Bitbucket mirrors

## Cost Estimates

### Free Tier Limits:

**Vercel**:
- 100 GB bandwidth/month
- Unlimited deployments
- Serverless function execution

**MongoDB Atlas**:
- 512 MB storage
- Shared RAM
- Good for ~1000 users

**Railway**:
- $5 credit/month
- ~500 hours runtime

### When to Upgrade:

- **Vercel**: When you exceed bandwidth or need team features
- **MongoDB**: When you exceed 512 MB or need better performance
- **Railway**: When credit runs out (~$5/month after)

## Troubleshooting Deployment

### Build Fails
- Check all dependencies are in `package.json`
- Ensure TypeScript has no errors: `npm run build` locally
- Check build logs for specific errors

### Runtime Errors
- Verify all environment variables are set
- Check MongoDB connection string is correct
- Review server logs in deployment platform

### Authentication Issues
- Ensure `NEXTAUTH_URL` matches your deployment URL exactly
- Check `NEXTAUTH_SECRET` is set
- Verify callback URLs

### Database Connection Fails
- Check MongoDB Atlas IP whitelist (use 0.0.0.0/0 for all IPs)
- Verify connection string format
- Test connection string locally first

## Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **NextAuth Docs**: https://next-auth.js.org/

---

🎉 **Congratulations!** Your Secure Vault is now live and accessible worldwide!

Remember to:
- Monitor your usage to stay within free tiers
- Keep dependencies updated
- Regularly backup your database
- Test thoroughly after each deployment
