"use client";

import { Inicio, BarraBusqueda, AutoContainer } from "components";
import { useState, useEffect } from "react";

interface Car {
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

export default function Home() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCars = async (marca?: string, modelo?: string) => {
    setLoading(true);
    setError(null);

    try {
      let url = `${process.env.NEXT_PUBLIC_API_URL}/getCars`;
      if (marca || modelo) {
        const params = new URLSearchParams();
        if (marca) params.append("marca", marca);
        if (modelo) params.append("modelo", modelo);
        url += `?${params.toString()}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Error al obtener los autos");

      const data: Car[] = await response.json();
      setAllCars(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(); // Cargar todos los autos al inicio
  }, []);

  const handleSearch = (marca: string, modelo: string) => {
    fetchCars(marca, modelo);
  };

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1;

  return (
    <main className="overflow-hidden bg-gray-50 pb-10">
      <Inicio />

      <div className="mt-16 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h2 className="text-4xl font-extrabold">Catálogo de autos</h2>
          <p>Explora y encuentra el auto de tus sueños</p>
        </div>

        <div className='home__filters'>
          <BarraBusqueda onSearch={handleSearch} />
        </div>

        {!isDataEmpty ? (
          <section>
            <div className="home__cars-wrapper">
              {allCars?.map((car) => (
                <AutoContainer key={car._id} auto={car} />
              ))}
            </div>
          </section>
        ) : (
          <div className="home__error-container">
            <h2 className="text-black text-xl font-bold">No se encontraron resultados</h2>
          </div>
        )}
      </div>
    </main>
  );
}
