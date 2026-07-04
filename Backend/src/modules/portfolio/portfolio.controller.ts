import { Request, Response, NextFunction } from 'express';
import * as portfolioService from './portfolio.service';
import { Types } from 'mongoose';

export async function getOwnPortfolio(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!._id as Types.ObjectId;
    const portfolio = await portfolioService.getPortfolioByUserId(userId);
    res.json({ success: true, data: portfolio });
  } catch (err) {
    next(err);
  }
}

export async function getPublicPortfolio(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { username } = req.params;
    const portfolio = await portfolioService.getPublicPortfolioByUsername(username as string);
    res.json({ success: true, data: portfolio });
  } catch (err) {
    next(err);
  }
}

export async function updateOwnPortfolio(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!._id as Types.ObjectId;
    const updated = await portfolioService.updatePortfolio(userId, req.body);
    res.json({ success: true, message: 'Portfolio updated successfully.', data: updated });
  } catch (err) {
    next(err);
  }
}

export async function publishOwnPortfolio(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!._id as Types.ObjectId;
    const portfolio = await portfolioService.setPublishStatus(userId, true);
    res.json({ success: true, message: 'Portfolio published successfully.', data: portfolio });
  } catch (err) {
    next(err);
  }
}

export async function unpublishOwnPortfolio(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!._id as Types.ObjectId;
    const portfolio = await portfolioService.setPublishStatus(userId, false);
    res.json({ success: true, message: 'Portfolio unpublished successfully.', data: portfolio });
  } catch (err) {
    next(err);
  }
}

export async function getOwnPortfolioAnalytics(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = req.user!._id as Types.ObjectId;
    const analytics = await portfolioService.getPortfolioAnalytics(userId);
    res.json({ success: true, data: analytics });
  } catch (err) {
    next(err);
  }
}
