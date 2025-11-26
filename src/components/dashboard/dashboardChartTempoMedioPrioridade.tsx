"use client";

import { PieChart, Pie, Cell } from "recharts";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";

import {
    ChartContainer,
    ChartTooltip,
} from "@/components/ui/chart";

import { TempoMedioAtendimentoPorPrioridade } from "@/lib/types/entidades/dashboardEntidade";
import { FormatarSegundosParaHoras } from "@/lib/utils/formatarHoras";

interface DashboardChartTempoMedioPrioridadeProps {
    data: TempoMedioAtendimentoPorPrioridade[];
}

export function DashboardChartTempoMedioPrioridade({
    data,
}: DashboardChartTempoMedioPrioridadeProps) {
    console.log("data prioridade:", data);
    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Tempo médio por prioridade</CardTitle>
                <CardDescription>
                    Distribuição visual dos tempos médios por prioridade.
                </CardDescription>
            </CardHeader>

            <CardContent className="flex justify-center items-center pb-0">
                <ChartContainer
                    config={{
                        tempoMedio: {
                            label: "Tempo Médio",
                            color: "hsl(var(--chart-1))",
                        },
                    }}
                    className="mx-auto aspect-square w-full max-w-[320px]"
                >
                    {data.length === 0 ? (
                        <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                            Nenhum dado disponível
                        </div>
                    ) : (
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="tempoMedio"
                                nameKey="prioridade"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                paddingAngle={3}
                            >
                                {data.map((entry, i) => (
                                    <Cell key={i} fill={entry.cor} />
                                ))}
                            </Pie>

                            <ChartTooltip
                                content={({ active, payload }) => {
                                    if (active && payload?.length) {
                                        const item = payload[0].payload as TempoMedioAtendimentoPorPrioridade;

                                        return (
                                            <div className="rounded-md bg-background p-2 shadow-md text-sm space-y-1">
                                                <span className="font-semibold capitalize">
                                                    {item.prioridade}
                                                </span>

                                                <div className="text-muted-foreground">
                                                    Tempo médio:{" "}
                                                    <span className="font-medium text-foreground">
                                                        {FormatarSegundosParaHoras(item.tempoMedio)}
                                                    </span>
                                                </div>

                                                <div className="text-muted-foreground">
                                                    SLA:{" "}
                                                    <span className={item.sla ? "text-green-600" : "text-red-500"}>
                                                        {item.sla ? "Dentro" : "Fora"}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                        </PieChart>
                    )}
                </ChartContainer>

            </CardContent>
        </Card>
    );
}
