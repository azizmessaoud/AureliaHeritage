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

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        phone: true,
        image: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

