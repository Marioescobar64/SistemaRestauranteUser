'use strict';
import { Router } from 'express';
import { 
    createPedido, 
    getPedidos, 
    getPedidoById, 
    updatePedido, 
    deletePedido 
} from './order-controller.js';
import { pedidoValidator } from '../../middlewares/order-validation.js';

const router = Router();

router.post('/', pedidoValidator, createPedido);
router.get('/', getPedidos);
router.get('/:id', getPedidoById);
router.put('/:id', pedidoValidator, updatePedido);
router.delete('/:id', deletePedido);

export default router;