import type { Metadata } from "next";

import "./globals.css";
import { Footer, Navbar } from "components";

export const metadata: Metadata = {
  title: "AutoWebApp",
  description: "Descubre tu próximo auto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className="relative">
          <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
