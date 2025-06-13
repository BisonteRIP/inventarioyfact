"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  TabsContent,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search } from "lucide-react";

export default function Facturas() {
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);

  const [clients] = useState([
    { id: "C001", name: "Juan Pérez" },
    { id: "C002", name: "María López" },
    { id: "C003", name: "Carlos Ruiz" },
  ]);
  const [products] = useState([
    { id: "P001", name: "Memoria RAM DDR4 8GB", price: 45.99 },
    { id: "P002", name: "Servicio de Reparación", price: 300 },
    { id: "P003", name: "Disco SSD 512GB", price: 80 },
  ]);
  const [invoices, setInvoices] = useState([
    {
      id: 1,
      client: "Juan Pérez",
      date: "2024-06-01",
      total: 120.5,
      status: "Pagada",
    },
    {
      id: 2,
      client: "María López",
      date: "2024-06-03",
      total: 80.0,
      status: "Pendiente",
    },
    {
      id: 3,
      client: "Carlos Ruiz",
      date: "2024-06-05",
      total: 200.0,
      status: "Cancelada",
    },
  ]);

  // Estado para la factura en edición
  const [selectedClient, setSelectedClient] = useState("");
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [itemProductId, setItemProductId] = useState("");
  const [itemQty, setItemQty] = useState(1);
  const [itemPrice, setItemPrice] = useState("");

  // Cuando seleccionas un producto, actualiza el precio automáticamente
  const handleProductChange = (productId) => {
    setItemProductId(productId);
    const found = products.find((p) => p.id === productId);
    setItemPrice(found ? found.price : "");
  };

  // Agrega el producto/servicio a la lista de la factura
  const handleAddItem = () => {
    if (!itemProductId || !itemQty || !itemPrice) return;
    const found = products.find((p) => p.id === itemProductId);
    setInvoiceItems([
      ...invoiceItems,
      {
        id: itemProductId,
        name: found ? found.name : "",
        price: Number(itemPrice),
        qty: Number(itemQty),
      },
    ]);
    setItemProductId("");
    setItemQty(1);
    setItemPrice("");
  };

  // Eliminar un producto/servicio de la lista
  const handleRemoveItem = (idx) => {
    setInvoiceItems(invoiceItems.filter((_, i) => i !== idx));
  };

  // Limpiar el formulario de nueva factura
  const resetInvoiceForm = () => {
    setSelectedClient("");
    setInvoiceItems([]);
    setItemProductId("");
    setItemQty(1);
    setItemPrice("");
  };

  // Cuando se cierra el dialogo, limpiar el formulario
  const handleDialogOpenChange = (open) => {
    setIsInvoiceDialogOpen(open);
    if (!open) {
      resetInvoiceForm();
    }
  };

  // Calcular totales
  const subtotal = invoiceItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  // Calcular el ancho del producto más largo
  const maxProductLength = Math.max(
    ...products.map((p) => p.name.length),
    10
  );
  // 1ch = width of "0", 2ch extra for padding, hasta un máximo razonable
  const selectWidth = Math.min(maxProductLength * 0.7 + 6, 40);

  return (
    <TabsContent value="invoices" className="space-y-6">
      <Card className="bg-white border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">Facturas</CardTitle>
              <CardDescription>Gestión de facturas emitidas</CardDescription>
            </div>
            <Dialog
              open={isInvoiceDialogOpen}
              onOpenChange={handleDialogOpenChange}
            >
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nueva Factura
                </Button>
              </DialogTrigger>
              <DialogContent
                className="bg-white p-8"
                style={{
                  maxWidth: `${Math.max(640, selectWidth * 20)}px`, // dialog crece con el select
                  width: "100%",
                }}
              >
                <DialogHeader>
                  <DialogTitle>Crear Nueva Factura</DialogTitle>
                  <DialogDescription>
                    Selecciona el cliente y los productos/servicios
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid gap-2">
                    <Label>Cliente</Label>
                    <Select
                      value={selectedClient}
                      onValueChange={setSelectedClient}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name} - {client.id}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-4">Productos/Servicios</h4>
                    <div className="space-y-2">
                      <div
                        className="grid grid-cols-4 gap-2 items-center"
                        style={{ gridTemplateColumns: `2fr 1fr 1fr 40px` }}
                      >
                        <Select
                          value={itemProductId}
                          onValueChange={handleProductChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Producto" />
                          </SelectTrigger>
                          <SelectContent>
                            {products.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          type="number"
                          placeholder="Cantidad"
                          min="1"
                          value={itemQty}
                          onChange={(e) => setItemQty(e.target.value)}
                        />
                        <Input
                          placeholder="Precio"
                          value={itemPrice}
                          disabled
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={handleAddItem}
                          title="Agregar producto"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {/* Lista de productos agregados con scroll si hay más de 4 */}
                      {invoiceItems.length > 0 && (
                        <div
                          className="mt-2"
                          style={{
                            maxHeight: invoiceItems.length > 4 ? "192px" : "auto",
                            overflowY: invoiceItems.length > 4 ? "auto" : "visible",
                          }}
                        >
                          <div className="grid grid-cols-5 gap-2 font-semibold text-sm text-gray-700 mb-1">
                            <span>Producto</span>
                            <span>Cantidad</span>
                            <span>Precio</span>
                            <span>Total</span>
                            <span></span>
                          </div>
                          {invoiceItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="grid grid-cols-5 gap-2 items-center border-b py-1 text-sm"
                            >
                              <span>{item.name}</span>
                              <span>{item.qty}</span>
                              <span>${item.price.toFixed(2)}</span>
                              <span>${(item.price * item.qty).toFixed(2)}</span>
                              <button
                                onClick={() => handleRemoveItem(idx)}
                                className="flex items-center justify-center"
                                title="Eliminar"
                                type="button"
                              >
                                <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Impuestos (18%):</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={resetInvoiceForm}>
                    Guardar Borrador
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    Crear Factura
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
              <Input placeholder="Buscar facturas..." className="pl-10" />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        invoice.status === "Pagada"
                          ? "bg-green-100 text-green-700"
                          : invoice.status === "Pendiente"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
}