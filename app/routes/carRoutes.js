const express = require('express');
const carModel = require('../models/Car');  

const router = express.Router();

router.get('/getCars', async (req, res) => {
  try {
    const cars = await carModel.find();
    res.status(200).json(cars);  // Devuelve los autos como JSON
  } catch (error) {
    console.error('Error al obtener los autos:', error);  
    res.status(500).json({ message: 'Error al obtener los autos', error: error.message });
  }
});

module.exports = router;
