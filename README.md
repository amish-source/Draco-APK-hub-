# AppHub — Legal Android App Catalog (Next.js + Prisma + Tailwind)

A clean, free-to-host APKPure-style (legal) directory that **only links to official sources** (Play Store or developer website). **No APK/mod/crack hosting.**

## 1) Local Setup
```bash
npm install
# Add your DB connection in .env (copy from .env.example)
npx prisma db push
npm run db:seed
npm run dev
```

Visit http://localhost:3000

## 2) Free Hosting (Vercel) + Free DB (Neon)
1. Create DB at https://neon.tech → copy connection string (use `?sslmode=require`).
2. On Vercel: New Project → Import your GitHub repo.
3. Add Environment Variables on Vercel:
   - `DATABASE_URL` = your Neon URL
   - `NEXT_PUBLIC_SITE_NAME` = your site name
   - `ADMIN_TOKEN` = strong random
4. In "Build & Output Settings", leave defaults. Deploy!

## 3) Add Apps (Basic Admin API)
Send a POST request:
```
POST /api/apps
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "slug": "telegram",
  "title": "Telegram",
  "shortDesc": "Fast messaging app",
  "longDesc": "…",
  "version": "10.5.0",
  "sizeMB": "80",
  "minAndroid": "8.0",
  "playLink": "https://play.google.com/store/apps/details?id=org.telegram.messenger",
  "screenshots": ["https://.../img1.png"],
  "tags": ["messaging"],
  "category": {"slug":"communication","name":"Communication"},
  "publisher": {"name":"Telegram FZ-LLC","site":"https://telegram.org"}
}
```

## 4) Free Domain (Optional)
- Use the free `yourname.vercel.app` subdomain, or
- Get a free domain from Freenom (.tk/.ml/.ga/.cf/.gq) and point it to Vercel (add domain → follow DNS instructions).

## 5) Notes
- This repo is for **educational & legal** use. Keep listings clean; **do not** host third‑party APKs.
- Add content pages like Privacy, Terms, and a DMCA/contact page.
- For images, you can use Cloudinary free tier and paste image URLs into `screenshots`.
