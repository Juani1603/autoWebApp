"use client";

import { useState } from 'react';
import Image from 'next/image';
import { AutoProps } from 'types';
import { CustomButton, AutoDetalles } from 'components';

interface AutoContainerProps {
    auto: AutoProps;
}
const AutoContainer = ({ auto }: AutoContainerProps) => {
    const { marca, modelo, anio, kilometraje, precio, imagen, ubicacion } = auto;
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='car-card group'>
            <div className='car-card__content'>
                <h2 className='car-card__content-title'>
                    {marca} {modelo}
                </h2>
            </div>
            <p className='flex mt-3 text-[34px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold'>
                    {anio}
                </span>
            </p>

            <h3 className='flex mt-6 text-[24px] font-extrabold'>
                ${new Intl.NumberFormat('es-UR', { style: 'decimal', minimumFractionDigits: 0 }).format(precio)}
            </h3>

            <div className='relative w-full h-40 my-3 object-contain'>
                <Image src={imagen} alt={modelo} fill priority className='w-full object-contain' />

            </div>

            <div className='relative flex w-full mt-2'>
                <div className='flex group-hover:invisible w-full justify-between text-gray'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src={"/steering-wheel.svg"} width={20} height={20} alt="steering wheel" />
                        <p className='text-[14px]'>{kilometraje.toLocaleString() + " km"}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src={"/gas.svg"} width={20} height={20} alt="gas" />
                        <p className='text-[14px]'>{precio}</p>
                    </div>
                    {/* <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src={"/steering-wheel.svg"} width={20} height={20} alt="gas" />
                        <p className='text-[14px]'></p>
                    </div> */}
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src={"/steering-wheel.svg"} width={20} height={20} alt="gas" />
                        <p className='text-[14px]'>{ubicacion}</p>
                    </div>
                </div>

                <div className='car-card__btn-container'>
                    <CustomButton
                        title='Ver detalles'
                        containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                        textStyles="text-white text-[14px] leading-[17px] font-bold"
                        rightIcon="/right-arrow.svg"
                        handleClick={() => setIsOpen(true)}
                    />
                </div>
            </div>
            <AutoDetalles isOpen={isOpen} closeModal={() => setIsOpen(false)} auto={auto} />
        </div>
    )
}

export default AutoContainer