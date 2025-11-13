import { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../src/lib/db";
import { z } from "zod";

const createBookingSchema = z.object({
  listingId: z.string(),
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  guestCount: z.number().int().min(1),
  specialRequests: z.string().optional(),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // TODO: Add authentication check
    // const session = await getServerSession(req, res, authOptions);
    // if (!session || !session.user) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    // For now, use a test user ID - replace with actual auth
    const userId = req.headers["x-user-id"] as string || "test-user-id";

    const body = createBookingSchema.parse(req.body);

    // Validate dates
    const startAt = new Date(body.startAt);
    const endAt = new Date(body.endAt);

    if (startAt >= endAt) {
      return res.status(400).json({ error: "End date must be after start date" });
    }

    if (startAt < new Date()) {
      return res.status(400).json({ error: "Start date must be in the future" });
    }

    // Get listing to calculate price
    const listing = await prisma.listing.findUnique({
      where: { id: body.listingId },
    });

    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    // Calculate total amount (simple: price * number of nights * guest count)
    const nights = Math.ceil((endAt.getTime() - startAt.getTime()) / (1000 * 60 * 60 * 24));
    const amount = listing.price * nights * body.guestCount;

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        userId,
        listingId: body.listingId,
        startAt,
        endAt,
        guestCount: body.guestCount,
        amount,
        currency: listing.currency,
        specialRequests: body.specialRequests,
        status: "PENDING",
      },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            photos: true,
          },
        },
      },
    });

    return res.status(201).json({
      bookingId: booking.id,
      status: booking.status,
      amount: booking.amount,
      currency: booking.currency,
      confirmationUrl: `/dashboard/bookings/${booking.id}`,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: "Invalid request data", details: error.errors });
    }
    console.error("Error creating booking:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

