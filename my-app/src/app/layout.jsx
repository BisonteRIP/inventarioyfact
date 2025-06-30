
import "./styles/globals.css";
import MenuBar from "@/components/MenuBar";



export const metadata = {
  title: "Cuatro Cuatros",
  description: "sistema de facturacion y gestion de clientes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <div className="min-h-screen bg-[#F6f6f6]">
          <div className="container mx-auto p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Cuatro Catros</h1>
              <p className="text-gray-600">Sistema de Inventario / Facturacion</p>
            </div>
            <MenuBar />
          </div>
        </div>
        
      </body>
    </html>
  );
}
