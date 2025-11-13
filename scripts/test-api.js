// Quick API test script
// Run: node scripts/test-api.js

const API_BASE = process.env.API_BASE || 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing API endpoints...\n');

  try {
    // Test 1: Get all listings
    console.log('1️⃣ Testing GET /api/listings...');
    const listingsRes = await fetch(`${API_BASE}/api/listings?limit=5`);
    const listings = await listingsRes.json();
    console.log(`   ✅ Found ${listings.length} listings`);
    if (listings.length > 0) {
      console.log(`   📋 Sample: ${listings[0].title}`);
    }
    console.log('');

    // Test 2: Search listings
    console.log('2️⃣ Testing search (q=pottery)...');
    const searchRes = await fetch(`${API_BASE}/api/listings?q=pottery`);
    const searchResults = await searchRes.json();
    console.log(`   ✅ Found ${searchResults.length} results`);
    console.log('');

    // Test 3: Get specific listing (if we have one)
    if (listings.length > 0) {
      const listingId = listings[0].id;
      console.log(`3️⃣ Testing GET /api/listings/${listingId}...`);
      const detailRes = await fetch(`${API_BASE}/api/listings/${listingId}`);
      const detail = await detailRes.json();
      console.log(`   ✅ Got listing: ${detail.title}`);
      console.log(`   💰 Price: ${detail.price / 100} ${detail.currency}`);
      console.log('');

      // Test 4: Create booking
      console.log('4️⃣ Testing POST /api/bookings...');
      const bookingData = {
        listingId: listingId,
        startAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
        endAt: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000).toISOString(), // 9 days from now
        guestCount: 2,
        specialRequests: 'Test booking from API test script'
      };

      const bookingRes = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (bookingRes.ok) {
        const booking = await bookingRes.json();
        console.log(`   ✅ Booking created! ID: ${booking.bookingId}`);
        console.log(`   📊 Status: ${booking.status}`);
        console.log(`   💵 Amount: ${booking.amount / 100} ${booking.currency}`);
      } else {
        const error = await bookingRes.json();
        console.log(`   ⚠️  Booking failed: ${error.error}`);
      }
      console.log('');
    }

    // Test 5: User endpoints
    console.log('5️⃣ Testing GET /api/user/me...');
    const userRes = await fetch(`${API_BASE}/api/user/me?userId=test-user-id`);
    if (userRes.ok) {
      const user = await userRes.json();
      console.log(`   ✅ User endpoint works (test mode)`);
    } else {
      console.log(`   ⚠️  User endpoint requires auth (expected)`);
    }
    console.log('');

    console.log('✅ All API tests completed!\n');
    console.log('📝 Next steps:');
    console.log('   1. Set up Supabase database');
    console.log('   2. Add DATABASE_URL to .env.local');
    console.log('   3. Run: npm run db:push && npm run db:seed');
    console.log('   4. Test again with real data');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('\n💡 Make sure:');
    console.log('   - Dev server is running: npm run dev');
    console.log('   - API_BASE is correct (default: http://localhost:3000)');
  }
}

testAPI();

