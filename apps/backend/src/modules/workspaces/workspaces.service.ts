
import { prisma } from "../../lib/prisma";
import type { CreateWorkspaceInput } from "./workspaces.validation";

export async function createWorkspace(
  userId: string,
  input: CreateWorkspaceInput
) {
  return prisma.$transaction(async (tx) => {
    // 1. Create the workspace
    const workspace = await tx.workspace.create({
      data: {
        name: input.name,
        description: input.description,
      },
    });

    // 2. Automatically make the creator the OWNER
    await tx.workspaceMember.create({
      data: {
        userId,
        workspaceId: workspace.id,
        role: "OWNER",
      },
    });

    // 3. Return workspace information
    return tx.workspace.findUniqueOrThrow({
      where: {
        id: workspace.id,
      },
      include: {
        members: {
          select: {
            id: true,
            role: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  });
}

export async function getUserWorkspaces(userId: string) {
  const memberships = await prisma.workspaceMember.findMany({
    where: {
      userId,
    },
    include: {
      workspace: {
        include: {
          _count: {
            select: {
              members: true,
            },
          },
        },
      },
    },
    orderBy: {
      joinedAt: "desc",
    },
  });

  return memberships.map((membership) => ({
    ...membership.workspace,
    role: membership.role,
  }));
}

export async function getWorkspaceById(
  userId: string,
  workspaceId: string
) {
  // Verify that the user belongs to this workspace
  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId,
      },
    },
    include: {
      workspace: {
        include: {
          _count: {
            select: {
              members: true,
            },
          },
        },
      },
    },
  });

  if (!membership) {
    throw new Error("WORKSPACE_NOT_FOUND");
  }

  return {
    ...membership.workspace,
    role: membership.role,
  };
}
