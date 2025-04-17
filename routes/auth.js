import express from 'express';
import { tokenValidate } from '../middleware.js';
import controller from '../controller/auth-controller.js';
const router = express.Router();
router.get('/', tokenValidate, controller.getIsLogged);
export default router;