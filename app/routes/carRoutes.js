const express = require('express');
const carModel = require('../models/Car'); 
const router = express.Router();
const { findCarsByFilters } = require('../api/carService');

// Ruta GET para obtener los autos
router.get('/getCars', async (req, res) => {
  const { marca, modelo } = req.query;

  try {
      const cars = await findCarsByFilters({ marca, modelo });
      if (!cars.length) {
          return res.status(404).json({ message: 'No se encontraron autos con los filtros proporcionados' });
      }
      res.status(200).json(cars);
  } catch (error) {
      console.error('Error al filtrar los autos:', error);
      res.status(500).json({ message: 'Error al filtrar los autos', error: error.message });
  }
});

// Ruta GET para obtener un auto por su ID
router.get('/autos/:autoId', async (req, res) => {
  try {
    const { autoId } = req.params;

    // Buscar el auto por su ID
    const car = await carModel.findById(autoId);

    if (!car) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }

    res.status(200).json(car); 
  } catch (error) {
    console.error('Error al obtener el auto:', error);
    res.status(500).json({ message: 'Error al obtener los datos del auto', error: error.message });
  }
});

// Ruta POST para crear un nuevo auto
router.post('/createCar', async (req, res) => {
  const { marca, modelo, anio, kilometraje, precio, motor, transmision, combustible, caballosDeFuerza, descripcion, ubicacion, imagen } = req.body;

  if (!marca || !modelo || !anio || !precio || kilometraje == null || kilometraje < 0 || !motor || !transmision || !combustible || !caballosDeFuerza || !descripcion || !ubicacion) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  try {
    const newCar = new carModel({
      marca,
      modelo,
      anio,
      kilometraje,
      precio,
      motor,
      transmision,
      combustible,
      caballosDeFuerza,
      descripcion,
      ubicacion,
      imagen,
    });

    await newCar.save();
    res.status(201).json(newCar);  
  } catch (error) {
    console.error('Error al crear el auto:', error);
    res.status(500).json({ message: 'Error al crear el auto', error: error.message });
  }
});


// Ruta DELETE para eliminar un automóvil
router.delete('/deleteCar', async (req, res) => {
  const { id } = req.query; 
  
  if (!id) {
    return res.status(400).json({ message: 'Se requiere un ID para eliminar el auto' });
  }

  try {
    const car = await carModel.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }

    res.status(200).json({ message: 'Auto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el auto:', error);
    res.status(500).json({ message: 'Error al eliminar el auto', error: error.message });
  }
});

// Ruta GET para obtener autos filtrados por marca y/o modelo
router.get('/marca=:marca/modelo=:modelo?', async (req, res) => {
  const { marca, modelo } = req.params;

  try {
      // Si el modelo no es proporcionado, solo se filtra por marca
      const cars = await findCarsByFilters({ marca, modelo });

      if (!cars.length) {
          return res.status(404).json({ message: 'No se encontraron autos con los filtros proporcionados' });
      }

      res.status(200).json(cars);
  } catch (error) {
      console.error('Error al filtrar los autos:', error);
      res.status(500).json({ message: 'Error al filtrar los autos', error: error.message });
  }
});

module.exports = router
