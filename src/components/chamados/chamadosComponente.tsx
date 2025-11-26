"use client";

import useChamadoHook from "@/hooks/useChamadoHook";
import { Activity, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Container from "../container";
import ChamadoFiltros from "./chamadoFiltros";
import useSetorHook from "@/hooks/useSetoreHook";
import usePrioridadeHook from "@/hooks/usePrioridadeHook";
import { TIPO_CHAMADO, TIPO_CHAMADO_STATUS } from "@/lib/types/types";
import Loader from "../loader";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import { AlertCircle, ArrowRight, Clock, User } from "lucide-react";
import { Button } from "../ui/button";
import { ptBR } from "date-fns/locale";
import { Badge } from "../ui/badge";
import ChamadoPrioridade from "./chamadoPrioridade";

export default function ChamadosComponente() {
    const { state: { chamados, isLoading, madeInitialFetch, error }, listar } = useChamadoHook();
    const { state: { setores, isLoading: isLoadingSetores, madeInitialFetch: madeInitialFetchSetores, error: errorSetores }, listar: listarSetores } = useSetorHook();
    const { state: { prioridades, isLoading: isLoadingPrioridades, madeInitialFetch: madeInitialFetchPrioridades, error: errorPrioridades }, listar: listarPrioridades } = usePrioridadeHook();

    const router = useRouter();

    const searchParams = useSearchParams();
    const filtros = searchParams.toString() ? `?${searchParams.toString()}` : "";


    useEffect(() => {
        listar(filtros);

        const fetchPrioridades = async () => {
            await listarPrioridades();
        };

        const fetchSetores = async () => {
            await listarSetores();
        };

        if (!madeInitialFetchPrioridades) {
            fetchPrioridades();
        }

        if (!madeInitialFetchSetores) {
            fetchSetores();
        }
    }, [madeInitialFetch, filtros]);

    const onEdit = (id: string) => {
        router.push(`/chamados/${id}`);
    };

    return (
        <Container>
            <ChamadoFiltros
                status={Object.keys(TIPO_CHAMADO_STATUS).map(
                    (key) => {
                        return { id: key, nome: TIPO_CHAMADO_STATUS[key as keyof typeof TIPO_CHAMADO_STATUS] };
                    }
                )}

                tipos={Object.keys(TIPO_CHAMADO).map(
                    (key) => {
                        return { id: key, nome: TIPO_CHAMADO[key as keyof typeof TIPO_CHAMADO] };
                    }
                )}
                setores={setores!}
                prioridades={prioridades!}
                isLoadingSetores={isLoadingSetores}
                isLoadingPrioridades={isLoadingPrioridades}
            />

            <div className="w-full justify-center items-center">
                {error && <p className="text-sm text-red-500">Erro ao carregar chamados: {error}</p>}
                {isLoading ? (
                    <div className="flex justify-center items-center h-32">
                        <Loader texto="Carregando..." />
                    </div>
                ) : (
                    <div className="mt-6">
                        {chamados?.map((chamado) => (
                            <Card key={chamado.id} className="mb-4 rounded-sm cursor-pointer transition-transform duration-300 ease-in-out hover:scale-101" onClick={() => onEdit(chamado.id!)}>
                                <CardHeader className="flex justify-between items-center">
                                    <div className="flex flex-col justify-start">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Activity mode={chamado.responsavel?.prioridade != null ? "visible" : "hidden"}>
                                                <ChamadoPrioridade prioridade={chamado.responsavel?.prioridade} />
                                            </Activity>
                                            <p className="text-xl font-semibold">Chamado: #{chamado.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-[12px] text-muted-foreground">
                                                Criado em {format(new Date(chamado.criadoEm), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}                                </p>
                                        </div>
                                    </div>
                                    <Badge className="p-2">
                                        {TIPO_CHAMADO_STATUS[chamado.responsavel?.status as keyof typeof TIPO_CHAMADO_STATUS]}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-2">
                                    <p className="text-sm">{chamado.titulo}</p>
                                    <div className="text-sm text-muted-foreground line-clamp-2" dangerouslySetInnerHTML={{ __html: chamado.descricao }} />
                                </CardContent>
                                <div className="px-4">
                                    <Separator />
                                </div>
                                <CardFooter className="flex justify-between items-center py-0">
                                    <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Solicitante</p>
                                            <p className="text-sm font-medium">{chamado.usuario?.nome || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Setor</p>
                                            <p className="text-sm font-medium">{chamado.usuario?.setor?.nome || "N/A"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Tipo</p>
                                            <p className="text-sm font-medium">
                                                {TIPO_CHAMADO[chamado.tipo as keyof typeof TIPO_CHAMADO]}
                                            </p>
                                        </div>
                                    </div>
                                    <Activity mode={chamado.responsavel?.prioridade != null ? "visible" : "hidden"}>
                                        <div className="flex items-center gap-2">
                                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-xs text-muted-foreground">Prioridade</p>
                                                <p className="text-sm font-medium">
                                                    {chamado.responsavel?.prioridade?.nome || "N/A"}
                                                </p>
                                            </div>
                                        </div>
                                    </Activity>
                                    <Button variant="link" className="p-0">Ver detalhes</Button>
                                </CardFooter>
                            </Card>
                        ))}
                        <span className="text-sm text-muted-foreground">Total de {chamados?.length} chamados</span>
                    </div>
                )}
            </div>
        </Container>
    );
}