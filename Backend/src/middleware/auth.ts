import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';
import { User, IUser } from '../models/User';
import { redis } from '../config/redis';
import { AppError } from './errorHandler';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export async function auth(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided. Access denied.', 401, 'UNAUTHORIZED');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new AppError('No token provided. Access denied.', 401, 'UNAUTHORIZED');
    }

    let payload: TokenPayload;
    try {
      payload = verifyAccessToken(token);
    } catch (err) {
      throw new AppError('Invalid or expired access token.', 401, 'TOKEN_EXPIRED_OR_INVALID');
    }

    // Check Redis blocklist if jti is present
    if (payload.jti) {
      const isBlocklisted = await redis.get(`blocklist:${payload.jti}`);
      if (isBlocklisted) {
        throw new AppError('Token has been revoked. Please log in again.', 401, 'TOKEN_REVOKED');
      }
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      throw new AppError('User no longer exists.', 401, 'USER_NOT_FOUND');
    }

    if (user.isSuspended) {
      throw new AppError('This user account has been suspended.', 403, 'USER_SUSPENDED');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}

export function requirePremium(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    return next(new AppError('Authentication required.', 401, 'UNAUTHORIZED'));
  }
  if (!req.user.isPremium) {
    return next(new AppError('Premium subscription required to access this feature.', 403, 'PREMIUM_REQUIRED'));
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.user) {
    return next(new AppError('Authentication required.', 401, 'UNAUTHORIZED'));
  }
  if (req.user.role !== 'admin') {
    return next(new AppError('Admin permission required.', 403, 'FORBIDDEN'));
  }
  next();
}
