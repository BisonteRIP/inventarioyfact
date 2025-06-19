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

export async function PUT(req, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const data = await req.json();
    const db = await openDb();
    await db.run(
      `UPDATE inventario SET producto = ?, descripcion = ?, categoria = ?, precio = ?, stock = ?, estado = ? WHERE id = ?`,
      data.producto,
      data.descripcion,
      data.categoria,
      data.precio,
      data.stock,
      data.estado,
      id
    );
    const updated = await db.get("SELECT * FROM inventario WHERE id = ?", id);
    return Response.json(updated);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
