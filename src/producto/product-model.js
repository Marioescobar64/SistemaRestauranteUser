'use strict';

import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre no puede tener más de 100 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del producto es obligatoria'],
        trim: true
    },
    precio: {
        type: Number,
        required: [true, 'El precio es obligatorio'],
        min: [0, 'El precio no puede ser menor a 0'] 
    },
    categoria: {
        type: String,
        required: [true, 'La categoría es obligatoria'],
        trim: true
    },
    isActive: { 
        type: Boolean,
        default: true
    }
}, {
    timestamps: true 
});

productoSchema.index({ categoria: 1 });
productoSchema.index({ nombre: 1 });
productoSchema.index({ isActive: 1 });

export default mongoose.model('Producto', productoSchema);