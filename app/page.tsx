"use client";

import { Inicio, BarraBusqueda, FiltroCustom, AutoContainer } from "components";
import { useState, useEffect } from 'react';

interface Car {
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

export default function Home() {
  const [allCars, setAllCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getCars`);
        if (!response.ok) throw new Error('Error al obtener los autos');

        const data: Car[] = await response.json();
        setAllCars(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);


  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Inicio />

      <div className="mt-16 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h2 className="text-4xl font-extrabold">Catálogo de autos</h2>
          <p>Explora y encuentra el auto de tus sueños</p>
        </div>

        <div className='home__filters'>
          <BarraBusqueda />
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
        )
        }
      </div>
    </main>
  );
}
