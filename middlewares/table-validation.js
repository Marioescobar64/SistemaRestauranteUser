'use strict';
import { param } from 'express-validator';
import { checkValidators } from './check-validation.js';

export const validateTableId = [
 param('id').isMongoId().withMessage('ID inválido'),
  checkValidators,
];