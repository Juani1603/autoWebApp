"use client";

import { useRouter } from 'next/navigation';
import { AutoProps } from 'types';
import Image from 'next/image';
import { CustomButton } from 'components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';

interface AutoContainerProps {
    auto: AutoProps;
}

const AutoContainer = ({ auto }: AutoContainerProps) => {
    const { _id, marca, modelo, anio, kilometraje, precio, imagenes } = auto;
    const router = useRouter();

    const handleViewDetails = () => {
        // Crear el slug con la marca, modelo, año y los primeros 5 caracteres del ID
        const slug = `${marca.toLowerCase().replace(/\s+/g, '-')}-${modelo.toLowerCase().replace(/\s+/g, '-')}-${anio}-${_id.toString().slice(0, 5)}`;
        // Usamos el slug para la navegación
        router.push(`/autos/${slug}`);
    };


    return (
        <div className='car-card group cursor-pointer'>
            <div className='car-card__content'>
                <h2 className='car-card__content-title'>
                    {marca} {modelo}
                </h2>
            </div>
            <p className='flex mt-3 text-[34px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold'>
                    {anio} | {kilometraje.toLocaleString() + " km"}
                </span>
            </p>

            <h3 className='flex mt-4 text-[24px] font-extrabold'>
                ${new Intl.NumberFormat('es-UR', { style: 'decimal', minimumFractionDigits: 0 }).format(precio)}
            </h3>

            <div className="relative w-full aspect-video my-2">
                <Swiper  modules={[Navigation]} className="my-swiper">
                    {imagenes.length > 0 &&
                        imagenes.map((imagen, index) => {
                            const imageUrl = imagen ? `${process.env.NEXT_PUBLIC_API_URL}${imagen}` : null;
                            return (
                                imageUrl && (
                                    <SwiperSlide
                                        key={index}
                                    >
                                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                                            <Image
                                                src={imageUrl}
                                                alt={modelo || 'Sin descripción'}
                                                fill
                                                priority
                                                className="rounded-md object-cover"
                                            />
                                        </div>
                                    </SwiperSlide>
                                )
                            );
                        })}
                </Swiper>
            </div>


            <div className='relative flex w-full mt-2'>
                <div className='car-card__btn-container'>
                    <CustomButton
                        title='Ver detalles'
                        containerStyles='w-full py-[12px] mb-[10px] rounded-full bg-primary-blue'
                        textStyles="text-white text-[14px] leading-[10px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={handleViewDetails}
                    />
                </div>
            </div>
        </div>
    );
};

export default AutoContainer;
