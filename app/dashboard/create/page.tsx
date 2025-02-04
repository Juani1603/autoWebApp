"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BuscarMarca from "components/BuscarMarca";
import { combustible as opcionesCombustible } from "constants/index";
import { transmision as opcionesTransmision } from "constants/index";
import { ubicaciones as opcionesUbicaciones } from "constants/index";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import SortableImage from "components/SortableImage";
import Image from "next/image";

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

    const convertToWebP = async (file: File): Promise<File> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = async (event) => {
                const img = document.createElement("img");
                img.src = event.target?.result as string;
                
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
    
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0);
    
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.webp`;
                            resolve(new File([blob], uniqueName, { type: "image/webp" }));
                        } else {
                            reject(new Error("Error al convertir la imagen a WebP"));
                        }
                    }, "image/webp");
                };
                img.onerror = () => reject(new Error("Error al cargar la imagen"));
            };
            reader.onerror = () => reject(new Error("Error al leer el archivo"));
        });
    };
    
    

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const webpFiles = await Promise.all(files.map(convertToWebP));
            setImagenes([...imagenes, ...webpFiles]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImagenes((prev) => prev.filter((_, i) => i !== index));
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            const oldIndex = imagenes.findIndex((_, i) => i === active.id);
            const newIndex = imagenes.findIndex((_, i) => i === over.id);
            setImagenes((prev) => arrayMove(prev, oldIndex, newIndex));
        }
    };

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
                    <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700 mb-2">
                        Seleccionar imágenes (máx. 25)
                    </label>
                    <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-primary-blue-500 focus-within:ring-2 focus-within:ring-primary-blue-500 cursor-pointer">
                        <label
                            htmlFor="imagenes"
                            className="flex flex-col items-center justify-center gap-2 text-gray-600 cursor-pointer"
                        >
                            <div className="text-4xl text-primary-blue-500 font-bold">+</div>
                            <p className="text-sm">Haz clic aquí o arrastra para subir archivos</p>
                        </label>
                        <input
                            type="file"
                            id="imagenes"
                            name="imagenes"
                            multiple
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {imagenes.length > 0 && (
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={imagenes.map((_, i) => i)} strategy={verticalListSortingStrategy}>
                            <div className="flex flex-wrap gap-2 overflow-x-hidden mt-4 mb-4">
                                {imagenes.map((imagen, index) => (
                                    <div key={index} className="w-1/2 sm:w-1/4 lg:w-1/6 relative">
                                        <SortableImage id={index} image={URL.createObjectURL(imagen)} onRemove={() => handleRemoveImage(index)}/>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                            }}
                                        >
                                            <Image
                                                src={"/trash.svg"}
                                                alt="close"
                                                width={20}
                                                height={20}
                                                className="object-contain"
                                            />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                )}




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
