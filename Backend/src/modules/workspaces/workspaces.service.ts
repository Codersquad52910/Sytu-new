import { Workspace, IWorkspace } from '../../models/Workspace';
import { Types } from 'mongoose';
import { AppError } from '../../middleware/errorHandler';

export async function createWorkspace(userId: Types.ObjectId, workspaceData: Partial<IWorkspace>): Promise<IWorkspace> {
  const newWorkspace = await Workspace.create({
    ...workspaceData,
    userId,
  });
  return newWorkspace;
}

export async function getWorkspaceById(workspaceId: Types.ObjectId): Promise<IWorkspace> {
  const workspace = await Workspace.findById(workspaceId).populate('projects');
  if (!workspace) {
    throw new AppError('Workspace not found.', 404, 'WORKSPACE_NOT_FOUND');
  }
  return workspace;
}

export async function listWorkspacesByUserId(userId: Types.ObjectId): Promise<IWorkspace[]> {
  return Workspace.find({ userId }).populate('projects');
}

export async function updateWorkspace(
  workspaceId: Types.ObjectId,
  userId: Types.ObjectId,
  updateData: Partial<IWorkspace>
): Promise<IWorkspace> {
  const workspace = await getWorkspaceById(workspaceId);

  if (workspace.userId.toString() !== userId.toString()) {
    throw new AppError('You do not own this workspace.', 403, 'FORBIDDEN');
  }

  // Update fields
  if (updateData.title !== undefined) workspace.title = updateData.title;
  if (updateData.description !== undefined) workspace.description = updateData.description;
  if (updateData.category !== undefined) workspace.category = updateData.category;
  if (updateData.imageUrl !== undefined) workspace.imageUrl = updateData.imageUrl;
  if (updateData.projects !== undefined) workspace.projects = updateData.projects;

  await workspace.save();
  return workspace;
}

export async function deleteWorkspace(workspaceId: Types.ObjectId, userId: Types.ObjectId): Promise<void> {
  const workspace = await getWorkspaceById(workspaceId);

  if (workspace.userId.toString() !== userId.toString()) {
    throw new AppError('You do not own this workspace.', 403, 'FORBIDDEN');
  }

  await Workspace.deleteOne({ _id: workspaceId });
}
