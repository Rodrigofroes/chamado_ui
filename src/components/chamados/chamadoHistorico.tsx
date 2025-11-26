import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, ArrowRight, AlertCircle, User } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface HistoricoItem {
    id: string
    tipo: "STATUS" | "PRIORIDADE" | "RESPONSAVEL" | "OBSERVACAO"
    valorAnterior?: string
    valorNovo: string
    usuario: {
        nome: string
        email: string
        avatar?: string
    }
    criadoEm: Date
    observacao?: string
}

interface ChamadoHistoricoProps {
    chamadoId: string
    historico?: HistoricoItem[]
}

export default function ChamadoHistorico({ historico = [] }: ChamadoHistoricoProps) {
    // TODO: Buscar histórico da API usando chamadoId
    // const { data: historico, isLoading } = useHistorico(chamadoId)

    const getIconByType = (tipo: HistoricoItem["tipo"]) => {
        switch (tipo) {
            case "STATUS":
                return <AlertCircle className="h-4 w-4" />
            case "PRIORIDADE":
                return <Clock className="h-4 w-4" />
            case "RESPONSAVEL":
                return <User className="h-4 w-4" />
            case "OBSERVACAO":
                return <AlertCircle className="h-4 w-4" />
            default:
                return <Clock className="h-4 w-4" />
        }
    }

    const getTipoLabel = (tipo: HistoricoItem["tipo"]) => {
        switch (tipo) {
            case "STATUS":
                return "Status alterado"
            case "PRIORIDADE":
                return "Prioridade alterada"
            case "RESPONSAVEL":
                return "Responsável atribuído"
            case "OBSERVACAO":
                return "Observação adicionada"
            default:
                return "Alteração"
        }
    }

    if (historico.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 text-center">
                <Clock className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm text-muted-foreground">
                    Nenhum histórico disponível ainda
                </p>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {historico.map((item, index) => (
                <div key={item.id} className="relative">
                    {/* Linha vertical conectando os itens */}
                    {index < historico.length - 1 && (
                        <div className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
                    )}

                    <div className="flex gap-4">
                        {/* Ícone */}
                        <div className="relative z-10 shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-border">
                                {getIconByType(item.tipo)}
                            </div>
                        </div>

                        {/* Conteúdo */}
                        <div className="flex-1 pb-8">
                            <Card className="p-4">
                                <div className="space-y-3">
                                    {/* Header */}
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium">
                                                {getTipoLabel(item.tipo)}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {format(new Date(item.criadoEm), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                                            </p>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {item.tipo}
                                        </Badge>
                                    </div>

                                    {/* Mudança de valor */}
                                    {item.valorAnterior && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <Badge variant="outline">{item.valorAnterior}</Badge>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                            <Badge>{item.valorNovo}</Badge>
                                        </div>
                                    )}

                                    {!item.valorAnterior && item.tipo !== "OBSERVACAO" && (
                                        <div className="text-sm">
                                            <Badge>{item.valorNovo}</Badge>
                                        </div>
                                    )}

                                    {/* Observação */}
                                    {item.observacao && (
                                        <div className="rounded-md bg-muted p-3">
                                            <div
                                                className="text-sm prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: item.observacao }}
                                            />
                                        </div>
                                    )}

                                    {/* Usuário */}
                                    <div className="flex items-center gap-2 pt-2 border-t">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={item.usuario.avatar} />
                                            <AvatarFallback className="text-xs">
                                                {item.usuario.nome.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="text-xs font-medium">{item.usuario.nome}</p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
