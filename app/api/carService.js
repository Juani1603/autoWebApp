import dbConnect from '../utils/db';
import Car from '../models/Car';

export const findCarsByFilters = async (filters) => {
    await dbConnect();

    const query = {};
    if (filters.marca) query.marca = new RegExp(`^${filters.marca}$`, 'i');
    if (filters.modelo) query.modelo = new RegExp(`^${filters.modelo}$`, 'i');

    const cars = await Car.find(query);
    return cars;
};
