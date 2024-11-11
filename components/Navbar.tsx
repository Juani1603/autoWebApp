import Link from "next/link";
import Image from "next/image";
import CustomButton from "./CustomButton";

const Navbar = () => {
  return (
    <header className="w-full absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center pt-0 sm:px-16 px-6 py-4">
      <Link href="/" className="flex justify-center items-center">
        <Image src="/logo-white.svg" alt="Amaya Logo Blanco" width={150} height={0} className="object-contain" />
      </Link>
      <CustomButton 
        title="Ingresar"
        btnType="button"
        containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
        />
        </nav>
    </header>
  )
}

export default Navbar