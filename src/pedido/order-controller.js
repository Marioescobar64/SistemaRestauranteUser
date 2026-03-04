'use strict';
import Pedido from './order-model.js';

// Crear pedido (201 Created)
export const createPedido = async (req, res) => {
    try {
        const data = req.body;
        const pedido = new Pedido(data);
        await pedido.save();

        return res.status(201).json({
            success: true,
            message: 'Pedido creado con éxito',
            data: pedido
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear el pedido',
            error: error.message
        });
    }
};

// Obtener pedidos con paginación (200 OK)
export const getPedidos = async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query;
        const query = { isActive: true };

        const [total, pedidos] = await Promise.all([
            Pedido.countDocuments(query),
            Pedido.find(query)
                .populate('mesa', 'numeroMesa') // Mostramos el número de mesa
                .skip(Number(skip))
                .limit(Number(limit))
                .sort({ createdAt: -1 })
        ]);

        return res.status(200).json({
            success: true,
            total,
            data: pedidos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los pedidos',
            error: error.message
        });
    }
};

// Obtener un pedido por ID
export const getPedidoById = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findById(id).populate('mesa');

        if (!pedido || !pedido.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Pedido no encontrado'
            });
        }

        return res.status(200).json({ success: true, data: pedido });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Actualizar pedido
export const updatePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const pedidoActualizado = await Pedido.findByIdAndUpdate(id, data, { new: true });

        if (!pedidoActualizado) {
            return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        return res.status(200).json({
            success: true,
            message: 'Pedido actualizado correctamente',
            data: pedidoActualizado
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Borrado lógico (Desactivar pedido)
export const deletePedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByIdAndUpdate(id, { isActive: false }, { new: true });

        if (!pedido) {
            return res.status(404).json({ success: false, message: 'Pedido no encontrado' });
        }

        return res.status(200).json({ success: true, message: 'Pedido eliminado' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};