"use client";

import { useState, Fragment } from "react";
import Image from "next/image";
import { Combobox, Transition } from "@headlessui/react";
import { BuscarMarcaProps } from "types";
import { marcas } from "../constants";
import React from "react";

const BuscarMarca = ({ marca, definirMarca, customClass }: BuscarMarcaProps & { customClass?: string }) => {
  const [query, setQuery] = useState("");

  const marcasFiltradas = query === ""
    ? marcas
    : marcas.filter((item) =>
        item.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, ""))
      );

  return (
    <div className={`search-manufacturer ${customClass}`}>
      <Combobox value={marca} onChange={definirMarca}>
        <div className="relative w-full">
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4 no-auto-resize"
              alt="Car Logo"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Ingrese una marca"
            displayValue={(marca: string) => marca}
            onChange={(event) => {
              setQuery(event.target.value);
              definirMarca(event.target.value); // ← permite búsquedas libres
            }}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-72 overflow-y-auto">
              
              {query === "" && (
                <Combobox.Option value="">
                  <span className="block truncate text-gray-500 italic px-4 py-2">
                    Todas las marcas
                  </span>
                </Combobox.Option>
              )}

              {marcasFiltradas.map((item) => (
                <Combobox.Option
                  key={item}
                  className={({ active }) =>
                    `relative search-manufacturer__option ${
                      active ? "bg-primary-blue text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item}
                    </span>
                  )}
                </Combobox.Option>
              ))}

            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default BuscarMarca;
