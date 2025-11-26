"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { SetorEntidade } from "@/lib/types/entidades/setorEntidade";
import Loader from "../loader";
import { PrioridadeEntidade } from "@/lib/types/entidades/prioridadeEntidade";
import { useAuthStore } from "@/lib/store/authStore";

interface ChamadoFiltrosProps {
    setores: SetorEntidade[];
    status?: { id: string; nome: string }[];
    prioridades: PrioridadeEntidade[];
    tipos: { id: string; nome: string }[];
    isLoadingSetores?: boolean;
    isLoadingPrioridades?: boolean;
}

export default function ChamadoFiltros({ status, setores, prioridades, isLoadingSetores, isLoadingPrioridades, tipos }: ChamadoFiltrosProps) {
    const { isAdmin } = useAuthStore();

    const [disabled, setDisabled] = useState(true);
    const [filters, setFilters] = useState({
        numero: "",
        nome: "",
        status: "",
        tipo: "",
        setor: "",
        prioridade: "",
        data: "",
    });

    interface Field {
        key: string;
        label: string;
        tipo: "input" | "select" | "date";
        options?: SetorEntidade[] | PrioridadeEntidade[] | { id: string; nome: string }[];
        loading?: boolean;
        isAdmin?: boolean;
    }

    const fields: Field[] = [
        { key: "numero", label: "Número", tipo: "input", isAdmin: false },
        { key: "nome", label: "Nome", tipo: "input", isAdmin: false },
        { key: "tipo", label: "Tipo", tipo: "select", options: tipos as { id: string; nome: string }[], isAdmin: false },
        { key: "status", label: "Status", tipo: "select", options: status as { id: string; nome: string }[], loading: false, isAdmin: false },
        { key: "setor", label: "Setor", tipo: "select", options: setores as SetorEntidade[], loading: isLoadingSetores, isAdmin: true },
        { key: "prioridade", label: "Prioridade", tipo: "select", options: prioridades as PrioridadeEntidade[], loading: isLoadingPrioridades, isAdmin: false },
        { key: "data", label: "Data", tipo: "date", isAdmin: false }
    ];

    const handleChange = (key: string, value: string) => {
        const params = new URLSearchParams(window.location.search);

        if (value === "") {
            params.delete(key);
        } else {
            params.set(key, value);
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, "", newUrl);
        setFilters((prev) => ({ ...prev, [key]: value }));
        setDisabled(false);
    };

    const handleResetFilters = () => {
        const params = new URLSearchParams(window.location.search);
        fields.forEach((field) => {
            params.delete(field.key);
        });

        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, "", newUrl);

        setFilters({
            numero: "",
            nome: "",
            status: "",
            tipo: "",
            setor: "",
            prioridade: "",
            data: "",
        });
        setDisabled(true);
    };

    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
            <div className="flex flex-col w-full gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Filtros</h2>
                    <p className="text-sm text-muted-foreground">
                        Utilize os filtros abaixo para refinar a lista de chamados.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row md:flex-wrap md:items-end gap-4">
                    {fields
                        .filter((field) => field.isAdmin ? isAdmin : true)
                        .map((field) => (
                            <div key={field.key} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6">
                                {field.tipo === "input" && (
                                    <Input
                                        placeholder={field.label}
                                        value={filters[field.key as keyof typeof filters]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                    />
                                )}

                                {field.tipo === "select" && (
                                    <Select
                                        value={filters[field.key as keyof typeof filters]}
                                        onValueChange={(value) => handleChange(field.key, value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder={field.label} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {field.loading ? (
                                                <div className="flex gap-2 items-center justify-center p-4">
                                                    <Loader texto="Carregando..." />
                                                </div>
                                            ) : (
                                                <>
                                                    {field.options?.map((opt) => (
                                                        <SelectItem key={opt.nome} value={opt.nome}>
                                                            {opt.nome}
                                                        </SelectItem>
                                                    ))}
                                                </>
                                            )}
                                        </SelectContent>
                                    </Select>
                                )}

                                {field.tipo === "date" && (
                                    <Input
                                        type="date"
                                        value={filters[field.key as keyof typeof filters]}
                                        onChange={(e) => handleChange(field.key, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}

                    <div className="mt-2">
                        <Button variant="outline" disabled={disabled} onClick={handleResetFilters}>
                            <X className="mr-2 h-4 w-4" /> Limpar
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}