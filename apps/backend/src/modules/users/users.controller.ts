
import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function getMeController(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = res.locals.userId as string;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      user,
    });
  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve profile",
    });
  }
}
