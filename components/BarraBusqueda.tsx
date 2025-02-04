"use client";

import React, { useState } from "react";
import { BuscarMarca } from "./";
import Image from "next/image";

const BotonBusqueda = ({ otrasClases }: { otrasClases: string }) => (
  <button type="submit" className={otrasClases}>
    <Image
      src="/magnifying-glass.svg"
      alt="magnifying glass"
      width={30}
      height={30}
      className="object-contain text-gray-700 no-auto-resize ml-4"
    />
  </button>
);

const BarraBusqueda = ({ onSearch }: { onSearch: (marca: string, modelo: string) => void }) => {
  const [marca, definirMarca] = useState("");
  const [modelo, definirModelo] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Marca:", marca, "Modelo:", modelo); 
    if (marca.trim() === "" && modelo.trim() === "") {
      alert("Ingresa al menos una marca o un modelo");
      return;
    }

    onSearch(marca.trim().toLowerCase(), modelo.trim().toLowerCase());
  };

  return (
    <form className="searchbar" onSubmit={handleSearch}>
      <div className="searchbar__item">
        <BuscarMarca marca={marca} definirMarca={definirMarca} />
        <BotonBusqueda otrasClases="sm:hidden" />
      </div>
      <div className="searchbar__item">
        <Image
          src="/model-icon.png"
          alt="car model"
          width={25}
          height={25}
          className="absolute w-[20px] h-[20px] ml-4 no-auto-resize"
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

export default BarraBusqueda;
