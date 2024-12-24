import { MouseEventHandler } from "react";

export interface CustomButtonProps {
    title: string;
    containerStyles?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    btnType?: "button" | "submit";
    textStyles?: string;
    rightIcon?: string;
    isDisabled?: boolean;
}

export interface BuscarMarcaProps {
    marca: string;
    definirMarca: (marca : string) => void;
}

export interface AutoProps {
    marca: string;
    modelo: string;
    anio: number;
    kilometraje: number;
    precio: number;
    imagen: string;
    ubicacion: string;
    _id: string;
    motor: string; 
    caballosDeFuerza: number; 
    transmision: string; 
    combustible: string;
    descripcion: string; 
  }
