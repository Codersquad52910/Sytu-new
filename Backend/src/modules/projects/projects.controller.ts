import { Request, Response, NextFunction } from 'express';
import * as projectsService from './projects.service';
import { Types } from 'mongoose';

export async function createProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!._id as Types.ObjectId;
    const project = await projectsService.createProject(userId, req.body);
    res.status(218).json({ success: true, message: 'Project created successfully.', data: project });
  } catch (err) {
    next(err);
  }
}

export async function getProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const projectId = new Types.ObjectId(req.params.id as string);
    const project = await projectsService.getProjectById(projectId);
    res.json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
}

export async function listProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, tech, userId, page, limit } = req.query;
    
    const filters: projectsService.ListProjectsFilter = {};
    if (typeof category === 'string') filters.category = category;
    if (typeof tech === 'string') filters.tech = tech;
    if (typeof userId === 'string') filters.userId = userId;
    if (typeof page === 'string') filters.page = parseInt(page, 10);
    if (typeof limit === 'string') filters.limit = parseInt(limit, 10);

    const result = await projectsService.listProjects(filters);
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const projectId = new Types.ObjectId(req.params.id as string);
    const userId = req.user!._id as Types.ObjectId;
    const updated = await projectsService.updateProject(projectId, userId, req.body);
    res.json({ success: true, message: 'Project updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const projectId = new Types.ObjectId(req.params.id as string);
    const userId = req.user!._id as Types.ObjectId;
    await projectsService.deleteProject(projectId, userId);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    next(err);
  }
}

export async function toggleFeaturedProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const projectId = new Types.ObjectId(req.params.id as string);
    const userId = req.user!._id as Types.ObjectId;
    const updated = await projectsService.toggleFeaturedStatus(projectId, userId);
    res.json({ success: true, message: 'Featured status updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
}

export async function getScreenshotsUploadUrls(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const projectId = new Types.ObjectId(req.params.id as string);
    const userId = req.user!._id as Types.ObjectId;
    const { screenshots } = req.body;
    const urls = await projectsService.getScreenshotsUploadUrls(projectId, userId, screenshots);
    res.json({ success: true, data: urls });
  } catch (err) {
    next(err);
  }
}
