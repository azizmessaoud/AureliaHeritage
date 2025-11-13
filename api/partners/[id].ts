import { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../src/lib/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Invalid partner ID" });
    }

    const partner = await prisma.partner.findUnique({
      where: { id },
      include: {
        listings: {
          include: {
            reviews: {
              take: 5,
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });

    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }

    return res.status(200).json(partner);
  } catch (error) {
    console.error("Error fetching partner:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

