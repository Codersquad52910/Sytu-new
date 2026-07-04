import { Router } from 'express';
import { auth } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as workspacesController from './workspaces.controller';
import { createWorkspaceSchema, updateWorkspaceSchema } from './workspaces.validation';

const router = Router();

// All workspaces routes are protected
router.use(auth);

router.get('/', workspacesController.listWorkspaces);
router.get('/:id', workspacesController.getWorkspace);
router.post('/', validate(createWorkspaceSchema), workspacesController.createWorkspace);
router.patch('/:id', validate(updateWorkspaceSchema), workspacesController.updateWorkspace);
router.delete('/:id', workspacesController.deleteWorkspace);

export default router;
