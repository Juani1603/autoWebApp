"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BuscarMarca from "components/BuscarMarca";
import { combustible as opcionesCombustible } from "constants/index";
import { transmision as opcionesTransmision } from "constants/index";
import { ubicaciones as opcionesUbicaciones } from "constants/index";

const CreatePost = () => {
    const [marca, setMarca] = useState<string>("");
    const [modelo, setModelo] = useState<string>("");
    const [anio, setAnio] = useState<number | string>("");
    const [kilometraje, setKilometraje] = useState<number | string>("");
    const [precio, setPrecio] = useState<number | string>("");
    const [motor, setMotor] = useState<string>("");
    const [transmision, setTransmision] = useState<string>("");
    const [combustibleSeleccionado, setCombustibleSeleccionado] = useState<string>("");
    const [caballosDeFuerza, setCaballosDeFuerza] = useState<number | string>("");
    const [descripcion, setDescripcion] = useState<string>("");
    const [ubicacion, setUbicacion] = useState<string>("");
    const [imagenes, setImagenes] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImagenes(Array.from(e.target.files));
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();

        formData.append("marca", marca);
        formData.append("modelo", modelo);
        formData.append("anio", String(anio));
        formData.append("kilometraje", String(kilometraje));
        formData.append("precio", String(precio));
        formData.append("motor", motor);
        formData.append("transmision", transmision);
        formData.append("combustible", combustibleSeleccionado);
        formData.append("caballosDeFuerza", String(caballosDeFuerza));
        formData.append("descripcion", descripcion);
        formData.append("ubicacion", ubicacion);

        imagenes.forEach((imagen) => {
            formData.append("imagenes", imagen);
            console.log(imagen);
            
        });

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createCar`, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) throw new Error("Error al crear la publicación");

            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center p-4 pt-32">
            <h2 className="font-bold text-3xl mb-10">Crear Publicación</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-3xl">
                {error && <p className="text-red-500">{error}</p>}

                <div className="mb-4">
                    <label htmlFor="marca" className="block text-sm font-medium text-gray-700">
                        Marca
                    </label>
                    <BuscarMarca
                        marca={marca}
                        definirMarca={setMarca}
                        customClass="border-2 border-gray-300  bg-white rounded-lg"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="modelo" className="block text-sm font-medium text-gray-700">
                        Modelo
                    </label>
                    <input
                        type="text"
                        id="modelo"
                        value={modelo}
                        placeholder="Vento GLI"
                        onChange={(e) => setModelo(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="anio" className="block text-sm font-medium text-gray-700">
                        Año
                    </label>
                    <input
                        type="number"
                        id="anio"
                        value={anio}
                        placeholder="2023"
                        onChange={(e) => setAnio(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-300"
                        required
                    />
                </div>


                <div className="mb-4">
                    <label htmlFor="kilometraje" className="block text-sm font-medium text-gray-700">
                        Kilometraje (km)
                    </label>
                    <input
                        type="number"
                        id="kilometraje"
                        value={kilometraje}
                        placeholder="10000"
                        onChange={(e) => setKilometraje(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="precio" className="block text-sm font-medium text-gray-700">
                        Precio (US$)
                    </label>
                    <input
                        type="number"
                        id="precio"
                        value={precio}
                        placeholder="50000"
                        onChange={(e) => setPrecio(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="motor" className="block text-sm font-medium text-gray-700">
                        Motor
                    </label>
                    <input
                        type="text"
                        id="motor"
                        value={motor}
                        placeholder="2.0"
                        onChange={(e) => setMotor(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="transmision" className="block text-sm font-medium text-gray-700">
                        Transmisión
                    </label>
                    <select
                        id="transmision"
                        value={transmision}
                        onChange={(e) => setTransmision(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    >
                        <option value="" disabled>
                            Seleccione un tipo de transmisión
                        </option>
                        {opcionesTransmision.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="combustible" className="block text-sm font-medium text-gray-700">
                        Combustible
                    </label>
                    <select
                        id="combustible"
                        value={combustibleSeleccionado}
                        onChange={(e) => setCombustibleSeleccionado(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-300"
                        required
                    >
                        <option value="" disabled >
                            Seleccione un tipo de combustible
                        </option>
                        {opcionesCombustible.map((item: { value: string; title: string }) => (
                            <option key={item.value} value={item.value} className="hover:bg-blue-600 hover:text-white">
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="caballosDeFuerza" className="block text-sm font-medium text-gray-700">
                        Caballos de Fuerza
                    </label>
                    <input
                        type="number"
                        id="caballosDeFuerza"
                        value={caballosDeFuerza}
                        placeholder="250"
                        onChange={(e) => setCaballosDeFuerza(Number(e.target.value))}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder:text-gray-300"
                        rows={4}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700">
                        Ubicación
                    </label>
                    <select
                        id="ubicacion"
                        value={ubicacion}
                        onChange={(e) => setUbicacion(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        required
                    >
                        <option value="" disabled>
                            Seleccione una sucursal
                        </option>
                        {Object.entries(opcionesUbicaciones).map(([key, value]) => (
                            <option key={key} value={key}>
                                {key} - {value}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700">
                        Imágenes
                    </label>
                    <input
                        type="file"
                        id="imagenes"
                        name="imagenes"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                    {imagenes.length > 0 && (
                        <p className="text-sm text-gray-500 mt-1">
                            {imagenes.length} archivo(s) seleccionado(s).
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Crear Publicación"}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
