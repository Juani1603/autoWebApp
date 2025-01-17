const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  anio: { type: Number, required: true },
  kilometraje: { type: Number, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, required: true },
  imagenes: {type: [String], required: true},
  ubicacion: { type: String, required: true },
  motor: { type: String, required: true }, 
  caballosDeFuerza: { type: Number, required: true }, 
  transmision: { type: String, required: true }, 
  combustible: { type: String, required: true }, 
  slug: { type: String },
});

// Middleware para generar el slug antes de guardar el auto
carSchema.pre('save', function(next) {
  if (this.isNew) {
    const slug = `${this.marca}-${this.modelo}-${this.anio}-${this._id.toString().slice(0, 5)}`.toLowerCase().replace(/\s+/g, '-');
    this.slug = slug;
  }
  next();
});

// Verifica si el modelo ya está definido, antes de definirlo nuevamente
const Car = mongoose.models.Car || mongoose.model('Car', carSchema, 'Autos');

module.exports = Car;
