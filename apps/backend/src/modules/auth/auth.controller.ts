
import type { Request, Response } from "express";

import { registerUser } from "./auth.service";
import { registerSchema } from "./auth.validation";
import { loginUser } from "./auth.service";
import { loginSchema } from "./auth.validation";
export async function registerController(
  req: Request,
  res: Response
) {
  // Validate incoming request
  const validation = registerSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  try {
    const user = await registerUser(validation.data);

    return res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists",
      });
    }

    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create account",
    });
  }
}



export async function loginController(
  req: Request,
  res: Response
): Promise<void> {
  const validation = loginSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: validation.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
    return;
  }

  try {
    const result = await loginUser(validation.data);

    // Store JWT in an HTTP-only cookie
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: result.user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "INVALID_CREDENTIALS"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to log in",
    });
  }
}
export function logoutController(
  _req: Request,
  res: Response
): void {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
}
