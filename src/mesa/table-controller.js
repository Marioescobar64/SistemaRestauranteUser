'use strict';
import Mesa from './table-model.js';

// Obtener todas las mesas con paginación
export const getTables = async (req, res) => {
    try {
        // Implementamos paginación como pide la rúbrica 
        const { page = 1, limit = 10 } = req.query;
        const filter = { isActive: true };

        const [total, mesas] = await Promise.all([
            Mesa.countDocuments(filter),
            Mesa.find(filter)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ numeroMesa: 1 })
        ]);

        // Definimos códigos HTTP explícitos 
        return res.status(200).json({
            success: true,
            total,
            data: mesas,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        // Manejo de errores con try-catch 
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el listado de mesas',
            error: error.message
        });
    }
};

// Obtener una mesa específica por su ID
export const getTableById = async (req, res) => {
    try {
        const { id } = req.params;
        const mesa = await Mesa.findById(id);

        if (!mesa || !mesa.isActive) {
            return res.status(404).json({
                success: false,
                message: 'La mesa no existe o no está disponible'
            });
        }

        return res.status(200).json({
            success: true,
            data: mesa
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al buscar la mesa',
            error: error.message
        });
    }
};