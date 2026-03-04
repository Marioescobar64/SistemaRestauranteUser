'use strict';
import { param } from 'express-validator';
import { validateFields } from './check-validation.js';

export const validateTableId = [
    param('id')
        .isMongoId().withMessage('El ID de la mesa no tiene un formato válido'),
    validateFields // Tu middleware que procesa los errores detectados
];