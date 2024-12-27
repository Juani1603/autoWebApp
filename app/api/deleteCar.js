import dbConnect from '../utils/db';
import Car from '../models/Car'; 

export default async function handler(req, res) {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ message: 'Método no permitido' });
    }

    const { id } = req.query;

    try {
        await dbConnect();

        const car = await Car.findByIdAndDelete(id);
        if (!car) {
            return res.status(404).json({ message: 'Auto no encontrado' });
        }

        res.status(200).json({ message: 'Auto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el auto', error: error.message });
    }
}
