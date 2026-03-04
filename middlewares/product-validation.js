'use strict';
import { param } from 'express-validator';
import { checkValidators } from './check-validation.js';

export const validateGetProductoById = [
  param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];