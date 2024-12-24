import dbConnect from 'app/utils/db';
import CarModel from 'app/models/Car';
import { ObjectId } from 'mongodb';
import { Metadata } from 'next';
import Image from 'next/image';
import { ubicaciones } from 'constants/index';
import { telefonos } from 'constants/index';


// Props del componente de detalles del auto
interface AutoDetallesProps {
  params: {
    autoId: string; // El autoId recibido en la URL
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

  // Buscar el auto por su ID de MongoDB sin lean()
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
    imagen,
    ubicacion,
    motor,
    caballosDeFuerza,
    transmision,
    combustible
  } = car;


  const direccion = ubicaciones[ubicacion] || "Dirección no disponible";
  const telefono =  telefonos[ubicacion] || "Teléfono no disponible";

  // Crear el slug con el formato marca-modelo-año
  const slug = `${marca.toLowerCase()}-${modelo.toLowerCase()}-${anio}`;

  return (
    <div className="min-h-screen flex flex-col pt-32 px-6">
      <div className="w-full max-w-7xl">
        {/* Información superior */}
        <div className="flex justify-start items-center gap-2 mb-1">
          <span className="text-gray-500 text-md">{anio}</span>
          <span className="text-gray-500 text-md">|</span>
          <span className="text-gray-500 text-md">{kilometraje.toLocaleString('es-UY')} km</span>
        </div>

        {/* Título */}
        <h1 className="text-2xl font-bold mb-4 text-start">
          {marca} {modelo} - {motor}
        </h1>

        {/* Imagen */}
        <div className="w-full flex justify-center mb-6">
          <Image
            src={imagen}
            alt={modelo}
            width={800}
            height={600}
            className="object-contain rounded-lg w-full"
          />
        </div>
        <div className='text-start text-4xl mb-8'>
          <h2>
            US$ {precio.toLocaleString()}
          </h2>
        </div>

        <div className="flex flex-col items-center gap-4 mt-7">
          <button className="px-6 py-3 mb-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition flex items-center gap-3">
            <img src="/whatsapp.svg" alt="Logo WhatsApp" className="w-6 h-6" />
            <span>Contactar</span>
          </button>
          <p className="text-gray-500 text-sm mb-12">También podés llamarnos al <strong>(+598) 2211 1732</strong></p>
        </div>

        {/* Características */}
        <div className="text-start border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-bold mb-5">Características del auto</h2>

          <div className="mb-2 flex items-center gap-2">
            <img src="/car.svg" alt="Auto" className="w-5 h-6" />
            <strong>Modelo:</strong> <p className='text-gray-700'>{marca} {modelo}</p>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <img src="/drive.svg" alt="Kilometraje" className="w-5 h-6" />
            <strong>Kilómetros:</strong> <p className='text-gray-700'>{kilometraje.toLocaleString('es-UY')} km</p>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <img src="/engine.svg" alt="Motor" className="w-5 h-6" />
            <strong>Motor:</strong> <p className='text-gray-700'>{motor}</p>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <img src="/hp.svg" alt="Motor" className="w-5 h-6" />
            <strong>Potencia:</strong> <p className='text-gray-700'>{caballosDeFuerza} cv</p>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <img src="/transmission.svg" alt="Transmisión" className="w-5 h-6" />
            <strong>Transmisión:</strong> <p className='text-gray-700'>{transmision}</p>
          </div>

          <div className="mb-2 flex items-center gap-2">
            <img src="/gas.svg" alt="Combustible" className="w-5 h-6" />
            <strong>Combustible:</strong> <p className='text-gray-700'>{combustible}</p>
          </div>
        </div>

        {/* Descripción */}
        <div className="text-start border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-bold mb-5">Descripción</h2>
          <p className='text-gray-700'>{descripcion}</p>
        </div>

        {/* Información */}
        <div className="text-start border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-bold mb-5">Información</h2>

          <div className="mb-3 flex items-center gap-2 ml-[-3px]">
            <img src="/location.svg" alt="Ubicación" className="w-5 h-6" />
            <strong className="whitespace-nowrap">Ubicación:</strong>
            <p className="text-sm text-gray-700 break-words">{ubicacion}</p>
          </div>

          <div className="mb-3 flex items-center gap-2 ml-[-3px]">
            <img src="/door.svg" alt="Dirección" className="w-5 h-6" />
            <strong className="whitespace-nowrap">Dirección:</strong>
            <p className="text-sm text-gray-700 break-words">{direccion}</p>
          </div>

          <div className="mb-3 flex items-center gap-2 ml-[-3px]">
            <img src="/phone.svg" alt="Dirección" className="w-5 h-6" />
            <strong className="whitespace-nowrap">Teléfono:</strong>
            <p className="text-sm text-gray-700 break-words">{telefono}</p>
          </div>
          
          <div className="mb-3 flex items-start gap-2 ml-[-3px]">
            <img src="/clock.svg" alt="Horarios" className="w-5 h-6" />
            <div>
              <strong className="block pb-1">Horarios de atención:</strong>
              <p className="text-sm text-gray-700 break-words">
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