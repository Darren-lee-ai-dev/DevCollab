
import { Router } from "express";

import { authenticate } from "../../middleware/auth.middleware";

import {
  createWorkspaceController,
  getWorkspacesController,
  getWorkspaceController,
} from "./workspaces.controller";

const router = Router();

// All workspace endpoints require authentication
router.use(authenticate);

// Create a workspace
router.post("/", createWorkspaceController);

// List workspaces belonging to the current user
router.get("/", getWorkspacesController);

// Get one workspace
router.get("/:id", getWorkspaceController);

export default router;
