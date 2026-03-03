'use strict';
import { param } from 'express-validator';
import { validateFields } from '../middlewares/check-validation.js';

export const getOrderDetailValidator = [
    param('id').isMongoId().withMessage('No es un ID de MongoDB válido'),
    validateFields
];