"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AutoContainer, BarraBusqueda } from "components";
import Image from "next/image";

interface Post {
  _id: string;
  marca: string;
  modelo: string;
  anio: number;
  imagenes: [string];
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
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [authorized, setAuthorized] = useState(false);

  const router = useRouter();

  // Verificación de token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    setAuthorized(true);
  }, [router]);

  // Cargar autos solo si está autorizado
  useEffect(() => {
    if (!authorized) return;

    const fetchCars = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getCars`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Error al obtener los autos");

        const data: Post[] = await response.json();
        setAllCars(data);
        setSearchResults(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [authorized]);

  const handleCreatePost = () => {
    router.push("/dashboard/create");
  };

  const handleDeletePost = async (id: string) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta publicación?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/deleteCar?id=${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar el auto");

      setAllCars((prevCars) => prevCars.filter((car) => car._id !== id));
      setSearchResults((prevResults) => prevResults.filter((car) => car._id !== id));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSearch = (marca: string, modelo: string) => {
    const filteredCars = allCars.filter(
      (car) =>
        (marca ? car.marca.toLowerCase().includes(marca.toLowerCase()) : true) &&
        (modelo ? car.modelo.toLowerCase().includes(modelo.toLowerCase()) : true)
    );
    setSearchResults(filteredCars);
  };

  const isDataEmpty = !Array.isArray(searchResults) || searchResults.length < 1;

  if (!authorized) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-32">
        <h1 className="font-bold text-4xl mb-10 mt-5">Bienvenido, Administrador</h1>
        <button
            onClick={handleCreatePost}
            className="mb-16 w-full max-w-xs bg-green-500 text-white py-3 px-5 rounded hover:bg-green-600 flex items-center justify-center gap-3"
        >
            <div className="w-8 h-8 mr-[-10px] ml-1 flex-shrink-0">
                <img src="/file.svg" alt="file" className="w-full h-full" />
            </div>

            <div className="flex-1 flex flex-col items-center">
                <span className="text-xl font-semibold">Crear Publicación</span>
            </div>
        </button>



        <div className="w-full mb-8 flex justify-center align-center">
            <BarraBusqueda onSearch={handleSearch} />
        </div>

        <div className="w-full">
            {loading && <p>Cargando publicaciones...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {!isDataEmpty ? (
                <section>
                    <div className="home__cars-wrapper">
                        {searchResults?.map((car) => (
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
                                            width={25}
                                            height={25}
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
                                            width={25}
                                            height={25}
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
