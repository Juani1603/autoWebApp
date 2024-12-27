"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";  

const Navbar = () => {
  const pathname = usePathname(); 

  // Cambia el color de fondo dependiendo de la ruta
  const isAutoPage = pathname?.includes("/autos/");
  const isLoginPage = pathname?.includes("/login");
  const isDashboardPage = pathname?.includes("/dashboard");

  return (
    <header className={`w-full absolute z-10 ${isAutoPage || isLoginPage || isDashboardPage ? 'bg-black' : ''}`}>
      <nav className={`max-w-[1440px] max-h-[100px] mx-auto flex justify-between items-center pt-2 sm:px-16 px-6 py-4}`}>
        {/* Contenedor para agrupar los logos */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image src="/logo-white.svg" alt="Amaya Logo Blanco" width={150} height={50} className="object-contain no-auto-resize" />
          </Link>
          <p className="text-white text-4xl font-extralight">|</p>
          <Image src="/peugeot-logo.svg" alt="Logo Peugeot" priority width={60} height={0} className="object-contain no-auto-resize"/>
        </div>
        {/* Icono del usuario */}
        <Link href="/login">
          <Image src="/user.svg" alt="User Icon" width={30} height={30} className="object-contain no-auto-resize" />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
