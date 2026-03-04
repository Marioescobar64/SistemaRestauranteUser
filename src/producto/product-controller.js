'use strict';
import Producto from './product-model.js';

// Obtener todos los productos con paginación (Read)
export const getProducts = async (req, res) => {
    try {
        const { limit = 10, skip = 0, category } = req.query;
        
        // Filtro base: solo productos activos
        const query = { isActive: true };
        
        // Si el usuario quiere filtrar por categoría
        if (category) {
            query.categoria = category;
        }

        const [total, productos] = await Promise.all([
            Producto.countDocuments(query),
            Producto.find(query)
                .skip(Number(skip))
                .limit(Number(limit))
                .sort({ nombre: 1 })
        ]);

        return res.status(200).json({
            success: true,
            message: 'Productos obtenidos correctamente',
            total,
            data: productos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener los productos',
            error: error.message
        });
    }
};

// Obtener un producto por su ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);

        if (!producto || !producto.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Producto no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: producto
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al buscar el producto',
            error: error.message
        });
    }
};