'use strict';

import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
    nombreEvento: {
        type: String,
        required: [true, 'El nombre del evento es obligatorio'],
        trim: true,
        maxLength: [150, 'El nombre del evento no puede exceder los 150 caracteres']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del evento es obligatoria'],
        trim: true
    },
    fecha: {
        type: Date,
        required: [true, 'La fecha del evento es obligatoria']
    },
    horaInicio: {
        type: String, 
        required: [true, 'La hora de inicio es obligatoria']
    },
    horaFin: {
        type: String, 
        required: [true, 'La hora de finalización es obligatoria']
    },
    capacidadMax: {
        type: Number,
        required: [true, 'La capacidad máxima es obligatoria'],
        min: [1, 'La capacidad debe ser al menos 1']
    },
    observaciones: {
        type: String,
        trim: true,
        default: 'Sin observaciones'
    },
    // Necesario para la función "Delete" lógica
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

eventoSchema.index({ nombreEvento: 1 });
eventoSchema.index({ fecha: 1 });
eventoSchema.index({ isActive: 1 });

export default mongoose.model('Evento', eventoSchema);