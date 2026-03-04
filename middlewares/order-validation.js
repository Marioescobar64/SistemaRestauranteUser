'use strict';
import { body } from 'express-validator';
import { checkValidators } from './check-validation.js';

export const pedidoValidator = [
    body('nombrePedido')
        .notEmpty().withMessage('El nombre del pedido es obligatorio'),
    body('mesa')
        .notEmpty().withMessage('La mesa es obligatoria')
        .isMongoId().withMessage('El ID de la mesa no es válido'),
    body('total')
        .notEmpty().withMessage('El total es obligatorio')
        .isFloat({ min: 0 }).withMessage('El total debe ser un número positivo'),
    body('estado')
        .optional()
        .isIn(['Pendiente', 'En proceso', 'Entregado', 'Cancelado'])
        .withMessage('Estado no válido'),
    checkValidators
];