import { findCarsByFilters } from './carService';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

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
}
