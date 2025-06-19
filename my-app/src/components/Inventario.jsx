"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
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
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Edit, Trash2, Search, Eye } from "lucide-react";

export default function inventario() {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    producto: "",
    descripcion: "",
    categoria: "",
    stock: "",
    precio: "",
    estado: "Disponible",
  });
  const [search, setSearch] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editPassword, setEditPassword] = useState("");
  const [editError, setEditError] = useState("");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/inventario");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  async function handleSaveProducts() {
    if (!newProduct.name || !newProduct.category || !newProduct.price || !newProduct.stock) return;

    // Verifica si el producto ya existe
    const existing = products.find(p => p.producto === newProduct.name);

    if (existing) {
      // Suma el stock al producto existente
      const res = await fetch(`/api/inventario/${existing.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...existing,
          stock: Number(existing.stock) + Number(newProduct.stock),
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        setIsProductDialogOpen(false);
        setNewProduct({
          name: "",
          category: "",
          price: "",
          stock: "",
          description: "",
        });
      }
    } else {
      // Producto nuevo
      const res = await fetch("/api/inventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          producto: newProduct.name,
          categoria: newProduct.category,
          precio: newProduct.price,
          stock: newProduct.stock,
          descripcion: newProduct.description,
        }),
      });
      if (res.ok) {
        const added = await res.json();
        setProducts((prev) => [added, ...prev]);
        setIsProductDialogOpen(false);
        setNewProduct({
          name: "",
          category: "",
          price: "",
          stock: "",
          description: "",
        });
      }
    }
  }

  const filteredProducts = products.filter((product) => {
    const term = search.toLowerCase();
    return (
      product.id.toLowerCase().includes(term) ||
      (product.producto && product.producto.toLowerCase().includes(term)) ||
      (product.categoria && product.categoria.toLowerCase().includes(term)) ||
      (product.descripcion && product.descripcion.toLowerCase().includes(term))
    );
  });

  const productNames = Array.from(new Set(products.map(p => p.producto)));
  const filteredSuggestions = newProduct.name
    ? productNames.filter(name =>
        name.toLowerCase().includes(newProduct.name.toLowerCase()) &&
        name.toLowerCase() !== newProduct.name.toLowerCase()
      )
    : [];

  function handleProductNameSelect(name) {
    const prod = products.find(p => p.producto === name);
    if (prod) {
      setNewProduct({
        name,
        category: prod.categoria,
        price: prod.precio,
        description: prod.descripcion,
        stock: "",
        // estado: prod.estado, // Si quieres también bloquear el estado
      });
    } else {
      setNewProduct({
        ...newProduct,
        name,
        category: "",
        price: "",
        description: "",
        stock: "",
      });
    }
  }

  return (
    <TabsContent value="inventory" className="space-y-6">
      <Card className="bg-white border-purple-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-gray-900">Inventario de Productos</CardTitle>
              <CardDescription>Gestiona tu inventario de productos y servicios</CardDescription>
            </div>
            <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Producto
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                  <DialogDescription>Ingresa la información del producto o servicio</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="productName">Nombre del Producto</Label>
                    <div className="relative">
                      <Input
                        id="productName"
                        value={newProduct.name || ""}
                        onChange={(e) => {
                          setNewProduct({ ...newProduct, name: e.target.value });
                          // Si el usuario borra el nombre, desbloquea los campos
                          if (!e.target.value) {
                            setNewProduct({
                              name: "",
                              category: "",
                              price: "",
                              description: "",
                              stock: "",
                            });
                          }
                        }}
                        placeholder="Memoria RAM DDR4 8GB"
                        autoComplete="off"
                      />
                      {filteredSuggestions.length > 0 && (
                        <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-32 overflow-auto shadow">
                          {filteredSuggestions.map((name) => (
                            <li
                              key={name}
                              className="px-3 py-1 hover:bg-purple-100 cursor-pointer"
                              onClick={() => handleProductNameSelect(name)}
                            >
                              {name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Input
                      id="category"
                      value={newProduct.category || ""}
                      disabled={!!productNames.find(n => n === newProduct.name)}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      placeholder="Categoría"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Precio</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price || ""}
                        disabled={!!productNames.find(n => n === newProduct.name)}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, price: e.target.value })
                        }
                        placeholder="45.99"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="stock">Stock</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={newProduct.stock || ""}
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, stock: e.target.value })
                        }
                        placeholder="25"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description || ""}
                      disabled={!!productNames.find(n => n === newProduct.name)}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })
                      }
                      placeholder="Descripción del producto"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleSaveProducts} className="bg-purple-600 hover:bg-purple-700">
                    Guardar Producto
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
                placeholder="Buscar productos..."
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
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.producto}</p>
                      <p className="text-sm text-gray-500">{product.descripcion}</p>
                    </div>
                  </TableCell>
                  <TableCell>{product.categoria}</TableCell>
                  <TableCell>${product.precio.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.categoria === "Servicios" ? "∞" : product.stock}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.categoria === "Servicios"
                          ? "default"
                          : product.stock > 10
                          ? "default"
                          : product.stock > 0
                          ? "secondary"
                          : "destructive"
                      }
                      className={
                        product.categoria === "Servicios"
                          ? "bg-blue-100 text-blue-700"
                          : product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {product.categoria === "Servicios"
                        ? "Disponible"
                        : product.stock > 10
                        ? "En Stock"
                        : product.stock > 0
                        ? "Bajo Stock"
                        : "Sin Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        title="Editar producto"
                        onClick={() => {
                          setEditProduct(product);
                          setEditDialogOpen(true);
                          setEditPassword("");
                          setEditError("");
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        title="Ver producto"
                        onClick={() => {
                          setSelectedProduct(product);
                          setViewDialogOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    {product.fecha_agregado
                      ? new Date(product.fecha_agregado).toLocaleDateString()
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Producto</DialogTitle>
          </DialogHeader>
          {editProduct && (
            <form
              className="space-y-3"
              onSubmit={async (e) => {
                e.preventDefault();
                if (editPassword !== "m1000") {
                  setEditError("Clave incorrecta");
                  return;
                }
                const res = await fetch(`/api/inventario/${editProduct.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(editProduct),
                });
                if (res.ok) {
                  const updated = await res.json();
                  setProducts((prev) =>
                    prev.map((p) => (p.id === updated.id ? updated : p))
                  );
                  setEditDialogOpen(false);
                  setEditProduct(null);
                  setEditPassword("");
                  setEditError("");
                }
              }}
            >
              <div>
                <label className="block text-sm font-medium">ID</label>
                <input
                  className="w-full border rounded px-2 py-1 bg-gray-100"
                  value={editProduct.id}
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Producto</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={editProduct.producto}
                  onChange={e =>
                    setEditProduct({ ...editProduct, producto: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Descripción</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={editProduct.descripcion}
                  onChange={e =>
                    setEditProduct({ ...editProduct, descripcion: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Categoría</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={editProduct.categoria}
                  onChange={e =>
                    setEditProduct({ ...editProduct, categoria: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Precio</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={editProduct.precio}
                  onChange={e =>
                    setEditProduct({ ...editProduct, precio: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Stock</label>
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={editProduct.stock}
                  onChange={e =>
                    setEditProduct({ ...editProduct, stock: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Estado</label>
                <input
                  className="w-full border rounded px-2 py-1"
                  value={editProduct.estado}
                  onChange={e =>
                    setEditProduct({ ...editProduct, estado: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Clave de edición</label>
                <input
                  type="password"
                  className="w-full border rounded px-2 py-1"
                  value={editPassword}
                  onChange={e => setEditPassword(e.target.value)}
                  required
                />
              </div>
              {editError && (
                <div className="text-red-600 text-sm">{editError}</div>
              )}
              <DialogFooter>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Guardar Cambios
                </button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Detalles del Producto</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-2">
              <div><b>ID:</b> {selectedProduct.id}</div>
              <div><b>Producto:</b> {selectedProduct.producto}</div>
              <div><b>Categoría:</b> {selectedProduct.categoria}</div>
              <div><b>Precio:</b> {selectedProduct.precio}</div>
              <div><b>Stock:</b> {selectedProduct.stock}</div>
              <div><b>Estado:</b> {selectedProduct.estado}</div>
              <div><b>Descripción:</b> {selectedProduct.descripcion}</div>
              {/* Puedes agregar más campos si lo deseas */}
              <hr className="my-2" />
              <div>
                <b>Últimos productos agregados:</b>
                <div className="max-h-40 overflow-y-auto mt-2 border rounded p-2 bg-gray-50">
                  {products
                    .filter(p => p.fecha_agregado)
                    .sort((a, b) => new Date(b.fecha_agregado) - new Date(a.fecha_agregado))
                    .slice(0, 5)
                    .map((p) => (
                      <div key={p.id} className="py-1 border-b last:border-b-0">
                        <div className="font-medium">{p.producto}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(p.fecha_agregado).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  {products.filter(p => p.fecha_agregado).length > 5 && (
                    <div className="text-center text-xs text-gray-400 mt-2">Desplázate para ver más...</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
}