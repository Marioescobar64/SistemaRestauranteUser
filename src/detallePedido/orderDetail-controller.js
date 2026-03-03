'use strict';
import DetallePedido from './orderDetail-model.js';

export const getDetalles = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        // Solo mostramos los que están activos por defecto
        const filter = { isActive: true };

        const detalles = await DetallePedido.find(filter)
            .populate('producto', 'nombre precio') // Trae info del producto
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await DetallePedido.countDocuments(filter);

        // Código 200 explícito para cumplir con la rúbrica
        return res.status(200).json({
            success: true,
            data: detalles,
            pagination: {
                currentPage: Number(page),
                totalPages: Math.ceil(total / limit),
                totalRecords: total
            }
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Error al obtener los detalles',
            error: error.message 
        });
    }
};

export const getDetalleById = async (req, res) => {
    try {
        const { id } = req.params;
        const detalle = await DetallePedido.findById(id).populate('producto', 'nombre');

        if (!detalle) {
            return res.status(404).json({ 
                success: false, 
                message: 'Detalle no encontrado' 
            });
        }

        return res.status(200).json({ success: true, data: detalle });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            message: 'Error al buscar el detalle' 
        });
    }
};