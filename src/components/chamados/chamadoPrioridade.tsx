import { PrioridadeEntidade } from "@/lib/types/entidades/prioridadeEntidade";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import { FormatarSegundosParaHoras } from "@/lib/utils/formatarHoras";

interface ChamadoPrioridadeProps {
    prioridade?: PrioridadeEntidade
}

export default function ChamadoPrioridade({ prioridade }: ChamadoPrioridadeProps) {
    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                <div className="w-6 h-6 rounded-full inline-block mr-2" style={{ background: prioridade?.colorHex }} />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
                <div>
                    <h3 className="font-semibold text-lg mb-2">Prioridade: {prioridade?.nome || "Sem prioridade"}</h3>
                    <div dangerouslySetInnerHTML={{ __html: String(prioridade?.descricao ?? "Nenhuma descrição disponível.") }} className="text-sm mb-1" />
                    {prioridade && (
                        <p className="text-sm text-muted-foreground">
                            Tempo estimado: {FormatarSegundosParaHoras(prioridade.tempo)}
                        </p>
                    )}
                </div>
            </HoverCardContent>
        </HoverCard>
    );
}