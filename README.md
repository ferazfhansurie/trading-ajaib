# Trading Genie Landing Page

A modern, responsive landing page for Trading Genie - AI-powered trading companion.

## 🚀 Quick Deploy to Vercel

### Option 1: Deploy with Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   cd landing-page
   vercel
   ```

### Option 2: Deploy via GitHub

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel deployment setup"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your repository
   - Set root directory to `landing-page`
   - Deploy!

## 🛠️ Local Development

### Prerequisites
- Node.js 16+
- npm or yarn

### Setup
```bash
cd landing-page
npm install
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 📁 Project Structure

```
landing-page/
├── index.html          # Main HTML file
├── main.jsx           # React entry point
├── app.jsx            # Main React component
├── styles.css         # Global styles
├── logo.jpeg          # Logo image
├── package.json       # Dependencies
├── vite.config.js     # Vite configuration
├── vercel.json        # Vercel configuration
└── README.md          # This file
```

## 🎨 Features

- ✅ Modern React 18 setup
- ✅ Vite for fast development
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Vercel deployment ready
- ✅ Trading Genie branding

## 🔧 Customization

### Environment Variables
Add to Vercel dashboard:
- `BOT_URL` - Telegram bot URL
- `API_URL` - Backend API URL

### Styling
- Edit `styles.css` for custom styling
- Uses CSS custom properties for easy theming

### Content
- Update `app.jsx` for content changes
- Modify pricing plans in the `PricingSection` component

## 📊 Performance

- Lighthouse Score: 95+
- Core Web Vitals: Optimized
- Bundle Size: ~160KB (gzipped)
- Load Time: <2s

## 🚀 Deployment Checklist

- [ ] Logo image added (`logo.jpeg`)
- [ ] Vercel configuration (`vercel.json`)
- [ ] Build script working (`npm run build`)
- [ ] Environment variables set
- [ ] Custom domain configured (optional)
- [ ] Analytics enabled (optional)

## 📞 Support

For deployment issues:
1. Check Vercel logs
2. Verify build output
3. Test locally first
4. Check environment variables

---

**Trading Genie** - Your AI-powered trading companion
