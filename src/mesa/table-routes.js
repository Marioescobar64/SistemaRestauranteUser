'use strict';
import { Router } from 'express';
import { getTables, getTableById } from './table-controller.js';
import { validateTableId } from '../../middlewares/table-validation.js';

const router = Router();

// Definimos solo rutas de lectura (Read)
router.get('/', getTables);
router.get('/:id', validateTableId, getTableById);

export default router;