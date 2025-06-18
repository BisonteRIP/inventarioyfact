import { openDb } from "@/lib/database";

export async function GET() {
  try {
    const db = await openDb();
    const productos = await db.all("SELECT * FROM inventario ORDER BY rowid DESC");
    return Response.json(productos);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const db = await openDb();

    // Generar un ID personalizado tipo INV001, INV002, etc.
    const last = await db.get("SELECT id FROM inventario ORDER BY rowid DESC LIMIT 1");
    let nextNumber = 1;
    if (last && last.id) {
      const match = last.id.match(/^INV(\d+)$/);
      if (match) nextNumber = parseInt(match[1], 10) + 1;
    }
    const newId = `INV${String(nextNumber).padStart(3, '0')}`;

    await db.run(
      `INSERT INTO inventario (id, producto, descripcion, categoria, precio, stock, estado) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      newId,
      data.producto,
      data.descripcion,
      data.categoria,
      data.precio,
      data.stock,
      data.estado || "Disponible"
    );

    // Devuelve el producto recién creado
    const producto = await db.get("SELECT * FROM inventario WHERE id = ?", newId);
    return Response.json(producto);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
