import { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../src/lib/db";
import { deepSearchWithFilters } from "../../src/lib/deepSearch";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { q, region, type, limit = "20", minPrice, maxPrice } = req.query;

    // Build Prisma where clause for basic filters
    const where: any = {};

    // Filter by type
    if (type) {
      const types = Array.isArray(type) ? type : [type];
      where.type = { in: types };
    }

    // Filter by price range (if no search query, use Prisma filter)
    if ((minPrice || maxPrice) && !q) {
      where.price = {};
      if (minPrice) where.price.gte = parseInt(minPrice as string) * 100;
      if (maxPrice) where.price.lte = parseInt(maxPrice as string) * 100;
    }

    // Get all listings from database
    let listings = await prisma.listing.findMany({
      where: Object.keys(where).length > 0 ? where : undefined,
      include: {
        partner: {
          select: {
            id: true,
            name: true,
            location: true,
            ratings: true,
            verified: true,
          },
        },
      },
      // Get more results if we're doing DeepSearch (it will filter)
      take: q ? 100 : parseInt(limit as string),
      orderBy: {
        rating: "desc",
      },
    });

    // Apply DeepSearch if query exists (supports Arabic, French, English)
    if (q) {
      // Transform Prisma results to SearchableItem format
      const searchableItems = listings.map(listing => ({
        id: listing.id,
        title: listing.title,
        titleAr: (listing as any).titleAr, // Add Arabic title if exists in DB
        description: listing.description,
        descriptionAr: (listing as any).descriptionAr,
        location: listing.location,
        locationAr: (listing as any).locationAr,
        tags: listing.amenities,
        tagsAr: (listing as any).tagsAr,
        type: listing.type,
        price: listing.price,
        ...listing, // Include all other fields
      }));

      // Apply DeepSearch with filters
      const searchResults = deepSearchWithFilters(
        searchableItems,
        q as string,
        {
          region: region as string | undefined,
          type: type as string | undefined,
          minPrice: minPrice ? parseInt(minPrice as string) * 100 : undefined,
          maxPrice: maxPrice ? parseInt(maxPrice as string) * 100 : undefined,
        },
        {
          threshold: 0.2, // Lower threshold for multi-language
          limit: parseInt(limit as string),
          weights: {
            title: 3,
            titleAr: 3,
            description: 2,
            descriptionAr: 2,
            location: 1.5,
            locationAr: 1.5,
            tags: 1,
            tagsAr: 1,
          },
        }
      );

      listings = searchResults as any;
    } else if (region) {
      // If no search query but region filter, use DeepSearch for Arabic support
      const searchableItems = listings.map(listing => ({
        id: listing.id,
        title: listing.title,
        titleAr: (listing as any).titleAr,
        description: listing.description,
        descriptionAr: (listing as any).descriptionAr,
        location: listing.location,
        locationAr: (listing as any).locationAr,
        tags: listing.amenities,
        type: listing.type,
        price: listing.price,
        ...listing,
      }));

      const filtered = deepSearchWithFilters(
        searchableItems,
        "",
        {
          region: region as string,
        },
        {
          threshold: 0.3,
          limit: parseInt(limit as string),
        }
      );

      listings = filtered as any;
    } else {
      // No search, just limit results
      listings = listings.slice(0, parseInt(limit as string));
    }

    return res.status(200).json(listings);
  } catch (error) {
    console.error("Error fetching listings:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

