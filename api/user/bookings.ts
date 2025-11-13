import { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../src/lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // TODO: Add authentication check
    // const session = await getServerSession(req, res, authOptions);
    // if (!session || !session.user) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }

    // For now, use a test user ID - replace with actual auth
    const userId = req.headers["x-user-id"] as string || req.query.userId as string;

    if (!userId) {
      return res.status(401).json({ error: "User ID required" });
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            photos: true,
            location: true,
            type: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

