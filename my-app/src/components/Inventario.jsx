"use client";

import { useState } from "react";
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
import { Plus, Edit, Trash2, Search } from "lucide-react";

export default function Inventario() {
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({});
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Memoria RAM DDR4 8GB",
      category: "Componentes",
      price: 45.99,
      stock: 25,
      description: "Memoria RAM de alto rendimiento para PC.",
    },
    {
      id: 2,
      name: "Servicio de Reparación",
      category: "Servicios",
      price: 300,
      stock: null,
      description: "Reparación de computadoras y laptops.",
    },
    {
      id: 3,
      name: "Disco SSD 512GB",
      category: "Almacenamiento",
      price: 80,
      stock: 8,
      description: "Disco sólido rápido y confiable.",
    },
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        ...newProduct,
        id: products.length + 1,
        price: Number.parseFloat(newProduct.price) || 0,
        stock: newProduct.category === "Servicios" ? null : Number.parseInt(newProduct.stock) || 0,
      },
    ]);
    setNewProduct({});
    setIsProductDialogOpen(false);
  };

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
                    <Input
                      id="productName"
                      value={newProduct.name || ""}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Memoria RAM DDR4 8GB"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category">Categoría</Label>
                    <Select
                      value={newProduct.category || ""}
                      onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Componentes">Componentes</SelectItem>
                        <SelectItem value="Almacenamiento">Almacenamiento</SelectItem>
                        <SelectItem value="Servicios">Servicios</SelectItem>
                        <SelectItem value="Accesorios">Accesorios</SelectItem>
                        <SelectItem value="Periféricos">Periféricos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="price">Precio</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={newProduct.price || ""}
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
                        value={
                          newProduct.category === "Servicios"
                            ? ""
                            : newProduct.stock || ""
                        }
                        onChange={(e) =>
                          setNewProduct({ ...newProduct, stock: e.target.value })
                        }
                        placeholder="25"
                        disabled={newProduct.category === "Servicios"}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      value={newProduct.description || ""}
                      onChange={(e) =>
                        setNewProduct({ ...newProduct, description: e.target.value })
                      }
                      placeholder="Descripción del producto"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addProduct} className="bg-purple-600 hover:bg-purple-700">
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
              <Input placeholder="Buscar productos..." className="pl-10" />
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
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.description}</p>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {product.category === "Servicios" ? "∞" : product.stock}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.category === "Servicios"
                          ? "default"
                          : product.stock > 10
                          ? "default"
                          : product.stock > 0
                          ? "secondary"
                          : "destructive"
                      }
                      className={
                        product.category === "Servicios"
                          ? "bg-blue-100 text-blue-700"
                          : product.stock > 10
                          ? "bg-green-100 text-green-700"
                          : product.stock > 0
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {product.category === "Servicios"
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