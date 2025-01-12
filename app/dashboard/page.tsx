"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AutoContainer } from "components";
import Image from "next/image";

interface Post {
    _id: string;
    marca: string;
    modelo: string;
    anio: number;
    imagen: string;
    kilometraje: number;
    precio: number;
    motor: string;
    transmision: string;
    combustible: string;
    caballosDeFuerza: number;
    descripcion: string;
    ubicacion: string;
}

const Dashboard = () => {
    const [allCars, setAllCars] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCars`);
                if (!response.ok) throw new Error("Error al obtener los autos");

                const data: Post[] = await response.json();
                setAllCars(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleCreatePost = () => {
        router.push("/dashboard/create"); // Redirige a la página de creación
    };

    const handleDeletePost = async (id: string) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta publicación?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteCar?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar el auto");

            // Filtra el auto eliminado de la lista local
            setAllCars((prevCars) => prevCars.filter((car) => car._id !== id));
        } catch (err: any) {
            alert(`Error: ${err.message}`);
        }
    };

    const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

    return (
        <div className="min-h-screen flex flex-col items-center p-4 pt-32">
            <h2 className="font-bold text-3xl mb-10">Bienvenido</h2>
            <button
                onClick={handleCreatePost}
                className="mb-6 w-64 bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
                Crear Publicación
            </button>

            <div className="w-full max-w-3xl">
                {loading && <p>Cargando publicaciones...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!isDataEmpty ? (
                    <section>
                        <div className="home__cars-wrapper">
                            {allCars?.map((car) => (
                                <div key={car._id} className="relative">
                                    <AutoContainer key={car._id} auto={car} />
                                    <div className="absolute top-5 right-5 space-x-2">
                                        <button
                                            onClick={() => router.push(`/dashboard/edit/${car._id}`)}
                                            className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                                        >
                                            <Image
                                                src="/pencil.svg"
                                                alt="pencil"
                                                width={20}
                                                height={20}
                                                className="text-white no-auto-resize"
                                            />
                                        </button>
                                        <button
                                            onClick={() => handleDeletePost(car._id)}
                                            className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                                        >
                                            <Image
                                                src="/trash.svg"
                                                alt="trash"
                                                width={20}
                                                height={20}
                                                className="text-white no-auto-resize"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : (
                    <div className="home__error-container">
                        <h2 className="text-black text-xl font-bold">No se encontraron publicaciones</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;