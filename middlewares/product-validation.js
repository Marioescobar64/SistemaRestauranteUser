'use strict';
import { param } from 'express-validator';
import { validateFields } from './check-validation.js';

export const validateProductId = [
    param('id')
        .isMongoId().withMessage('El ID del producto no es válido'),
    validateFields
];