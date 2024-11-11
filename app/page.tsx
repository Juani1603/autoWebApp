import { Inicio, BarraBusqueda, FiltroCustom } from "@/components";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Inicio />

      <div className="mt-12 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h2 className="text-4xl font-extrabold">Catálogo de autos</h2>
          <p>Explora y encuentra el auto de tus sueños</p>
        </div>

        <div className="home__filters">
          <BarraBusqueda />
          <div className="home__filter-container">
            <FiltroCustom title="combustible"/>
            <FiltroCustom title="año"/>
          </div>
        </div>
      </div>
    </main>
  );
}
