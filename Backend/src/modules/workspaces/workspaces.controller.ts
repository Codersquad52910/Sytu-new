import { Request, Response, NextFunction } from 'express';
import * as workspacesService from './workspaces.service';
import { Types } from 'mongoose';

export async function createWorkspace(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!._id as Types.ObjectId;
    const workspace = await workspacesService.createWorkspace(userId, req.body);
    res.status(201).json({ success: true, message: 'Workspace created successfully.', data: workspace });
  } catch (err) {
    next(err);
  }
}

export async function getWorkspace(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const workspaceId = new Types.ObjectId(req.params.id as string);
    const workspace = await workspacesService.getWorkspaceById(workspaceId);
    res.json({ success: true, data: workspace });
  } catch (err) {
    next(err);
  }
}

export async function listWorkspaces(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!._id as Types.ObjectId;
    const workspaces = await workspacesService.listWorkspacesByUserId(userId);
    res.json({ success: true, data: workspaces });
  } catch (err) {
    next(err);
  }
}

export async function updateWorkspace(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const workspaceId = new Types.ObjectId(req.params.id as string);
    const userId = req.user!._id as Types.ObjectId;
    const updated = await workspacesService.updateWorkspace(workspaceId, userId, req.body);
    res.json({ success: true, message: 'Workspace updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteWorkspace(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const workspaceId = new Types.ObjectId(req.params.id as string);
    const userId = req.user!._id as Types.ObjectId;
    await workspacesService.deleteWorkspace(workspaceId, userId);
    res.json({ success: true, message: 'Workspace deleted successfully.' });
  } catch (err) {
    next(err);
  }
}
