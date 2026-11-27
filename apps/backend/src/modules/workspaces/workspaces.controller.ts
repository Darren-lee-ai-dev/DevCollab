
import type { Request, Response } from "express";

import {
  createWorkspace,
  getUserWorkspaces,
  getWorkspaceById,
} from "./workspaces.service";

import { createWorkspaceSchema } from "./workspaces.validation";

export async function createWorkspaceController(
  req: Request,
  res: Response
): Promise<void> {
  const validation = createWorkspaceSchema.safeParse(req.body);

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
    const userId = res.locals.userId as string;

    const workspace = await createWorkspace(
      userId,
      validation.data
    );

    res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      workspace,
    });
  } catch (error) {
    console.error("Create workspace error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create workspace",
    });
  }
}

export async function getWorkspacesController(
  _req: Request,
  res: Response
): Promise<void> {
  try {
    const userId = res.locals.userId as string;

    const workspaces = await getUserWorkspaces(userId);

    res.status(200).json({
      success: true,
      workspaces,
    });
  } catch (error) {
    console.error("Get workspaces error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve workspaces",
    });
  }
}

export async function getWorkspaceController(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  try {
    const userId = res.locals.userId as string;
    const workspaceId = req.params.id;

    const workspace = await getWorkspaceById(
      userId,
      workspaceId
    );

    res.status(200).json({
      success: true,
      workspace,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "WORKSPACE_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "Workspace not found",
      });
      return;
    }

    console.error("Get workspace error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve workspace",
    });
  }
}
