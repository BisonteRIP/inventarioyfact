import { openDb } from "@/lib/database";

export async function GET(_req, { params }) {
  try {
    const nombre = decodeURIComponent(params.nombre);
    const db = await openDb();
    const productos = await db.all(
      "SELECT * FROM inventario WHERE producto = ? ORDER BY fecha_agregado DESC",
      nombre
    );
    return Response.json(productos);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}