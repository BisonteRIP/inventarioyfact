"use client";
import React, { useState } from "react";
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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardAction,
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
} from "lucide-react"
export default function Clientes(){

     // const [isClientDialogOpen, setIsClientDialogOpen] = useState(false)
     // open={isClientDialogOpen} onOpenChange={setIsClientDialogOpen}
      const [clients, setClients] = useState([
    {
      id: "CLI001",
      name: "Juan Pérez",
      email: "juan.perez@email.com",
      phone: "+1 234-567-8901",
      address: "Calle Principal 123, Ciudad",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "CLI002",
      name: "María García",
      email: "maria.garcia@email.com",
      phone: "+1 234-567-8902",
      address: "Avenida Central 456, Ciudad",
      createdAt: new Date("2024-02-20"),
    },
  ])

    return(
        <TabsContent value="clients" className="space-y-6">
            <Card className="bg-white border-purple-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-900">Gestión de Clientes</CardTitle>
                    <CardDescription>Administra la información de tus clientes</CardDescription>
                  </div>
                  <Dialog >
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
                            value=""
                            onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                            placeholder="Juan Pérez"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value=""
                            onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                            placeholder="juan@email.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <Input
                            id="phone"
                            value=""
                            onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                            placeholder="+1 234-567-8901"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="address">Dirección</Label>
                          <Textarea
                            id="address"
                            value=""
                            onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                            placeholder="Calle Principal 123, Ciudad"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button className="bg-purple-600 hover:bg-purple-700">
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
                    <Input placeholder="Buscar clientes..." className="pl-10" />
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
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell className="font-medium">{client.id}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.phone}</TableCell>
                        <TableCell>{format(client.createdAt, "dd/MM/yyyy", { locale: es })}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
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
    )
}