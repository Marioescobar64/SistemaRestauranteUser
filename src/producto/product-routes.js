'use strict';
import { Router } from 'express';
import { getProducts, getProductById } from './product-controller.js';
import { validateGetProductoById } from '../../middlewares/product-validation.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', validateGetProductoById, getProductById);

export default router;