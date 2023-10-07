import express from 'express';
const router = express.Router();

import { adminController } from './controllers/adminController.js';
import { propertiesController } from './controllers/propertiesController.js';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/*", function(req, res, next) {  
  if(!req.isSpider() ) {
      next();
      return;
  }
  
  let path = req.query.path;
  
  if(path = "/") {
    path = "/index";
  }
  res.sendFile(`${__dirname}/cache/${path}.html`);
});

router.use('/admin', adminController);
router.use('/properties', propertiesController);

export default router;