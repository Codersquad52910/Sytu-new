import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodSchema } from 'zod';
import { AppError } from './errorHandler';

export function validate(schema: ZodSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
        next(new AppError(`Validation failed: ${issues}`, 400, 'VALIDATION_ERROR'));
      } else {
        next(error);
      }
    }
  };
}
