'use strict';

import mongoose from 'mongoose';

const detallePedidoSchema = new mongoose.Schema({
    // Agregamos la referencia para saber a qué pedido pertenece este detalle
    pedido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pedido',
        required: [true, 'El detalle debe pertenecer a un pedido']
    },
    // Agregamos la referencia para saber qué plato/producto se está pidiendo
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu', // O 'Producto', asegúrate de que coincida con el nombre de tu otro modelo
        required: [true, 'El producto o menú es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatoria'],
        trim: true
    },
    cantidad: {
        type: Number,
        required: [true, 'La cantidad es obligatoria'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} no es un número entero'
        },
        min: [1, 'La cantidad debe ser al menos 1']
    },
    precioUnitario: {
        type: Number,
        required: [true, 'El precio unitario es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    subtotal: {
        type: Number,
        required: [true, 'El subtotal es obligatorio'],
        min: [0, 'El subtotal no puede ser negativo']
    },
    isActive: {
        type: Boolean,
        default: true
    }
    // Quité el campo "editable" porque como solo tienes endpoint de Lectura,
    // desde la API nadie podrá editarlo de todos modos.
}, {
    timestamps: true
});

// Índices para hacer las búsquedas más rápidas (especialmente por pedido)
detallePedidoSchema.index({ pedido: 1 });

export default mongoose.model('DetallePedido', detallePedidoSchema);