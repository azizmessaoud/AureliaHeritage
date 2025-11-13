# 🚀 Phase 1 Setup Guide - Step by Step

## Quick Start (30 minutes)

### Step 1: Install Dependencies (5 min)

```bash
npm install
```

This installs:
- Prisma Client
- Vercel serverless function types
- All other dependencies

### Step 2: Check Setup (2 min)

```bash
npm run check:setup
```

This verifies:
- ✅ All dependencies installed
- ✅ Prisma schema exists
- ✅ API routes created
- ✅ Database client configured

### Step 3: Set Up Supabase Database (10 min)

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Sign up (free tier is fine)
   - Click "New Project"

2. **Create Project**
   - Name: `aurelia-heritage` (or any name)
   - Database Password: **Save this!** (you'll need it)
   - Region: Choose closest to you
   - Click "Create new project"
   - Wait 2-3 minutes for setup

3. **Get Database URL**
   - Go to Settings → Database
   - Scroll to "Connection string"
   - Select "URI" tab
   - Copy the connection string
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres`

4. **Create `.env.local` File**
   ```bash
   # In project root, create .env.local
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres"
   ```
   
   **Replace `[YOUR-PASSWORD]` with your actual Supabase password!**

### Step 4: Initialize Database (5 min)

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with test data
npm run db:seed
```

**Expected output:**
```
✅ Created partner: Fatma Ben Ali
✅ Created partner: Mohamed Slim
✅ Created partner: Dar Khaled
✅ Created partner: Maison Ben Youssef
✅ Created partner: Ahmed Ben Amor
✅ Created listing: Pottery Workshop with Fatma
✅ Created listing: Weaving Masterclass
... (12+ listings)
✅ Seeding completed!
```

### Step 5: Verify Database (3 min)

```bash
npm run db:studio
```

This opens Prisma Studio in your browser. You should see:
- **5 Partners** (artisans, guides, guesthouses)
- **12+ Listings** (experiences, accommodations, guides)
- **0 Bookings** (empty, ready for your first!)

### Step 6: Test API Locally (5 min)

**Terminal 1: Start dev server**
```bash
npm run dev
```

**Terminal 2: Test API**
```bash
# Option A: Use test script
npm run test:api

# Option B: Manual curl tests
curl "http://localhost:3000/api/listings?q=pottery"
curl "http://localhost:3000/api/listings?type=EXPERIENCE&limit=5"
```

**Expected:** JSON response with listings array

### Step 7: Deploy to Vercel (10 min)

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? Yes (if you have one)
# - Deploy? Yes
```

**Add Environment Variable:**
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   - **Name:** `DATABASE_URL`
   - **Value:** Your Supabase DATABASE_URL (same as .env.local)
   - **Environment:** Production, Preview, Development (select all)
3. Click "Save"
4. Redeploy: `vercel --prod`

**Test Production API:**
```bash
curl "https://your-project.vercel.app/api/listings?q=pottery"
```

## ✅ Verification Checklist

Before moving to Day 3 (Authentication), confirm:

- [ ] `npm install` completed successfully
- [ ] `npm run check:setup` shows all ✅
- [ ] `.env.local` created with DATABASE_URL
- [ ] `npm run db:generate` worked
- [ ] `npm run db:push` deployed schema
- [ ] `npm run db:seed` created 5 partners + 12 listings
- [ ] `npm run db:studio` shows data in browser
- [ ] `npm run dev` starts server
- [ ] `npm run test:api` or curl tests return JSON
- [ ] Deployed to Vercel
- [ ] Production API works

## 🐛 Troubleshooting

### "Cannot find module '@prisma/client'"
```bash
npm install
npm run db:generate
```

### "Error: P1001: Can't reach database server"
- Check DATABASE_URL in `.env.local`
- Verify Supabase project is active
- Check if password is correct
- Ensure connection string includes `?sslmode=require` if needed

### "Error: P2002: Unique constraint failed"
- Database already has data
- Run seed again (it will skip existing records)
- Or reset: `npx prisma migrate reset` (⚠️ deletes all data)

### "API routes return 404"
- Make sure you're using Vercel dev: `vercel dev`
- Or deploy to Vercel (API routes only work on Vercel)
- Check `vercel.json` configuration

### "Prisma Studio won't open"
```bash
# Try with explicit port
npx prisma studio --port 5555
```

## 📊 What You Should See

### Prisma Studio
- **Partners table:** 5 rows
- **Listings table:** 12+ rows
- **Bookings table:** 0 rows (empty)

### API Response Example
```json
[
  {
    "id": "clx...",
    "title": "Pottery Workshop with Fatma",
    "description": "Learn traditional pottery...",
    "location": "Nabeul",
    "price": 8000,
    "currency": "TND",
    "rating": 4.9,
    "photos": ["https://..."],
    "partner": {
      "name": "Fatma Ben Ali",
      "location": "Nabeul",
      "ratings": 4.9
    }
  }
]
```

## 🎯 Next Steps

Once all checks pass:

1. **Report back:** "✓ Database ✓ API ✓ Deployed ✓"

2. **Move to Day 3-4:** Authentication setup
   - NextAuth.js integration
   - Login/signup pages
   - Protected routes
   - User dashboard

3. **Then Day 5:** Replace hardcoded content with API calls

4. **Then Day 6:** Booking form UI

5. **Then Day 7:** End-to-end testing and final deployment

## 💡 Pro Tips

- **Keep `.env.local` in `.gitignore`** (already done)
- **Use Prisma Studio** to manually check/edit data
- **Test API with Postman** or Thunder Client (VS Code extension)
- **Check Vercel logs** if production API fails
- **Use `vercel dev`** to test API routes locally before deploying

---

**Ready? Start with Step 1 and work through each step. Report any errors!** 🚀

