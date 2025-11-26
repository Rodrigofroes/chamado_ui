"use client"

import useChamadoHook from "@/hooks/useChamadoHook"
import { Activity, useEffect } from "react"
import { AlertCircle, Clock, User, FileImage, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import Container from "../container"
import { Form } from "../ui/form"
import { Button } from "../ui/button"
import useUsuarioHook from "@/hooks/useUsuarioHook"
import ChamadoForm from "./chamadoForm"
import usePrioridadeHook from "@/hooks/usePrioridadeHook"
import { TIPO_CHAMADO, TIPO_CHAMADO_STATUS } from "@/lib/types/types"
import Loader from "../loader"
import { useAuthStore } from "@/lib/store/authStore"
import ChamadoPrioridade from "./chamadoPrioridade"
import ChamadoResponsavel from "./chamadoResponsavel"
import { ChamadoFormData } from "@/lib/validations/chamadoValidation"
import useChamadoUsuarioHook from "@/hooks/useChamadoUsuarioHook"
import { useRouter } from "next/navigation"

interface ChamadoSecaoProps {
    id: string;
}

export default function ChamadoSecao({ id }: ChamadoSecaoProps) {
    const { isAdmin } = useAuthStore()
    const router = useRouter()
    const { cadastrar, state: { isLoading: isLoadingCadastrar } } = useChamadoUsuarioHook()
    const { listar: listarPrioridades, state: { prioridades, madeInitialFetch, isLoading: isLoadingPrioridades } } = usePrioridadeHook()
    const { buscar, state: { chamado, isLoading, error }, form } = useChamadoHook()
    const { listar: listarUsuarios, state: { isLoading: isLoadingUsuarios, usuarios, madeInitialFetch: madeInitialFetchUsuarios } } = useUsuarioHook()

    useEffect(() => {
        const fetchChamado = async () => {
            await buscar(id);
        }

        const fetchUsuarios = async () => {
            await listarUsuarios();
        }

        if (!madeInitialFetchUsuarios) {
            fetchUsuarios();
        }

        const fetchPrioridades = async () => {
            await listarPrioridades();
        }

        if (!madeInitialFetch) {
            fetchPrioridades();
        }

        fetchChamado();
    }, [id])

    if (error) {
        return (
            <Alert variant="destructive" className="m-6">
                <AlertTitle className="flex items-center gap-2">
                    <AlertCircle className="size-5" />
                    Erro ao carregar chamado
                </AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    const onSubmit = async (data: ChamadoFormData) => {
        const id = chamado?.responsavel?.id;
        const response = await cadastrar(data, id!);
        if (response) {
           window.location.reload();
        }
    }

    return (
        <Container>
            <div className="flex items-center justify-center">
                {
                    isLoading && (
                        <div className="flex items-center gap-2 p-6">
                            <Loader texto="Carregando..." />
                        </div>
                    )
                }
            </div>
            <div className="animate-fade-up space-y-6">
                {chamado && (
                    <>
                        <Card className="rounded-md">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-xl">
                                            <div className="flex items-center gap-1 mb-1">
                                                <Activity mode={chamado.responsavel?.prioridade != null ? "visible" : "hidden"}>
                                                    <ChamadoPrioridade prioridade={chamado.responsavel?.prioridade} />
                                                </Activity>
                                                <p className="text-xl font-semibold">Chamado: #{chamado.id}</p>
                                            </div>
                                        </CardTitle>
                                        <CardDescription className="text-xs mt-1">
                                            Criado em {format(new Date(chamado.criadoEm), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                                        </CardDescription>
                                    </div>
                                    <Badge className="p-2">
                                        {TIPO_CHAMADO_STATUS[chamado.responsavel?.status as keyof typeof TIPO_CHAMADO_STATUS]}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold">{chamado.titulo}</h3>
                                    <div className="text-sm text-muted-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: chamado.descricao }} />
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                                                {TIPO_CHAMADO[chamado.tipo as unknown as keyof typeof TIPO_CHAMADO]}
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
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <FileImage className="h-4 w-4 text-muted-foreground" />
                                        <p className="text-sm font-medium">Anexos</p>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {chamado.anexos && chamado.anexos.length > 0 ? (
                                            chamado.anexos.map((attachment, index) => (
                                                <a
                                                    key={index}
                                                    href={attachment.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group relative"
                                                >
                                                    <Image
                                                        src={attachment.url}
                                                        alt={`Anexo ${index + 1}`}
                                                        width={120}
                                                        height={120}
                                                        className="rounded-lg border-2 border-border hover:border-primary transition-all object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all rounded-lg" />
                                                </a>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground italic">Nenhum anexo disponível</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Activity mode={chamado.responsavel?.responsavel?.id ? "visible" : "hidden"}>
                            <ChamadoResponsavel chamado={chamado} />
                        </Activity>

                        <Activity mode={isAdmin ? "visible" : "hidden"}>
                            <Card className="rounded-md">
                                <CardHeader>
                                    <CardTitle className="text-lg">Responder Chamado</CardTitle>
                                    <CardDescription>
                                        Adicione uma resposta ou atribua o chamado a um responsável
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                            <ChamadoForm
                                                form={form}
                                                isLoadingUsuarios={isLoadingUsuarios}
                                                usuarios={usuarios!}
                                                prioridades={prioridades!}
                                                isLoadingPrioridades={isLoadingPrioridades}
                                            />
                                            <div className="flex gap-3 justify-end pt-2">
                                                <Button type="button" disabled={isLoadingCadastrar} variant="outline">
                                                    Cancelar
                                                </Button>
                                                <Button disabled={isLoadingCadastrar} type="submit">
                                                    {isLoadingCadastrar ? <Loader texto="Salvando..." /> : "Salvar"}
                                                </Button>
                                            </div>
                                        </form>
                                    </Form>
                                </CardContent>
                            </Card>
                        </Activity>
                    </>
                )}
            </div>
        </Container>
    );
}