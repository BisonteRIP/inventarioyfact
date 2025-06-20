import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

let db;

export async function openDb() {
  if (db) return db;

  // Usa la carpeta de datos de usuario de Electron
  const userDataPath = process.env.ELECTRON_USER_DATA || process.cwd();
  db = await open({
    filename: path.join(userDataPath, 'sqlite.db'),
    driver: sqlite3.Database,
  });

  await db.exec(`
    create table if not exists clientes (
      id TEXT PRIMARY KEY,
      nombre TEXT NOT NULL,
      email TEXT NOT NULL,
      telefono TEXT NOT NULL,
      direccion TEXT,
      fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    create table if not exists inventario (
      id TEXT PRIMARY KEY,
      producto TEXT NOT NULL,
      descripcion TEXT,
      categoria TEXT,
      precio NUMERIC(10, 2) NOT NULL,
      stock INT NOT NULL,
      estado TEXT NOT NULL,
      fecha_agregado DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}