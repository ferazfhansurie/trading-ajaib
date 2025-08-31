# Trading Genie Landing Page - Vercel Deployment

## 🚀 Deploy to Vercel

### Prerequisites
- Node.js 16+ installed
- Vercel CLI installed (`npm i -g vercel`)
- Git repository set up

### Quick Deploy

1. **Install Dependencies**
   ```bash
   cd landing-page
   npm install
   ```

2. **Test Locally**
   ```bash
   npm run dev
   ```

3. **Deploy to Vercel**
   ```bash
   vercel
   ```

### Manual Deployment Steps

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

### Environment Variables (Optional)

If you need to configure the bot URL or other settings:

1. **In Vercel Dashboard:**
   - Go to Project Settings
   - Environment Variables
   - Add any needed variables

2. **Or in vercel.json:**
   ```json
   {
     "env": {
       "BOT_URL": "https://web.telegram.org/k/#@trading_ajaib_bot"
     }
   }
   ```

### Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to Project Settings
   - Domains
   - Add your custom domain
   - Configure DNS settings

### Build Configuration

The project uses Vite for building:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### Performance Optimizations

- ✅ Automatic code splitting
- ✅ Image optimization
- ✅ CSS minification
- ✅ Gzip compression
- ✅ CDN distribution

### Monitoring

- **Analytics:** Built-in Vercel Analytics
- **Performance:** Core Web Vitals monitoring
- **Uptime:** Automatic uptime monitoring

## 🔧 Development

### Local Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
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
└── DEPLOYMENT.md      # This file
```

## 🎯 Features

- ✅ Modern React 18 setup
- ✅ Vite for fast development
- ✅ Optimized for Vercel
- ✅ Responsive design
- ✅ SEO optimized
- ✅ Performance optimized
- ✅ Security headers
