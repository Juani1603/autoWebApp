"use client"

import { useState, Fragment } from 'react'
import Image from 'next/image'
import { Combobox, Transition } from '@headlessui/react'
import { BuscarMarcaProps } from 'types'
import { marcas } from '../constants'
import React from 'react'

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
              className="ml-4"
              alt="Car Logo"
            />
          </Combobox.Button>

          <Combobox.Input
            className="search-manufacturer__input"
            placeholder="Ingrese una marca"
            displayValue={(marca: string) => marca}
            onChange={(event) => setQuery(event.target.value)}
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options>
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
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item}
                      </span>
                    </>
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
