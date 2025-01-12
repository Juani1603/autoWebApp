const dbConnect = require('../utils/db');
const Car = require('../models/Car');

const findCarsByFilters = async (filters) => {
    await dbConnect();

    const query = {};
    if (filters.marca) query.marca = new RegExp(`^${filters.marca}$`, 'i');
    if (filters.modelo) query.modelo = new RegExp(`^${filters.modelo}$`, 'i');

    const cars = await Car.find(query);
    return cars;
};

module.exports = { findCarsByFilters };