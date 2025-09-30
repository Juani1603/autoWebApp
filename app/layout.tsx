import type { Metadata } from "next";
import Head from "next/head";

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
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className="relative">
          <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
