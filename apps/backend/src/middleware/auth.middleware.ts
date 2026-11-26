
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AccessTokenPayload {
  sub: string;
  email: string;
}

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authorization = req.headers.authorization;

  // Check Authorization header
  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const bearerToken = authorization?.startsWith("Bearer ") ? authorization.slice(7) : undefined;

  const cookieToken = req.cookies?.accessToken;

  const token = bearerToken || cookieToken;

  if (!token) {
  res.status(401).json({
    success: false,
    message: "Authentication required",
    });
     return;
  }
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    console.error("JWT_SECRET is not configured");

    res.status(500).json({
      success: false,
      message: "Authentication service unavailable",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret, {
      algorithms: ["HS256"],
      issuer: "devcollab-api",
      audience: "devcollab-app",
    });

    if (
      typeof decoded === "string" ||
      typeof decoded.sub !== "string" ||
      typeof decoded.email !== "string"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
      return;
    }

    const payload: AccessTokenPayload = {
      sub: decoded.sub,
      email: decoded.email,
    };

    // Pass authenticated identity to the next handler
    res.locals.userId = payload.sub;
    res.locals.userEmail = payload.email;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired access token",
    });
  }
}

