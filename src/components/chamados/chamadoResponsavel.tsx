import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChamadoEntidade } from "@/lib/types/entidades/chamadoEntidade"   
import { Separator } from "@/components/ui/separator"
import { User, Clock, FileText } from "lucide-react"

interface ChamadoResponsavelProps {
    chamado: ChamadoEntidade
}

export default function ChamadoResponsavel({ chamado }: ChamadoResponsavelProps) {
    const responsavel = chamado.responsavel;

    return (
        <div className="space-y-6">
            <Card className="rounded-md">
                <CardHeader>
                    <CardTitle className="text-lg">Informações do Chamado</CardTitle>
                    <CardDescription>
                        Detalhes sobre o status e responsável do chamado
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-full bg-muted p-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">Responsável</p>
                            {responsavel?.responsavel ? (
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-sm font-medium">{responsavel.responsavel.nome}</p>
                                        <p className="text-xs text-muted-foreground">{responsavel.responsavel.email}</p>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-sm text-muted-foreground italic">Nenhum responsável atribuído</p>
                            )}
                        </div>
                    </div>

                    {responsavel?.observacao && (
                        <>
                            <Separator />
                            <div className="flex items-start gap-3">
                                <div className="rounded-full bg-muted p-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-medium">Última Observação</p>
                                    <div
                                        className="text-sm text-muted-foreground prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: responsavel.observacao }}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>

            <Card className="rounded-md">
                <CardHeader>
                    <CardTitle className="text-lg">Histórico do Chamado</CardTitle>
                    <CardDescription>
                        Linha do tempo com todas as mudanças de status e prioridade
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <p className="text-sm text-muted-foreground">
                            Histórico de transações será exibido aqui
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-2">
                            Em desenvolvimento...
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}