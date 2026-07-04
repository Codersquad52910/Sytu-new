import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as projectsController from './projects.controller';
import { createProjectSchema, updateProjectSchema, requestScreenshotsUploadSchema } from './projects.validation';

const router = Router();

// Public routes
router.get('/', projectsController.listProjects);
router.get('/:id', projectsController.getProject);

// Protected routes (require login)
router.use(auth);

router.post('/', validate(createProjectSchema), projectsController.createProject);
router.patch('/:id', validate(updateProjectSchema), projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);

router.post('/:id/screenshots', validate(requestScreenshotsUploadSchema), projectsController.getScreenshotsUploadUrls);
router.patch('/:id/feature', projectsController.toggleFeaturedProject);

export default router;
