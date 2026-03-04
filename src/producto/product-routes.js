'use strict';
import { Router } from 'express';
import { getProducts, getProductById } from './product-controller.js';
import { validateProductId } from '../../middlewares/product-validation.js';

const router = Router();

router.get('/', getProducts);
router.get('/:id', validateProductId, getProductById);

export default router;