"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { SetorDashboard } from "@/lib/types/entidades/dashboardEntidade"
import { useMemo } from "react"

interface ChartAreaInteractiveProps {
  dados: SetorDashboard[]
}

// Gera cores diferentes para cada setor
const cores = [
  "hsl(var(--primary-hsl))",      // Azul primary
  "hsl(142, 71%, 45%)",           // Verde
  "hsl(48, 96%, 53%)",            // Amarelo
  "hsl(24, 95%, 53%)",            // Laranja
  "hsl(330, 81%, 60%)",           // Rosa
  "hsl(271, 81%, 60%)",           // Roxo
  "hsl(199, 89%, 48%)",           // Ciano
  "hsl(0, 84%, 60%)",             // Vermelho
]

export function ChartAreaInteractive({ dados }: ChartAreaInteractiveProps) {
  // Transforma os dados para agrupar por data e criar colunas para cada setor
  const dadosTransformados = useMemo(() => {
    // Agrupa por data
    const groupedByDate = dados.reduce<Record<string, Record<string, string | number>>>((acc, item) => {
      if (!acc[item.data]) {
        acc[item.data] = { data: item.data }
      }
      acc[item.data][item.setor] = item.quantidade
      return acc
    }, {})

    // Converte para array e ordena por data (horário de Brasília UTC-3)
    return Object.values(groupedByDate).sort((a, b) => {
      const dateA = new Date(a.data as string + 'T00:00:00-03:00')
      const dateB = new Date(b.data as string + 'T00:00:00-03:00')
      return dateA.getTime() - dateB.getTime()
    })
  }, [dados])

  // Extrai todos os setores únicos
  const setores = useMemo(() => {
    const setoresUnicos = new Set(dados.map(item => item.setor))
    return Array.from(setoresUnicos)
  }, [dados])

  // Cria a configuração do gráfico dinamicamente
  const chartConfig = useMemo(() => {
    return setores.reduce((acc, setor, index) => {
      acc[setor] = {
        label: setor,
        color: cores[index % cores.length],
      }
      return acc
    }, {} as ChartConfig)
  }, [setores])


  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Chamados Abertos - Últimos 30 Dias</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total de chamados abertos por setor nos últimos 30 dias
          </span>
          <span className="@[540px]/card:hidden">Últimos 30 dias</span>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            data={dadosTransformados}
            accessibilityLayer
            margin={{ left: 12, right: 12 }}
          >
            <defs>
              {setores.map((setor, index) => (
                <linearGradient
                  key={`gradient-${setor}`}
                  id={`fill${setor.replace(/\s+/g, '')}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={cores[index % cores.length]}
                    stopOpacity={0.6}
                  />
                  <stop
                    offset="95%"
                    stopColor={cores[index % cores.length]}
                    stopOpacity={0.2}
                  />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid vertical={false} strokeDasharray="3 3" />

            <XAxis
              dataKey="data"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={24}
              tickFormatter={(value) => {
                const [, month, day] = value.split("-")
                return `${day}/${month}`
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
            />

            <ChartTooltip
              cursor={{ strokeDasharray: "3 3" }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const [, month, day] = value.split("-")
                    return `${day}/${month}`
                  }}
                  indicator="dot"
                />
              }
            />

            {setores.map((setor, index) => (
              <Area
                key={setor}
                type="monotone"
                dataKey={setor}
                stroke={cores[index % cores.length]}
                fill={`url(#fill${setor.replace(/\s+/g, '')})`}
                strokeWidth={2}
                dot={{ r: 3, strokeWidth: 2 }}
                activeDot={{ r: 5 }}
                stackId="1"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
