import express from 'express';
const router = express.Router();

import { adminController } from './controllers/adminController.js';
import { propertiesController } from './controllers/propertiesController.js';

router.use('/admin', adminController);
router.use('/properties', propertiesController);

export default router;