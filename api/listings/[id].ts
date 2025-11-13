import { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../src/lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid listing ID" });
    }

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        partner: {
          select: {
            id: true,
            name: true,
            description: true,
            location: true,
            phone: true,
            email: true,
            ratings: true,
            verified: true,
          },
        },
        availability: {
          where: {
            date: { gte: new Date() },
          },
          orderBy: {
            date: "asc",
          },
          take: 30, // Next 30 days
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 10,
        },
      },
    });

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    return res.status(200).json(listing);
  } catch (error) {
    console.error("Error fetching listing:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

