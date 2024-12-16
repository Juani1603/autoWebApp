"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";


const Inicio = () => {
    const handleScroll = () => {

    }
    return (
        <div className="relative h-screen w-full">

            <Image
                src="/back8.png"
                alt="Auto en movimiento"
                layout="fill"
                objectFit="cover"
                className="-z-10 absolute inset-0"
            />


            <div className="hero flex-col items-start justify-start flex-1 pt-36 padding-x z-10 gap-5 xl:flex-col">
                <h1 className="hero__title text-white">
                    Cuidamos cada detalle, para que tú solo disfrutes el camino.
                </h1>
                <p className="hero__subtitle text-white text-center">
                    El auto perfecto, con la confianza que merecés.
                </p>
                <CustomButton
                    title="Explora nuestros autos"
                    containerStyles="bg-transparent border-2 border-white text-white mt-10 w-auto"
                    handleClick={handleScroll}
                />
            </div>

        </div>

    )
}

export default Inicio