"use client";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Image from 'next/image';
import { ubicaciones, telefonos } from 'constants/index';
import { useRouter } from 'next/navigation';

interface CarProps {
  car: {
    marca: string;
    modelo: string;
    anio: number;
    kilometraje: number;
    precio: number;
    descripcion: string;
    imagenes: string[];
    ubicacion: string;
    motor: string;
    caballosDeFuerza: number;
    transmision: string;
    combustible: string;
  };
  slug: string;
}

const AutoDetallesClient = ({ car, slug }: CarProps) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    router.replace(`/autos/${slug}`);
  }, [slug, router]);

  if (!isClient) return null;

  const direccion = ubicaciones[ubicacion] || "Dirección no disponible";
  const telefono = telefonos[ubicacion] || "Teléfono no disponible";

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col pt-32 px-6">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-center lg:justify-between">
          {/* Imagen del auto */}
          <div className="relative w-full max-w-4xl mx-auto aspect-video my-4">
            <Swiper
              pagination={{ type: 'fraction' }}
              navigation
              modules={[Pagination, Navigation]}
              className="my-swiper"
            >
              {imagenes.length > 0 &&
                imagenes.map((imagen, index) => {
                  const imageUrl = imagen ? `${process.env.NEXT_PUBLIC_API_URL}${imagen}` : null;
                  return (
                    imageUrl && (
                      <SwiperSlide key={index}>
                        <div
                          className="relative w-full"
                          style={{ paddingTop: '56.25%' }}
                          onClick={() => handleImageClick(index)} // Abre la imagen en el modal al hacer clic
                        >
                          <Image
                            src={imageUrl}
                            alt={modelo || 'Sin descripción'}
                            fill
                            priority
                            className="rounded-md object-cover cursor-pointer"
                          />
                        </div>
                      </SwiperSlide>
                    )
                  );
                })}
            </Swiper>

      {/* Modal para imagen agrandada */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleCloseModal} // Cierra el modal al hacer clic fuera
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()} // Evita que el clic en la imagen cierre el modal
          >
            <Swiper
              initialSlide={currentImage}
              pagination={{ type: 'fraction' }}
              navigation
              modules={[Pagination, Navigation]}
              className="my-swiper"
            >
              {imagenes.length > 0 &&
                imagenes.map((imagen, index) => {
                  const imageUrl = imagen ? `${process.env.NEXT_PUBLIC_API_URL}${imagen}` : null;
                  return (
                    imageUrl && (
                      <SwiperSlide key={index}>
                        <div className="relative w-full">
                          <Image
                            src={imageUrl}
                            alt={modelo || 'Imagen ampliada'}
                            width={1200}
                            height={800}
                            className="rounded-md object-contain select-none"
                          />
                        </div>
                      </SwiperSlide>
                    )
                  );
                })}
            </Swiper>
          </div>
        </div>
      )}
    </div>

          {/* Información del auto */}
          <div className="w-full flex flex-col items-start lg:w-1/2 lg:order-2">
            <div className="flex justify-center lg:justify-start lg:text-lg items-center gap-2 mb-1">
              <span className="text-gray-500 text-md">{anio}</span>
              <span className="text-gray-500 text-md">|</span>
              <span className="text-gray-500 text-md">{kilometraje.toLocaleString('es-UY')} km</span>
            </div>
            <h1 className="text-2xl text-black-100 font-bold mb-4 text-start lg:text-3xl">
              {marca} {modelo} - {motor}
            </h1>
            <div className="text-start text-4xl mb-8">
              <h2>US$ {precio.toLocaleString()}</h2>
            </div>
            <div className="flex flex-col items-start gap-4">
              <button className=" px-6 py-3 mb-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition flex items-center gap-3">
                <img src="/whatsapp.svg" alt="Logo WhatsApp" className="w-6 h-6 no-auto-resize" />
                <span>Contactar</span>
              </button>
              <p className="text-gray-500 mb-5 text-sm lg:text-base">
                También podés llamarnos al <strong>(+598) 2211 1732</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="text-start border-t border-gray-200 pt-8 mb-8">
          <h2 className="text-xl font-bold mb-5 lg:text-2xl">Características del auto</h2>
          <div className="lg:grid lg:grid-cols-3 lg:gap-x-3">
            {/* Primer columna */}
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
          <div className="mb-3 flex items-center gap-2 ml-[-3px] lg:text-lg">
            <img src="/location.svg" alt="Ubicación" className="w-5 h-6 no-auto-resize" />
            <strong className="whitespace-nowrap">Ubicación:</strong>
            <p className="text-sm text-gray-700 break-words lg:text-lg">{ubicacion}</p>
          </div>
          <div className="mb-3 flex items-center gap-2 ml-[-3px] lg:text-lg">
            <img src="/door.svg" alt="Dirección" className="w-5 h-6 no-auto-resize" />
            <strong className="whitespace-nowrap">Dirección:</strong>
            <p className="text-sm text-gray-700 break-words lg:text-lg">{direccion}</p>
          </div>
          <div className="mb-3 flex items-center gap-2 ml-[-3px] lg:text-xl">
            <img src="/phone.svg" alt="Dirección" className="w-5 h-6 no-auto-resize" />
            <strong className="whitespace-nowrap">Teléfono:</strong>
            <p className="text-sm text-gray-700 break-words lg:text-lg">{telefono}</p>
          </div>
          <div className="mb-3 flex items-start gap-2 ml-[-3px] lg:text-lg">
            <img src="/clock.svg" alt="Horarios" className="w-5 h-6 no-auto-resize" />
            <div>
              <strong className="block pb-1">Horarios de atención:</strong>
              <p className="text-sm text-gray-700 break-words lg:text-lg">
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

export default AutoDetallesClient;
