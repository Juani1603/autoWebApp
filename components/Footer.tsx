import Image from "next/image";
import Link from "next/link";
import { footerLinks } from "../constants";
import { link } from "fs";

const Footer = () => {
  return (
    <footer className="flex flex-col text-black-100 border-t border-gray-200 pt-4 bg-gray-50">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 ">
        <div className="flex flex-col justify-start items-start ">
          <Image src="/logo-black.svg" alt="Amaya Logo Blanco" width={150} height={18} className="object-contain no-auto-resize" />
          <p className="text-gray-700">Amaya Motors 2024<br />Todos los derechos reservados &copy;</p>
        </div>

        <div className="footer__links">
          {footerLinks.map((link) => (
            <div key={link.title} className="footer__link">
              <h3 className="font-bold">{link.title}</h3>
              {link.links.map((item) => (
                <Link key={item.title} href={item.url} className="text-gray-500">{item.title}</Link>
              ))}
            </div>
          ))}
        </div>

      </div>
    </footer>
  )
}

export default Footer