"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { BuscarMarca } from "./";
import Image from "next/image";

const BotonBusqueda = ({ otrasClases }: { otrasClases: string }) => (
    <button type="submit" className={`-ml-3 z-10 ${otrasClases}`}>
        <Image
            src="/magnifying-glass.svg"
            alt="magnifying glass"
            width={40}
            height={40}
            className="object-contain text-gray-700"
        />
    </button>
);
const BarraBusqueda = () => {
    const [marca, definirMarca] = useState("");
    const [modelo, definirModelo] = useState("");

    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (marca.trim() === "" && modelo.trim() === "") {
            return alert("Ingresa una marca y un modelo");
        };

        actualizarParametros(modelo.toLocaleLowerCase(), marca.toLocaleLowerCase());
    };

    const actualizarParametros = (modelo: string, marca: string) => {
        const buscarParametros = new URLSearchParams(window.location.search);

        if (modelo) {
            buscarParametros.set("modelo", modelo);
        } else {
            buscarParametros.delete("modelo");
        }

        if (marca) {
            buscarParametros.set("marca", marca);
        } else {
            buscarParametros.delete("marca");
        };

        const newPathname = `${window.location.pathname}?${buscarParametros.toString()}`;

        router.push(newPathname);
    };

    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__item">
                <BuscarMarca
                    marca={marca}
                    definirMarca={definirMarca}
                />
                <BotonBusqueda otrasClases="sm:hidden" />
            </div>
            <div className="searchbar__item">
                <Image
                    src="/model-icon.png"
                    alt="car model"
                    width={25}
                    height={25}
                    className="absolute w-[20px] h-[20px] ml-4"
                />
                <input
                    type="text"
                    name="modelo"
                    value={modelo}
                    onChange={(e) => definirModelo(e.target.value)}
                    placeholder="Modelo"
                    className="searchbar__input"
                />
                <BotonBusqueda otrasClases="sm:hidden" />
            </div>
            <BotonBusqueda otrasClases="max-sm:hidden" />
        </form>
    );
};

export default BarraBusqueda