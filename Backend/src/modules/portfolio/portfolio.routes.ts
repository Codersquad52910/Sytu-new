import { Router } from 'express';
import { auth, requirePremium } from '../../middleware/auth';
import { validate } from '../../middleware/validate';
import * as portfolioController from './portfolio.controller';
import { updatePortfolioSchema } from './portfolio.validation';

const router = Router();

// Public route to view a portfolio
router.get('/:username', portfolioController.getPublicPortfolio);

// Protected routes (require login)
router.use(auth);

router.get('/me/details', portfolioController.getOwnPortfolio); // using details to avoid collision with :username
router.patch('/me', validate(updatePortfolioSchema), portfolioController.updateOwnPortfolio);
router.post('/me/publish', portfolioController.publishOwnPortfolio);
router.post('/me/unpublish', portfolioController.unpublishOwnPortfolio);

// Premium protected routes
router.get('/me/analytics', requirePremium, portfolioController.getOwnPortfolioAnalytics);

export default router;
