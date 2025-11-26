import { StatusDashboard } from "@/lib/types/entidades/dashboardEntidade";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { TIPO_CHAMADO_STATUS } from "@/lib/types/types";
import Loader from "../loader";

interface DashboardCardsProps {
    status: StatusDashboard[];
    isLoading: boolean;
}

export default function DashboardCards({ status, isLoading }: DashboardCardsProps) {
    return (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {status.map((item, i) => (
                <Card
                    key={i}
                    className="flex flex-col justify-between p-4 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl"
                >
                    <CardHeader className="p-0">
                        <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-lg font-semibold text-gray-800">
                                {TIPO_CHAMADO_STATUS[item.status as keyof typeof TIPO_CHAMADO_STATUS]}
                            </CardTitle>
                        </div>

                        <CardContent className="p-0">
                            <p className="text-4xl font-bold text-gray-900">
                                {isLoading ?
                                    <>
                                        <Loader texto="Carregando..." />
                                    </> : item.quantidade}
                            </p>
                        </CardContent>

                        <CardDescription className="mt-3 text-sm text-gray-500">
                            Última atualização em:{' '}
                            <span className="font-medium text-gray-700">
                                {new Date().toLocaleDateString()}
                            </span>
                        </CardDescription>
                    </CardHeader>
                </Card>

            ))}
        </div>

    );
}