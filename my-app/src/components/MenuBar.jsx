import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Computer,
  FileText,
  Package,
  Settings,
  Shield,
  Users,
} from "lucide-react"

export default function MenuBar(children){
    return(
        <Tabs>
            <TabsList className="grid w-full grid-cols-6 bg-white border border-purple-200">
                <TabsTrigger
                value="dashboard"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                </TabsTrigger>
                <TabsTrigger
                value="clients"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                    <Users className="w-4 h-4 mr-2" />
                    Clientes
                </TabsTrigger>
                <TabsTrigger
                value="inventory"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                    <Package className="w-4 h-4 mr-2" />
                    Inventario
                </TabsTrigger>
                <TabsTrigger
                value="invoices"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                    <FileText className="w-4 h-4 mr-2" />
                    Facturas
                </TabsTrigger>
                <TabsTrigger
                value="warranties"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                <Shield className="w-4 h-4 mr-2" />
                Garantías
                </TabsTrigger>
                <TabsTrigger
                value="reports"
                className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700"
                >
                    <Computer className="w-4 h-4 mr-2" />
                    Reportes
                </TabsTrigger>
            </TabsList>
            {children}
        </Tabs>
    )
}