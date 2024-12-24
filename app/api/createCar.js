
import dbConnect from "../utils/db"; 
import Car from "../models/Car"; 

export default async function handler(req , res ) {
    if (req.method === "POST") {
        try {
            await dbConnect();

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
                imagen,
            } = req.body;

            const newCar = new Car({
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

            const savedCar = await newCar.save();
            res.status(201).json(savedCar);
        } catch (error) {
            res.status(500).json({ error: "Error al guardar la publicación" });
        }
    } else {
        res.status(405).json({ error: "Método no permitido" });
    }
}
