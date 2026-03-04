'use strict';
import { Router } from 'express';
import { getMenu, getSaucerById } from './controller-menu.js';
import {  validateCreateMenu,
  validateUpdateMenu,
  validateMenuStatusChange,
  validateGetMenuById, } from '../../middlewares/validation-menu.js';

const router = Router();

router.get('/', getMenu);
router.get('/:id', validateGetMenuById, getSaucerById);

export default router;