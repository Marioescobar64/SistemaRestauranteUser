'use strict';
import { Router } from 'express';
import { getMenu, getSaucerById } from './controller-menu.js';
import { validateIdParam } from '../../middlewares/validation-menu.js';

const router = Router();

router.get('/', getMenu);
router.get('/:id', validateIdParam, getSaucerById);

export default router;