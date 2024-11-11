"use client"
import { useState } from "react";
import { BuscarMarca } from "./";

const BarraBusqueda = () => {
    const [marca, definirMarca] = useState("");
    const handleSearch = () => { }
    return (
        <form className="searchbar" onSubmit={handleSearch}>
            <div className="searchbar__items">
                <BuscarMarca 
                marca={marca}
                definirMarca={definirMarca}
                />
            </div>
        </form>
    )
}

export default BarraBusqueda