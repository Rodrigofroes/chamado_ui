"use client";

import useDashboardHook from "@/hooks/useDashboardHook";
import DashboardCards from "./dashboardCards";
import { useEffect } from "react";
import { ChartAreaInteractive } from "../chart-area-interactive";
import Container from "../container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { TempoMedioAtendimento } from "@/lib/types/entidades/dashboardEntidade";
import { DashboardChartTempoMedio } from "./dashboardChartTempoMedio";
import { DashboardChartTempoMedioPrioridade } from "./dashboardChartTempoMedioPrioridade";

export default function DashboardComponente() {
    const { listar, state: { dashboards, isLoading, madeInitialFetch } } = useDashboardHook();

    useEffect(() => {
        const fetchData = async () => {
            await listar();
        };

        if (!madeInitialFetch) {
            fetchData();
        }
    }, [madeInitialFetch]);


    return (
        <Container>
            <Tabs defaultValue="qntdChamadoStatus" className="mb-4">
                <TabsList>
                    <TabsTrigger value="qntdChamadoStatus">Qntd. chamado por status</TabsTrigger>
                    <TabsTrigger value="tempoMedioAtendimento">Tempo médio de atendimento</TabsTrigger>
                </TabsList>

                <TabsContent value="qntdChamadoStatus">
                    <DashboardCards status={dashboards?.status ?? []} isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="tempoMedioAtendimento">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <DashboardChartTempoMedio data={dashboards?.tempoMedio ?? {} as TempoMedioAtendimento} />
                        <DashboardChartTempoMedioPrioridade data={dashboards?.tempoMedioPrioridade ?? []} />
                    </div>
                </TabsContent>
            </Tabs>



            <ChartAreaInteractive dados={dashboards?.setor ?? []} />
        </Container>
    );
}