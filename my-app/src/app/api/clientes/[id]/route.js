import { openDb } from "@/lib/database";

export async function PUT(req, { params }) {
  try {
    const id = params.id;
    const data = await req.json();
    const db = await openDb();
    await db.run(
      `UPDATE clientes SET nombre = ?, email = ?, telefono = ?, direccion = ? WHERE id = ?`,
      data.nombre,
      data.email,
      data.telefono,
      data.direccion,
      id
    );
    // Devuelve el cliente actualizado
    const updated = await db.get("SELECT * FROM clientes WHERE id = ?", id);
    return Response.json(updated);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}