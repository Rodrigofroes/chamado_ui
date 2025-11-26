import { type LucideIcon, icons } from "lucide-react";
import { Button } from "./ui/button";

interface CabecalhoProps {
    titulo?: string;
    descricao?: string;
    onAdicionar?: () => void;
    textoBotao?: string;
    icon: LucideIcon;
}

export default function Cabecalho({ titulo, descricao, onAdicionar, textoBotao, icon }: CabecalhoProps) {
    const IconComponent = icon;
    return (
        <div className="flex items-center justify-between mb-4">
            <div>
                <h1 className="text-lg font-semibold">{titulo}</h1>
                <p className="text-sm text-muted-foreground">{descricao}</p>
            </div>

            <div>
                <Button onClick={onAdicionar} className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    {textoBotao}
                </Button>
            </div>
        </div>
    );
}
