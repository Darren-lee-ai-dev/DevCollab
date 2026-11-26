
import bcrypt from "bcryptjs";

import { prisma } from "../../lib/prisma";
import type { RegisterInput } from "./auth.validation";
import jwt from "jsonwebtoken";
import type { LoginInput } from "./auth.validation";

export async function registerUser(input: RegisterInput) {
  // Check whether the email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(input.password, 12);

  // Create the user
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  return user;
}

export async function loginUser(input: LoginInput) {
  // 1. Find the user by email
  const user = await prisma.user.findUnique({
    where: {
      email: input.email,
    },
  });

  // Use the same error for unknown email and wrong password
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // 2. Compare the submitted password with its stored hash
  const passwordMatches = await bcrypt.compare(
    input.password,
    user.passwordHash
  );

  if (!passwordMatches) {
    throw new Error("INVALID_CREDENTIALS");
  }

  // 3. Read the JWT secret
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET_NOT_CONFIGURED");
  }

  // 4. Generate an access token
  const accessToken = jwt.sign(
    {
      email: user.email,
    },
    jwtSecret,
    {
      subject: user.id,
      expiresIn: "15m",
      issuer: "devcollab-api",
      audience: "devcollab-app",
    }
  );

  // 5. Return safe user information and token
  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  };
}

