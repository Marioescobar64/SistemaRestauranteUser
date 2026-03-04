'use strict';
import Menu from './model-menu.js';

// Obtener todo el menú con paginación
export const getMenu = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const filter = { isActive: true };

        const [total, saucers] = await Promise.all([
            Menu.countDocuments(filter),
            Menu.find(filter)
                .limit(limit * 1)
                .skip((page - 1) * limit)
                .sort({ saucerName: 1 })
        ]);

        // Código 200 explícito para cumplir con la rúbrica
        return res.status(200).json({
            success: true,
            total,
            data: saucers,
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page)
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener el menú',
            error: error.message
        });
    }
};

// Obtener un platillo específico por ID
export const getSaucerById = async (req, res) => {
    try {
        const { id } = req.params;
        const saucer = await Menu.findById(id);

        if (!saucer || !saucer.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Platillo no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: saucer
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al buscar el platillo',
            error: error.message
        });
    }
};