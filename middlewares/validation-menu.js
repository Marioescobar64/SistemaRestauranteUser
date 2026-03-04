'use strict';
import { param } from 'express-validator';
import { validateFields } from './check-validation.js';

export const validateIdParam = [
    param('id').isMongoId().withMessage('El ID proporcionado no es válido'),
    validateFields
];