"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";
import { motion } from "framer-motion";

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
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="hero__title text-white text-center"
                >
                    Cuidamos cada detalle, para que tú solo disfrutes el camino.
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                    className="hero__subtitle text-white text-center"
                >
                    El auto perfecto, con la confianza que merecés.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
                    className="w-full flex justify-center"
                >
                    <CustomButton
                        title="Explora nuestros autos"
                        containerStyles="bg-transparent border-2 border-white text-white mt-10 px-6 py-2 rounded hover:bg-white hover:text-black transition ease-in duration-300"
                        handleClick={handleScroll}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default Inicio;
