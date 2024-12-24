const express = require('express');
const carModel = require('../models/Car');  // Asegúrate de que el modelo Car esté bien configurado

const router = express.Router();

// Ruta GET para obtener los autos
router.get('/getCars', async (req, res) => {
  try {
    const cars = await carModel.find();
    res.status(200).json(cars);  // Devuelve los autos como JSON
  } catch (error) {
    console.error('Error al obtener los autos:', error);  
    res.status(500).json({ message: 'Error al obtener los autos', error: error.message });
  }
});

// Ruta POST para crear un nuevo automóvil
router.post('/createCar', async (req, res) => {
  const { marca, modelo, anio, kilometraje ,precio, motor, transmision, combustible, caballosDeFuerza, descripcion, ubicacion, imagen } = req.body;

  if (!marca || !modelo || !anio || !precio || !kilometraje || !motor || !transmision || !combustible || !caballosDeFuerza || !descripcion || !ubicacion) {
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
    res.status(201).json(newCar);  // Responde con el nuevo auto creado
  } catch (error) {
    console.error('Error al crear el auto:', error);
    res.status(500).json({ message: 'Error al crear el auto', error: error.message });
  }
});

module.exports = router;
