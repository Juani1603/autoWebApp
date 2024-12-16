import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center pt-0 sm:px-16 px-6 py-4">
        {/* Contenedor para agrupar los logos */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image src="/logo-white.svg" alt="Amaya Logo Blanco" width={150} height={0} className="object-contain" />
          </Link>
          <p className="text-white text-4xl font-extralight">|</p>
          <Image src="/peugeot-logo.svg" alt="Logo Peugeot" width={60} height={0} />
        </div>
        {/* Icono del usuario */}
        <Link href="/">
          <Image src="/user.svg" alt="User Icon" width={30} height={0} className="object-contain" />
        </Link>
      </nav>
    </header>

  )
}

export default Navbar