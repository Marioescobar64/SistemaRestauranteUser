'use strict';
import Evento from './event-model.js';

// Crear un nuevo evento
export const createEvento = async (req, res) => {
    try {
        const data = req.body;
        const evento = new Evento(data);
        await evento.save();

        return res.status(201).json({
            success: true,
            message: 'Evento creado exitosamente',
            data: evento
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al crear el evento',
            error: error.message
        });
    }
};

// Obtener todos los eventos (con paginación)
export const getEventos = async (req, res) => {
    try {
        const { limit = 10, skip = 0 } = req.query; // Paginación según la rúbrica
        const query = { isActive: true };

        const [total, eventos] = await Promise.all([
            Evento.countDocuments(query),
            Evento.find(query)
                .skip(Number(skip))
                .limit(Number(limit))
        ]);

        return res.status(200).json({
            success: true,
            total,
            data: eventos
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al obtener eventos',
            error: error.message
        });
    }
};

// Obtener un evento por ID
export const getEventoById = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await Evento.findById(id);

        if (!evento || !evento.isActive) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            data: evento
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al buscar el evento',
            error: error.message
        });
    }
};

// Actualizar evento
export const updateEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const eventoActualizado = await Evento.findByIdAndUpdate(id, data, { new: true });

        if (!eventoActualizado) {
            return res.status(404).json({
                success: false,
                message: 'No se pudo encontrar el evento para actualizar'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Evento actualizado',
            data: eventoActualizado
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al actualizar',
            error: error.message
        });
    }
};

// Eliminar evento (Borrado Lógico)
export const deleteEvento = async (req, res) => {
    try {
        const { id } = req.params;
        const evento = await Evento.findByIdAndUpdate(id, { isActive: false }, { new: true });

        if (!evento) {
            return res.status(404).json({
                success: false,
                message: 'Evento no encontrado'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Evento eliminado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error al eliminar el evento',
            error: error.message
        });
    }
};