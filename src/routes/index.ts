import { Router } from 'express';

import { logger } from '../middleware/logger.middleware';
import healthcheckRouter from './healthcheck';
import contactRouter from './contact';

const router = Router();

router.use(logger);
router.use(healthcheckRouter);
router.use(contactRouter);

export default router;
