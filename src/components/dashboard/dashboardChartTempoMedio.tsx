"use client"

import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { TempoMedioAtendimento } from "@/lib/types/entidades/dashboardEntidade"
import { FormatarSegundosParaHoras } from "@/lib/utils/formatarHoras"

export const description = "A radial chart with stacked sections"

interface DashboardChartTempoMedioProps {
    data: TempoMedioAtendimento;
}


export function DashboardChartTempoMedio({ data }: DashboardChartTempoMedioProps) {
    const dados = [{ tempoMedio: data?.tempoMedio ?? 0 }];

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Tempo médio de atendimento</CardTitle>
                <CardDescription>Último mês</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={{
                        tempoMedio: {
                            label: "Tempo Médio",
                            color: "var(--chart-1)",
                        },
                    }}
                    className="mx-auto aspect-square w-full max-w-[250px]"
                >
                    <RadialBarChart
                        data={dados}
                        endAngle={180}
                        innerRadius={80}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent
                                hideLabel
                                formatter={(value) => {
                                    const data = FormatarSegundosParaHoras(Number(value));
                                    return (
                                        <div className="flex flex-col space-y-1">
                                            <span className="font-medium">
                                                {`Tempo Médio: ${data}`}
                                            </span>
                                        </div>
                                    )
                                }}
                            />
                            }
                        />

                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        const data = FormatarSegundosParaHoras(Number(dados[0].tempoMedio));
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {data}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    {"Tempo Médio"}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>

                        <RadialBar
                            dataKey="tempoMedio"
                            cornerRadius={5}
                            fill="hsl(var(--primary-hsl))"
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}