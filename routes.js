import express from 'express';
const router = express.Router();

import { adminController } from './controllers/adminController.js';
import { propertiesController } from './controllers/propertiesController.js';

router.get("/*", function(req, res, next) {
  if(!req.isSpider() ) {
      next();
      return;
  }

  let path = new URL(req.originalUrl).pathname;
  
  if(path = "/") {
    path = "/index";
  }
  res.sendFile(`./cache/${path}.html`);
});

router.use('/admin', adminController);
router.use('/properties', propertiesController);

export default router;