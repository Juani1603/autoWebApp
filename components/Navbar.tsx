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
    <header className={`w-full absolute z-10 ${isAutoPage || isLoginPage || isDashboardPage ? 'bg-zinc-900' : ''}`}>
      <nav className={`max-w-[1440px] max-h-[100px] mx-auto flex justify-between items-center pt-2 sm:px-16 px-6 py-4}`}>
        {/* Contenedor para agrupar los logos */}
        <div className="flex items-center gap-7">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo_blanco.svg"
              alt="Logo Automotora"
              width={250}
              height={150}
              priority
              className="object-contain no-auto-resize min-w-[200px]"
              style={{ minWidth: "80px" }}
            />
          </Link>
          <p className="text-white text-4xl font-extralight">|</p>
          <Image src="/peugeot-logo.svg" alt="Logo Peugeot" priority width={60} height={60} className="object-contain no-auto-resize ml-4 min-w-[40px]" />
        </div>
        {/* Icono del usuario */}
        <Link href="/login">
          <Image src="/user.svg" alt="User Icon" width={35} height={35} className="object-contain no-auto-resize ml-4" />
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
