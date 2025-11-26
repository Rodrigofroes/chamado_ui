import { ChamadoEntidade } from "@/lib/types/entidades/chamadoEntidade";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { format } from "date-fns/format";
import { Separator } from "../ui/separator";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowRight, Clock, Loader2, User } from "lucide-react";
import { ptBR } from "date-fns/locale/pt-BR";
import Loader from "../loader";

interface TabStatusProps {
    chamadosAbertos: ChamadoEntidade[];
    onEdit: (id: string) => void;
}

export default function TabStatus({ chamadosAbertos, onEdit }: TabStatusProps) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center p-6">
                <div className="flex items-center gap-2 p-6">
                    <Loader texto="Carregando..." />
                </div>
            </div>
        );
    }

    if (chamadosAbertos.length === 0) {
        return (
            <div className="flex justify-center items-center p-6">
                <p className="text-sm text-muted-foreground">Nenhum chamado encontrado.</p>
            </div>
        );
    }

    return (
        <div className="mt-6">
            {chamadosAbertos?.map((chamado) => (
                <Card key={chamado.id} className="mb-4 rounded-sm cursor-pointer transition-transform duration-300 ease-in-out hover:scale-101" onClick={() => onEdit(chamado.id!)}>
                    <CardHeader>
                        <div className="flex flex-col justify-start">
                            <div>
                                <p className="text-xl font-semibold">Chamado: #{chamado.id}</p>
                            </div>
                            <div>
                                <p className="text-[12px] text-muted-foreground">
                                    Criado em {format(new Date(chamado.criadoEm), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}                                </p>
                            </div>
                        </div>
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
                                    {chamado.tipo.charAt(0).toUpperCase() + chamado.tipo.slice(1).toLowerCase()}
                                </p>
                            </div>
                        </div>
                        <Button variant="link" className="p-0">Ver detalhes</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );

}