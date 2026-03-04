'use strict';

import mongoose from 'mongoose';

const pedidoSchema = new mongoose.Schema({
    nombrePedido: {
        type: String,
        required: [true, 'El nombre del pedido es obligatorio'],
        trim: true,
        maxLength: [100, 'El nombre del pedido no puede ser tan largo']
    },
    // Relacionamos el pedido con una mesa específica
    mesa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mesa',
        required: [true, 'La mesa es obligatoria para registrar un pedido']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del pedido es obligatoria'],
        trim: true
    },
    fechaPedido: {
        type: Date,
        default: Date.now,
        required: [true, 'La fecha del pedido es obligatoria']
    },
    total: {
        type: Number,
        required: [true, 'El total a pagar es obligatorio'],
        min: [0, 'El total no puede ser negativo']
    },
    estado: {
        type: String,
        required: [true, 'El estado del pedido es obligatorio'],
        enum: {
            values: ['Pendiente', 'En proceso', 'Entregado', 'Cancelado'],
            message: '{VALUE} no es un estado válido. Usa: Pendiente, En proceso, Entregado o Cancelado'
        },
        default: 'Pendiente'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true 
});

pedidoSchema.index({ estado: 1 });
pedidoSchema.index({ fechaPedido: 1 });
pedidoSchema.index({ mesa: 1 });

export default mongoose.model('Pedido', pedidoSchema);