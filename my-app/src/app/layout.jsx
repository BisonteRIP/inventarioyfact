import { Inter } from "next/font/google";
import "./globals.css";
import MenuBar from "@/components/MenuBar";


const inter = Inter({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Cuatro Cuatros",
  description: "sistema de facturacion y gestion de clientes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to purple-50">
          <div className="container mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Cuatro Catros</h1>
              <p className="text-gray-600">Sistema de Inventario y Facturacion</p>
            </div>
            <MenuBar>
              
            </MenuBar>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
