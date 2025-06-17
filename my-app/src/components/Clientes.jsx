"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Plus,
  Search,
  Edit,
  Eye,
  Pencil,
} from "lucide-react"

export default function Clientes(){
  const [clients, setClients] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [search, setSearch] = useState(""); // Nuevo estado para el buscador
  const [editClient, setEditClient] = useState(null); // Estado para el cliente en edición

  useEffect(() => {
    async function fetchClients() {
      const res = await fetch("/api/clientes");
      const data = await res.json();
      setClients(data);
    }
    fetchClients();
  }, []);

  async function handleSaveClient() {
    if (!newClient.name || !newClient.email || !newClient.phone) return;
    const res = await fetch("/api/clientes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: newClient.name,
        email: newClient.email,
        telefono: newClient.phone,
        direccion: newClient.address,
      }),
    });
    if (res.ok) {
      const added = await res.json();
      setClients((prev) => [added, ...prev]);
      setDialogOpen(false);
      setNewClient({ name: "", email: "", phone: "", address: "" });
    }
  }

  // Función para manejar la edición de un cliente
  async function handleEditClient() {
    if (!editClient) return;
    const res = await fetch(`/api/clientes/${editClient.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editClient),
    });
    if (res.ok) {
      const updatedClient = await res.json();
      setClients((prev) =>
        prev.map((client) => (client.id === updatedClient.id ? updatedClient : client))
      );
      setEditClient(null);
      setEditDialogOpen(false); // <-- Esto cierra el diálogo
    }
  }

  // Filtrar clientes según el término de búsqueda
  const filteredClients = clients.filter((client) => {
    const term = search.toLowerCase();
    return (
      client.id.toLowerCase().includes(term) ||
      client.nombre.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      client.telefono.toLowerCase().includes(term) ||
      (client.direccion ? client.direccion.toLowerCase().includes(term) : "")
    );
  });

  return(
    <TabsContent value="clients" className="space-y-6">
      <Card className="bg-white border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">Gestión de Clientes</CardTitle>
              <CardDescription>Administra la información de tus clientes</CardDescription>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Cliente</DialogTitle>
                  <DialogDescription>Ingresa la información del cliente</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                      id="name"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      placeholder="Juan Pérez"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newClient.email}
                      onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                      placeholder="juan@email.com"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      value={newClient.phone}
                      onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                      placeholder="+1 234-567-8901"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="address">Dirección</Label>
                    <Textarea
                      id="address"
                      value={newClient.address}
                      onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                      placeholder="Calle Principal 123, Ciudad"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={handleSaveClient}
                  >
                    Guardar Cliente
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar clientes..."
                className="pl-10"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Fecha Registro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.id}</TableCell>
                  <TableCell>{client.nombre}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.telefono}</TableCell>
                  <TableCell>
                    {client.fecha_registro
                      ? format(new Date(client.fecha_registro), "dd/MM/yyyy", { locale: es })
                      : ""}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            title="Ver detalles"
                          >
                            <Eye className="w-5 h-5 text-purple-700" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Información del Cliente</DialogTitle>
                            <DialogDescription>
                              Detalles completos del cliente seleccionado.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-2">
                            <div><b>ID:</b> {client.id}</div>
                            <div><b>Nombre:</b> {client.nombre}</div>
                            <div><b>Email:</b> {client.email}</div>
                            <div><b>Teléfono:</b> {client.telefono}</div>
                            <div><b>Dirección:</b> {client.direccion}</div>
                          </div>
                          <DialogFooter>
                            {/* El botón de cerrar ya viene incluido en shadcn/ui */}
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            title="Editar cliente"
                            size="sm"
                            onClick={() => {
                              setEditClient(client);
                              setEditDialogOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Editar Cliente</DialogTitle>
                            <DialogDescription>
                              Modifica los datos del cliente y guarda los cambios.
                            </DialogDescription>
                          </DialogHeader>
                          <form
                            className="space-y-3"
                            onSubmit={async (e) => {
                              e.preventDefault();
                              await handleEditClient();
                            }}
                          >
                            <div>
                              <label className="block text-sm font-medium">Nombre</label>
                              <input
                                className="w-full border rounded px-2 py-1"
                                value={editClient?.nombre || ""}
                                onChange={e =>
                                  setEditClient({ ...editClient, nombre: e.target.value })
                                }
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Email</label>
                              <input
                                className="w-full border rounded px-2 py-1"
                                value={editClient?.email || ""}
                                onChange={e =>
                                  setEditClient({ ...editClient, email: e.target.value })
                                }
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Teléfono</label>
                              <input
                                className="w-full border rounded px-2 py-1"
                                value={editClient?.telefono || ""}
                                onChange={e =>
                                  setEditClient({ ...editClient, telefono: e.target.value })
                                }
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium">Dirección</label>
                              <input
                                className="w-full border rounded px-2 py-1"
                                value={editClient?.direccion || ""}
                                onChange={e =>
                                  setEditClient({ ...editClient, direccion: e.target.value })
                                }
                              />
                            </div>
                            <DialogFooter>
                              <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                              >
                                Guardar Cambios
                              </button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  )
}