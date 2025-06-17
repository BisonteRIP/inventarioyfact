import { openDb } from "@/lib/database";

export async function GET() {
  try {
    const db = await openDb();
    const clientes = await db.all("SELECT * FROM clientes ORDER BY fecha_registro DESC");
    return Response.json(clientes);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const db = await openDb();

    // Generar un ID personalizado tipo CLI001, CLI002, etc.
    const last = await db.get("SELECT id FROM clientes ORDER BY fecha_registro DESC LIMIT 1");
    let nextNumber = 1;
    if (last && last.id) {
      const match = last.id.match(/^CLI(\d+)$/);
      if (match) nextNumber = parseInt(match[1], 10) + 1;
    }
    const newId = `CLI${String(nextNumber).padStart(3, '0')}`;

    await db.run(
      `INSERT INTO clientes (id, nombre, email, telefono, direccion) VALUES (?, ?, ?, ?, ?)`,
      newId,
      data.nombre,
      data.email,
      data.telefono,
      data.direccion
    );

    // Devuelve el cliente recién creado
    const cliente = await db.get("SELECT * FROM clientes WHERE id = ?", newId);
    return Response.json(cliente);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
