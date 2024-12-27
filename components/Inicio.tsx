"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";


const Inicio = () => {
    const handleScroll = () => {
        const nextSection = document.getElementById("discover");

        if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="relative w-full h-screen">

            <Image
                src="/back8.webp"
                alt="Auto en movimiento"
                fill
                style={{ objectFit: 'cover' }}
                className="z-1 absolute inset-0"
            />


            <div className="hero h-screen flex flex-col items-center justify-center flex-1 pt-10 mb-10 px-6 z-10 gap-5 z-2 xl:flex-col">
                <h1 className="hero__title text-white text-center">
                    Cuidamos cada detalle, para que tú solo disfrutes el camino.
                </h1>
                <p className="hero__subtitle text-white text-center">
                    El auto perfecto, con la confianza que merecés.
                </p>
                <CustomButton
                    title="Explora nuestros autos"
                    containerStyles="bg-transparent border-2 border-white text-white mt-10  px-6 py-2 rounded"
                    handleClick={handleScroll}
                />
            </div>

        </div>

    )
}

export default Inicio