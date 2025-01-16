import dbConnect from 'app/utils/db';
import CarModel from 'app/models/Car';
import { ObjectId } from 'mongodb';
import { Metadata } from 'next';
import Image from 'next/image';
import { ubicaciones } from 'constants/index';
import { telefonos } from 'constants/index';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

interface AutoDetallesProps {
  params: {
    autoId: string;
  };
}

export async function generateMetadata({ params }: AutoDetallesProps): Promise<Metadata> {
  const { autoId } = await params;

  await dbConnect();

  // Validamos si autoId tiene el formato correcto de ObjectId (24 caracteres hexadecimales)
  if (!ObjectId.isValid(autoId)) {
    return {
      title: 'Auto no encontrado',
      description: 'ID del auto no válido.',
    };
  }

  const objectId = new ObjectId(autoId);

  // Buscar el auto por su ID de MongoDB
  const car = await CarModel.findOne({ _id: objectId });

  if (!car) {
    return {
      title: 'Auto no encontrado',
      description: 'No se encontró información sobre el auto.',
    };
  }

  // Crear el slug con el formato marca-modelo-año
  const slug = `${car.marca.toLowerCase()}-${car.modelo.toLowerCase()}-${car.anio}`;

  return {
    title: `Detalles del auto: ${car.marca} ${car.modelo} ${car.anio}`,
    description: `Conoce más sobre el auto ${car.marca} ${car.modelo} ${car.anio}.`,
  };
}

