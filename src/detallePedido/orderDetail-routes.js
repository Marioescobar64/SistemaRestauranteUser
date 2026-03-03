'use strict';
import { Router } from 'express';
import { getDetalles, getDetalleById } from './orderDetail-controller.js';

const router = Router();

// Solo definimos rutas de lectura (GET) según tu tabla de microservicios
router.get('/', getDetalles);
router.get('/:id', getDetalleById);

export default router;