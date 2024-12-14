const dbConnect = require('../utils/db'); 
const Car = require('../models/Car'); 

module.exports = async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const cars = await Car.find({});
    res.status(200).json(cars);
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};
