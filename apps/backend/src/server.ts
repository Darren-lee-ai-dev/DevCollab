
import "dotenv/config";

import express from "express";
import cors from "cors";
import usersRoutes from "./modules/users/users.routes";
import authRoutes from "./modules/auth/auth.routes";
import workspacesRoutes from "./modules/workspaces/workspaces.routes";
import cookieParser from "cookie-parser";

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to DevCollab Backend API",
    status: "running",
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is healthy",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/workspaces", workspacesRoutes);

app.listen(PORT, () => {
  console.log(
    `DevCollab backend running at http://localhost:${PORT}`
  );
});