const AutoDetalles = async ({ params }: AutoDetallesProps) => {
  const { autoId } = await params;

  if (!ObjectId.isValid(autoId)) {
    return <div className="p-6">ID del auto no válido.</div>;
  }

  const objectId = new ObjectId(autoId);

  await dbConnect();

  const car = await CarModel.findOne({ _id: objectId });

  if (!car) {
    return <div className="p-6">Auto no encontrado</div>;
  }


  const {
    marca,
    modelo,
    anio,
    kilometraje,
    precio,
    descripcion,
    imagenes,
    ubicacion,
    motor,
    caballosDeFuerza,
    transmision,
    combustible
  } = car;


  const direccion = ubicaciones[ubicacion] || "Dirección no disponible";
  const telefono = telefonos[ubicacion] || "Teléfono no disponible";

  // Crear el slug con el formato marca-modelo-año
  const slug = `${marca.toLowerCase()}-${modelo.toLowerCase()}-${anio}`;

  return (
    <div className="min-h-screen flex flex-col pt-32 px-6">
      <div className="w-full max-w-7xl mx-auto">
        {/* Contenedor principal con control de orden en diferentes tamaños */}
        <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-center lg:justify-between">

          {/* Imagen del auto*/}
          <div className="w-auto flex justify-center mb-6 lg:mb-8 lg:w-1/2 lg:order-1">
            <Image
              src={imagenes}
              alt={modelo}
              width={800}
              height={600}
              className="object-contain rounded-lg w-full h-auto lg:w-auto"
            />
          </div>

          {/* Información (km, año, marca, modelo, precio y botón) */}
          <div className="w-full flex flex-col items-start lg:w-1/2 lg:order-2">

            {/* Información superior (km y año) */}
            <div className=" flex justify-center lg:justify-start lg:text-lg items-center gap-2 mb-1">
              <span className="text-gray-500 text-md">{anio}</span>
              <span className="text-gray-500 text-md">|</span>
              <span className="text-gray-500 text-md">
                {kilometraje.toLocaleString('es-UY')} km
              </span>
            </div>

            {/* Título*/}
            <h1 className="text-2xl font-bold mb-4 text-start lg:text-3xl">
              {marca} {modelo} - {motor}
            </h1>

            {/* Precio */}
            <div className="text-start text-4xl mb-8">
              <h2>US$ {precio.toLocaleString()}</h2>
            </div>

            {/* Botón de WhatsApp */}
            <div className="flex flex-col items-start gap-4">
              <button className="px-6 py-3 mb-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition flex items-center gap-3">
                <img src="/whatsapp.svg" alt="Logo WhatsApp" className="w-6 h-6 no-auto-resize" />
                <span>Contactar</span>
              </button>
              <p className="text-gray-500 text-sm lg:text-base">
                También podés llamarnos al <strong>(+598) 2211 1732</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="text-start border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-bold mb-5 lg:text-2xl">Características del auto</h2>

          {/* Contenedor de tres columnas */}
          <div className="lg:grid lg:grid-cols-3 lg:gap-x-3">
            {/* Primera columna */}
            <div className="mb-2 flex flex-col gap-y-4 lg:text-lg">
              <div className="flex items-center gap-2">
                <img src="/car.svg" alt="Auto" className="w-5 h-6 no-auto-resize" />
                <strong>Modelo:</strong>
                <p className="text-gray-700">{marca} {modelo}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="/drive.svg" alt="Kilometraje" className="w-5 h-6 no-auto-resize" />
                <strong>Kilómetros:</strong>
                <p className="text-gray-700">{kilometraje.toLocaleString('es-UY')} km</p>
              </div>
            </div>

            {/* Segunda columna */}
            <div className="mb-2 flex flex-col gap-y-4 lg:text-lg">
              <div className="flex items-center gap-2">
                <img src="/engine.svg" alt="Motor" className="w-5 h-6 no-auto-resize" />
                <strong>Motor:</strong>
                <p className="text-gray-700">{motor}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="/hp.svg" alt="Motor" className="w-5 h-6 no-auto-resize" />
                <strong>Potencia:</strong>
                <p className="text-gray-700">{caballosDeFuerza} cv</p>
              </div>
            </div>

            {/* Tercera columna */}
            <div className="mb-2 flex flex-col gap-y-4 lg:text-lg">
              <div className="flex items-center gap-2">
                <img src="/transmission.svg" alt="Transmisión" className="w-5 h-6 no-auto-resize" />
                <strong>Transmisión:</strong>
                <p className="text-gray-700">{transmision}</p>
              </div>
              <div className="flex items-center gap-2">
                <img src="/gas.svg" alt="Combustible" className="w-5 h-6 no-auto-resize" />
                <strong>Combustible:</strong>
                <p className="text-gray-700">{combustible}</p>
              </div>
            </div>
          </div>
        </div>


        {/* Descripción */}
        <div className="text-start border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-bold mb-5 lg:text-2xl">Descripción</h2>
          <p className="text-gray-700 whitespace-pre-line lg:text-xl">{descripcion}</p>
        </div>

        {/* Información */}
        <div className="text-start border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-bold mb-5 lg:text-2xl">Información</h2>
          <div className="mb-3 flex items-center gap-2 ml-[-3px] lg:text-xl">
            <img src="/location.svg" alt="Ubicación" className="w-5 h-6 no-auto-resize" />
            <strong className="whitespace-nowrap">Ubicación:</strong>
            <p className="text-sm text-gray-700 break-words lg:text-xl">{ubicacion}</p>
          </div>
          <div className="mb-3 flex items-center gap-2 ml-[-3px] lg:text-xl">
            <img src="/door.svg" alt="Dirección" className="w-5 h-6 no-auto-resize" />
            <strong className="whitespace-nowrap">Dirección:</strong>
            <p className="text-sm text-gray-700 break-words lg:text-xl">{direccion}</p>
          </div>
          <div className="mb-3 flex items-center gap-2 ml-[-3px] lg:text-xl">
            <img src="/phone.svg" alt="Dirección" className="w-5 h-6 no-auto-resize" />
            <strong className="whitespace-nowrap">Teléfono:</strong>
            <p className="text-sm text-gray-700 break-words lg:text-xl">{telefono}</p>
          </div>
          <div className="mb-3 flex items-start gap-2 ml-[-3px] lg:text-xl">
            <img src="/clock.svg" alt="Horarios" className="w-5 h-6 no-auto-resize" />
            <div>
              <strong className="block pb-1">Horarios de atención:</strong>
              <p className="text-sm text-gray-700 break-words lg:text-xl">
                Lunes a viernes - 8:00 a 18:00 <br />
                Sábados - 9:00 a 13:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default AutoDetalles;