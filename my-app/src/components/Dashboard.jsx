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
  FileText,
  Package,
  Shield,
  Users, 
} from "lucide-react"
import { TabsContent } from "@/components/ui/tabs"

export default function Dashboard(){
    return (
         <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Total Clientes</CardTitle>
                  <Users className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <p className="text-xs text-gray-500">+2 este mes</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Productos</CardTitle>
                  <Package className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <p className="text-xs text-gray-500">En inventario</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Facturas</CardTitle>
                  <FileText className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">0</div>
                  <p className="text-xs text-gray-500">Este mes</p>
                </CardContent>
              </Card>

              <Card className="bg-white border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">Garantías Activas</CardTitle>
                  <Shield className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    Activa
                  </div>
                  <p className="text-xs text-gray-500">Vigentes</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-purple-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Facturas Recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-purple-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">Productos con Bajo Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
    );
}