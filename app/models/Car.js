const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema de Mongoose
const CarSchema = new Schema({
    marca: { type: String, required: true },
    modelo: { type: String, required: true },
    anio: { type: Number, required: true }, 
    kilometraje: { type: Number, required: true },
    precio: { type: Number, required: true },
    color: { type: String, required: true },
    ubicacion: { type: String, required: true } 
}, { collection: 'Autos' }); // Especifica la colección "Autos"

module.exports = mongoose.models.Car || mongoose.model('Car', CarSchema);
