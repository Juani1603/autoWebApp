"use client";

import { useRouter } from 'next/navigation';
import { AutoProps } from 'types';
import Image from 'next/image';
import { CustomButton } from 'components';

interface AutoContainerProps {
    auto: AutoProps; 
}

const AutoContainer = ({ auto }: AutoContainerProps) => {
    const { _id, marca, modelo, anio, kilometraje, precio, imagen } = auto; 
    const router = useRouter();

    const handleViewDetails = () => {
        // Usamos el _id de MongoDB para la navegación
        router.push(`/autos/${_id}`);
    };

    return (
        <div className='car-card group'>
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

            <div className='relative w-full h-40 my-3 object-contain'>
                <Image src={imagen} alt={modelo} fill priority className='w-full  rounded-lg' />
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