'use strict';
import { body } from 'express-validator';
import { validateFields } from './check-validation.js';

export const eventoValidator = [
    body('nombreEvento')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ max: 150 }).withMessage('Máximo 150 caracteres'),
    body('descripcion')
        .notEmpty().withMessage('La descripción es obligatoria'),
    body('fecha')
        .notEmpty().withMessage('La fecha es obligatoria')
        .isISO8601().withMessage('Formato de fecha inválido (YYYY-MM-DD)'),
    body('horaInicio')
        .notEmpty().withMessage('La hora de inicio es obligatoria'),
    body('horaFin')
        .notEmpty().withMessage('La hora de fin es obligatoria'),
    body('capacidadMax')
        .notEmpty().withMessage('La capacidad es obligatoria')
        .isInt({ min: 1 }).withMessage('La capacidad debe ser un número mayor a 0'),
    validateFields // Este es tu middleware que revisa los errores de validación
];