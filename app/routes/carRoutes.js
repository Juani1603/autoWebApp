const express = require('express');
const carModel = require('../models/Car');
const multer = require('multer');
const router = express.Router();
const { findCarsByFilters } = require('../api/carService');
const fs = require('fs-extra');
const sharp = require('sharp');
const path = require('path');

// Configuración de multer para almacenar los archivos en una carpeta 'uploads'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // Tamaño máximo de 50MB por archivo
  fileFilter: (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const extension = path.extname(file.originalname).toLowerCase();

    if (allowedExtensions.includes(extension)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos con las siguientes extensiones: .jpg, .jpeg, .png, .gif, .webp'));
    }
  },
});


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

// Ruta GET para obtener un auto específico por su ID
router.get('/getCar/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const car = await carModel.findById(id);
    if (!car) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error('Error al obtener el auto:', error);
    res.status(500).json({ message: 'Error al obtener el auto', error: error.message });
  }
});


// Ruta POST para crear un nuevo auto
router.post('/createCar', upload.array('imagenes', 15), async (req, res) => {
  try {
    const {
      marca, modelo, anio, kilometraje, precio, motor,
      transmision, combustible, caballosDeFuerza, descripcion, ubicacion,
    } = req.body;

    const anioNumber = parseInt(anio, 10);
    const kilometrajeNumber = parseInt(kilometraje, 10);
    const precioNumber = parseFloat(precio);
    const caballosDeFuerzaNumber = parseInt(caballosDeFuerza, 10);

    if (!marca || !modelo || !anio || !precio || kilometraje == null || kilometraje < 0 ||
      !motor || !transmision || !combustible || !caballosDeFuerza || !descripcion || !ubicacion) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    if (isNaN(anioNumber) || isNaN(kilometrajeNumber) || isNaN(precioNumber) || isNaN(caballosDeFuerzaNumber)) {
      return res.status(400).json({ message: 'Los campos numéricos deben ser válidos' });
    }

    const imagenesUrls = [];
    for (const file of req.files) {
      const inputPath = file.path;
      const outputFilename = `${path.parse(file.originalname).name}.webp`;
      const outputPath = path.join('uploads', outputFilename);

      // Convertir a .webp usando sharp
      await sharp(inputPath)
        .webp({ quality: 100 })
        .toFile(outputPath)
        .then(async () => {
          // Después de la conversión, elimina el archivo original con fs-extra
          const fileExists = await fs.pathExists(inputPath);
          if (fileExists) {
            await fs.remove(inputPath);
          } else {
            console.warn(`El archivo original no existe: ${inputPath}`);
          }
        })
        .catch((err) => {
          console.error('Error al convertir la imagen:', err);
        });

      // Guardar URL de la imagen procesada
      imagenesUrls.push(`/uploads/${outputFilename}`);
    }

    const newCar = new carModel({
      marca,
      modelo,
      anio: anioNumber,
      kilometraje: kilometrajeNumber,
      precio: precioNumber,
      motor,
      transmision,
      combustible,
      caballosDeFuerza: caballosDeFuerzaNumber,
      descripcion,
      ubicacion,
      imagenes: imagenesUrls,
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

// Ruta PUT para actualizar un auto
router.put('/edit/:id', upload.array('imagenes', 15), async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;

  const anioNumber = parseInt(anio, 10);
  const kilometrajeNumber = parseInt(kilometraje, 10);
  const precioNumber = parseFloat(precio);
  const caballosDeFuerzaNumber = parseInt(caballosDeFuerza, 10);

  if (!marca || !modelo || !anio || !precio || kilometraje == null || kilometraje < 0 ||
    !motor || !transmision || !combustible || !caballosDeFuerza || !descripcion || !ubicacion) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  if (isNaN(anioNumber) || isNaN(kilometrajeNumber) || isNaN(precioNumber) || isNaN(caballosDeFuerzaNumber)) {
    return res.status(400).json({ message: 'Los campos numéricos deben ser válidos' });
  }

  let imagenesExistentes = JSON.parse(req.body.imagenesExistentes);

  // Procesar nuevas imágenes subidas
  const imagenesNuevas = [];
  for (const file of req.files) {
    const inputPath = file.path;
    const outputFilename = `${path.parse(file.originalname).name}.webp`;
    const outputPath = path.join('uploads', outputFilename);

    // Convertir a .webp usando sharp
    await sharp(inputPath)
      .webp({ quality: 100 })
      .toFile(outputPath)
      .then(async () => {
        // Después de la conversión, elimina el archivo original
        try {
          await fs.access(inputPath); 
          await fs.unlink(inputPath); 
          console.log(`Archivo original eliminado: ${inputPath}`);
        } catch (err) {
          console.error('Error al eliminar el archivo original:', err);
        }
      })
      .catch((err) => {
        console.error('Error al convertir la imagen:', err);
      });

    // Agregar la nueva imagen al array de nuevas imágenes
    imagenesNuevas.push(`/uploads/${outputFilename}`);
  }

  // Unir las imágenes existentes y las nuevas en un solo array
  const imagenesUrls = [...imagenesExistentes, ...imagenesNuevas];

  try {
    const updatedCar = await carModel.findByIdAndUpdate(
      id,
      {
        marca,
        modelo,
        anio: anioNumber,
        kilometraje: kilometrajeNumber,
        precio: precioNumber,
        motor,
        transmision,
        combustible,
        caballosDeFuerza: caballosDeFuerzaNumber,
        descripcion,
        ubicacion,
        imagenes: imagenesUrls,  // Actualizar las imágenes del auto
      },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: 'Auto no encontrado' });
    }

    res.status(200).json(updatedCar);
  } catch (error) {
    console.error('Error al actualizar el auto:', error);
    res.status(500).json({ message: 'Error al actualizar el auto', error: error.message });
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
