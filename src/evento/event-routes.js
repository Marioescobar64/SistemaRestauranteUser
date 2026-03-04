'use strict';
import { Router } from 'express';
import { 
    createEvento, 
    getEventos, 
    getEventoById, 
    updateEvento, 
    deleteEvento 
} from './event-controller.js';
import { eventoValidator } from '../../middlewares/event-validation.js';

const router = Router();

router.post('/', eventoValidator, createEvento);
router.get('/', getEventos);
router.get('/:id', getEventoById);
router.put('/:id', eventoValidator, updateEvento);
router.delete('/:id', deleteEvento);

export default router;