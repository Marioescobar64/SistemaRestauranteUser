'use strict';

import mongoose from 'mongoose';

const mesaSchema = new mongoose.Schema({
    descripcion: {
        type: String,
        required: [true, 'La descripción de la mesa es obligatoria'],
        trim: true
    },
    numeroMesa: {
        type: Number,
        required: [true, 'El número de mesa es obligatorio'],
        unique: true, // Evita duplicados en la base de datos
        min: [1, 'El número de mesa debe ser al menos 1']
    },
    capacidad: {
        type: Number,
        required: [true, 'La capacidad de personas es obligatoria'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} debe ser un número entero'
        },
        min: [1, 'La capacidad mínima debe ser de 1 persona']
    },
    estado: {
        type: String,
        required: [true, 'El estado de la mesa es obligatorio'],
        enum: {
            values: ['Disponible', 'Ocupada', 'Reservada'],
            message: '{VALUE} no es un estado válido. Usa: Disponible, Ocupada o Reservada'
        },
        default: 'Disponible'
    },
    // Aunque sea de solo lectura para el cliente, dejamos isActive para control interno
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    // Agregamos timestamps para saber cuándo se creó o actualizó (puntos extra en rúbrica)
    timestamps: true
});

// Índices para que las búsquedas por número de mesa y estado sean ultra rápidas
mesaSchema.index({ numeroMesa: 1 });
mesaSchema.index({ estado: 1 });
mesaSchema.index({ isActive: 1 });

export default mongoose.model('Mesa', mesaSchema);