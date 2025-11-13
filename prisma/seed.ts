import { PrismaClient, PartnerType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create test partners
  const partners = [
    {
      name: "Fatma Ben Ali",
      type: PartnerType.EXPERIENCE,
      description: "Master potter with 20 years of experience in traditional Nabeul pottery techniques.",
      location: "Nabeul",
      phone: "+216 12 345 678",
      email: "fatma@example.com",
      verified: 3,
      ratings: 4.9,
    },
    {
      name: "Mohamed Slim",
      type: PartnerType.EXPERIENCE,
      description: "Master weaver specializing in traditional Kairouan carpets and textiles.",
      location: "Kairouan",
      phone: "+216 12 345 679",
      email: "mohamed@example.com",
      verified: 3,
      ratings: 4.8,
    },
    {
      name: "Dar Khaled",
      type: PartnerType.MAISON_DHOTE,
      description: "Family-run traditional guesthouse in the heart of Tozeur medina, offering authentic desert hospitality.",
      location: "Tozeur",
      phone: "+216 12 345 680",
      email: "darkhaled@example.com",
      verified: 2,
      ratings: 4.7,
    },
    {
      name: "Maison Ben Youssef",
      type: PartnerType.MAISON_DHOTE,
      description: "Beautifully restored traditional house in Kairouan, offering an authentic cultural experience.",
      location: "Kairouan",
      phone: "+216 12 345 681",
      email: "benyoussef@example.com",
      verified: 2,
      ratings: 4.8,
    },
    {
      name: "Ahmed Ben Amor",
      type: PartnerType.GUIDE,
      description: "Certified tour guide specializing in heritage sites, desert tours, and cultural experiences.",
      location: "Sfax",
      phone: "+216 12 345 682",
      email: "ahmed@example.com",
      verified: 3,
      ratings: 4.9,
    },
  ];

  const createdPartners = [];
  for (const partnerData of partners) {
    const partner = await prisma.partner.upsert({
      where: { email: partnerData.email },
      update: {},
      create: partnerData,
    });
    createdPartners.push(partner);
    console.log(`✅ Created partner: ${partner.name}`);
  }

  // Create listings
  const listings = [
    // Experiences
    {
      partnerId: createdPartners[0].id,
      type: PartnerType.EXPERIENCE,
      title: "Pottery Workshop with Fatma",
      description: "Learn traditional pottery techniques from a master artisan. Create your own terracotta piece using ancient methods passed down through generations.",
      location: "Nabeul",
      amenities: ["Workshop Materials", "Take Home Piece", "Traditional Tea"],
      price: 8000, // 80 TND
      photos: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"],
      rating: 4.9,
    },
    {
      partnerId: createdPartners[0].id,
      type: PartnerType.EXPERIENCE,
      title: "Advanced Pottery Techniques",
      description: "Deep dive into advanced pottery techniques including glazing, firing, and decorative patterns.",
      location: "Nabeul",
      amenities: ["All Materials", "Firing Service", "Certificate"],
      price: 12000, // 120 TND
      photos: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"],
      rating: 4.8,
    },
    {
      partnerId: createdPartners[1].id,
      type: PartnerType.EXPERIENCE,
      title: "Weaving Masterclass",
      description: "Experience the art of traditional weaving on a traditional loom. Learn patterns and techniques used for centuries.",
      location: "Kairouan",
      amenities: ["Loom Access", "Materials", "Traditional Patterns Guide"],
      price: 10000, // 100 TND
      photos: ["https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800"],
      rating: 4.8,
    },
    {
      partnerId: createdPartners[1].id,
      type: PartnerType.EXPERIENCE,
      title: "Textile Dyeing Workshop",
      description: "Learn natural dyeing techniques using traditional Tunisian methods and local plants.",
      location: "Kairouan",
      amenities: ["Natural Dyes", "Fabric", "Take Home Samples"],
      price: 9000, // 90 TND
      photos: ["https://images.unsplash.com/photo-1586105251261-72a756497a11?w=800"],
      rating: 4.7,
    },
    // Maisons d'Hôte
    {
      partnerId: createdPartners[2].id,
      type: PartnerType.MAISON_DHOTE,
      title: "Dar Khaled - Traditional Guesthouse",
      description: "Stay in a beautifully restored traditional house in Tozeur. Experience authentic desert hospitality with traditional meals and courtyard views.",
      location: "Tozeur",
      amenities: ["Traditional Meals", "Hammam", "Courtyard", "WiFi", "Parking"],
      price: 6500, // 65 TND per night
      photos: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"],
      rating: 4.7,
    },
    {
      partnerId: createdPartners[3].id,
      type: PartnerType.MAISON_DHOTE,
      title: "Maison Ben Youssef",
      description: "Authentic guesthouse in Kairouan's medina. Family-run for 30 years, offering traditional hospitality and cultural immersion.",
      location: "Kairouan",
      amenities: ["Breakfast", "Rooftop Terrace", "Hammam", "WiFi"],
      price: 5500, // 55 TND per night
      photos: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"],
      rating: 4.8,
    },
    {
      partnerId: createdPartners[3].id,
      type: PartnerType.MAISON_DHOTE,
      title: "Dar El Medina - Nabeul",
      description: "Coastal guesthouse in Nabeul, combining traditional architecture with modern comfort. Close to artisan markets.",
      location: "Nabeul",
      amenities: ["Sea View", "Traditional Meals", "Courtyard", "WiFi", "Parking"],
      price: 7000, // 70 TND per night
      photos: ["https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800"],
      rating: 4.7,
    },
    // Hotels
    {
      partnerId: createdPartners[2].id,
      type: PartnerType.HOTEL,
      title: "Heritage Boutique Hotel",
      description: "Boutique hotel in Sfax combining heritage architecture with modern amenities. Perfect for cultural tourism.",
      location: "Sfax",
      amenities: ["AC", "WiFi", "Parking", "Restaurant", "Spa"],
      price: 12000, // 120 TND per night
      photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"],
      rating: 4.6,
    },
    {
      partnerId: createdPartners[2].id,
      type: PartnerType.HOTEL,
      title: "Oasis Heritage Resort",
      description: "Desert resort in Tozeur offering luxury accommodations with traditional design elements.",
      location: "Tozeur",
      amenities: ["Pool", "AC", "WiFi", "Parking", "Restaurant", "Desert Tours"],
      price: 15000, // 150 TND per night
      photos: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"],
      rating: 4.5,
    },
    // Camping
    {
      partnerId: createdPartners[2].id,
      type: PartnerType.CAMPING,
      title: "Desert Stars Camp",
      description: "Authentic glamping experience in the Douz desert. Sleep under the stars with traditional Bedouin hospitality.",
      location: "Douz",
      amenities: ["Meals Included", "Campfire", "Parking", "Showers", "Traditional Tents"],
      price: 4500, // 45 TND per night
      photos: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800"],
      rating: 4.9,
    },
    {
      partnerId: createdPartners[2].id,
      type: PartnerType.CAMPING,
      title: "Traditional Bedouin Camp",
      description: "Experience traditional Bedouin camping in Tozeur. Authentic tents, traditional meals, and desert activities.",
      location: "Tozeur",
      amenities: ["Traditional Meals", "Camel Rides", "Parking", "Basic Facilities"],
      price: 3500, // 35 TND per night
      photos: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800"],
      rating: 4.7,
    },
    // Guides
    {
      partnerId: createdPartners[4].id,
      type: PartnerType.GUIDE,
      title: "Heritage Tour with Ahmed",
      description: "Certified English-speaking guide specializing in heritage sites, architecture, and cultural experiences. 15 years of experience.",
      location: "Sfax",
      amenities: ["English", "French", "Arabic", "Heritage Specialization"],
      price: 8000, // 80 TND per day
      photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"],
      rating: 4.9,
    },
    {
      partnerId: createdPartners[4].id,
      type: PartnerType.GUIDE,
      title: "Desert Adventure Guide",
      description: "Expert guide for desert tours, archaeology, and adventure experiences. Multi-lingual with deep local knowledge.",
      location: "Tozeur",
      amenities: ["English", "French", "German", "Desert Specialization"],
      price: 8500, // 85 TND per day
      photos: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"],
      rating: 4.8,
    },
  ];

  for (const listingData of listings) {
    // Check if listing already exists
    const existing = await prisma.listing.findFirst({
      where: {
        partnerId: listingData.partnerId,
        title: listingData.title,
      },
    });

    if (!existing) {
      const listing = await prisma.listing.create({
        data: listingData,
      });
      console.log(`✅ Created listing: ${listing.title}`);
    } else {
      console.log(`⏭️  Listing already exists: ${listingData.title}`);
    }
  }

  console.log("✅ Seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

