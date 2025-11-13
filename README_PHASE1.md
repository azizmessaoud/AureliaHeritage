# AureliaHeritage Phase 1 Implementation Guide

## 🎯 Phase 1 Goals (Week 1)

- ✅ Database setup with Prisma + PostgreSQL
- ✅ API routes for listings, bookings, and user data
- ✅ Replace hardcoded content with API calls
- ✅ Booking flow (form only, no payment)
- ✅ Deploy to Vercel

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Prisma Client
- Supabase JS (for future auth)
- All existing dependencies

### 2. Set Up Database

#### Option A: Supabase (Recommended - Free Tier)

1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Go to Settings → Database
4. Copy the "Connection string" (URI format)
5. Create `.env.local` file:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
```

#### Option B: Local PostgreSQL

1. Install PostgreSQL locally
2. Create database: `createdb aurelia`
3. Add to `.env.local`:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/aurelia"
```

### 3. Initialize Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Seed database with test data
npm run db:seed
```

### 4. Verify Database

```bash
# Open Prisma Studio to view data
npm run db:studio
```

You should see:
- 5 Partners
- 12+ Listings (Experiences, Maisons d'Hôte, Hotels, Camping, Guides)

## 🚀 API Routes

All API routes are in the `/api` folder and work as Vercel serverless functions.

### Available Endpoints

#### GET `/api/listings`
Query parameters:
- `q` - Search query (text search in title/description)
- `region` - Filter by location
- `type` - Filter by type (EXPERIENCE, MAISON_DHOTE, HOTEL, CAMPING, GUIDE)
- `limit` - Number of results (default: 20)
- `minPrice` - Minimum price in TND
- `maxPrice` - Maximum price in TND

Example:
```
GET /api/listings?q=pottery&region=Tozeur&type=EXPERIENCE
```

#### GET `/api/listings/[id]`
Get detailed information about a specific listing.

#### POST `/api/bookings`
Create a new booking (status: PENDING, no payment yet).

Request body:
```json
{
  "listingId": "clx...",
  "startAt": "2024-02-15T10:00:00Z",
  "endAt": "2024-02-17T10:00:00Z",
  "guestCount": 2,
  "specialRequests": "Vegetarian meals please"
}
```

#### GET `/api/user/bookings`
Get all bookings for a user (requires authentication - TODO).

#### GET `/api/user/me`
Get current user info (requires authentication - TODO).

#### GET `/api/partners/[id]`
Get partner profile with all listings and reviews.

## 🔄 Next Steps

### Day 3-4: Authentication
- Set up Supabase Auth or NextAuth
- Add auth middleware to API routes
- Create login/signup pages

### Day 5: Replace Hardcoded Content
- Update `/accommodations` page to fetch from API
- Update `/artisans` page to fetch from API
- Update all card components to use real data

### Day 6: Booking Flow
- Create booking form page
- Add date picker and guest count selector
- Connect to POST `/api/bookings`
- Create dashboard to view bookings

### Day 7: Deploy
- Add environment variables to Vercel
- Deploy and test in production
- Verify all API routes work

## 📝 Notes

- **Authentication**: Currently API routes use a test user ID. Replace with real auth in Day 3-4.
- **Payment**: Booking status is set to "PENDING" - no payment processing yet (Week 2).
- **Images**: Using placeholder URLs from Unsplash. Replace with real images later.

## 🐛 Troubleshooting

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check if database is accessible
- Ensure Prisma Client is generated: `npm run db:generate`

### API Routes Not Working
- Ensure you're running on Vercel or using Vercel CLI: `vercel dev`
- Check server logs for errors
- Verify Prisma Client is imported correctly

### Seed Script Fails
- Make sure database is initialized: `npm run db:push`
- Check if partners already exist (script uses upsert)
- Verify all required fields are provided

## ✅ Success Criteria

By end of Week 1:
- [x] Database schema created and migrated
- [x] 20+ test listings in database
- [x] API routes working (listings, bookings)
- [ ] All pages fetch from API (not hardcoded)
- [ ] Users can create bookings
- [ ] Deployed to Vercel and working

