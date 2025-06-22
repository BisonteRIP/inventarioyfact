import { openDb } from "@/lib/database";

export async function GET() {
  try {
    const db = await openDb();
    // Trae facturas y sus items
    const facturas = await db.all("SELECT * FROM facturas ORDER BY fecha DESC");
    for (const factura of facturas) {
      factura.items = await db.all("SELECT * FROM factura_items WHERE factura_id = ?", factura.id);
    }
    return Response.json(facturas);
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const db = await openDb();

    // Generar ID tipo FAC001
    const last = await db.get("SELECT id FROM facturas ORDER BY fecha DESC LIMIT 1");
    let nextNumber = 1;
    if (last && last.id) {
      const match = last.id.match(/^FAC(\d+)$/);
      if (match) nextNumber = parseInt(match[1], 10) + 1;
    }
    const newId = `FAC${String(nextNumber).padStart(3, '0')}`;
    const fecha = new Date().toISOString();

    await db.run(
      `INSERT INTO facturas (id, cliente_id, fecha, total, estado) VALUES (?, ?, ?, ?, ?)`,
      newId,
      data.cliente_id,
      fecha,
      data.total,
      data.estado || "Pendiente"
    );

    // Guarda los items
    for (const item of data.items) {
      await db.run(
        `INSERT INTO factura_items (factura_id, producto_id, nombre, precio, cantidad) VALUES (?, ?, ?, ?, ?)`,
        newId,
        item.id,
        item.name,
        item.price,
        item.qty
      );
    }

    return Response.json({ ok: true, id: newId });
  } catch (error) {
    console.error("API error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}