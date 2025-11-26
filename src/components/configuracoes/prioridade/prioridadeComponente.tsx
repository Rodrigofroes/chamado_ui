"use client";

import { DataTable } from "@/components/data-table";
import { columns } from "./colums";
import usePrioridadeHook from "@/hooks/usePrioridadeHook";
import { useEffect, useState } from "react";
import { Dialog, DialogDescription, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Loader from "@/components/loader";

interface PrioridadeComponenteProps {
    handlerEdit?: (id: string) => void;
}

export default function PrioridadeComponente({ handlerEdit }: PrioridadeComponenteProps) {
    const { listar, state: { madeInitialFetch, prioridades, isLoading }, deletar } = usePrioridadeHook();
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            await listar();
        }

        if (!madeInitialFetch) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [madeInitialFetch]);

    const handlerDelete = async (id: string) => {
        setOpen(true);
        setSelectedId(id);
    }

    const confirmDelete = async () => {
        if (selectedId) {
            await deletar(selectedId);
            setOpen(false);
            setSelectedId(null);
        }
    }

    const getColumns = columns({ onEdit: handlerEdit!, onDelete: handlerDelete! });

    return (
        <div className="mt-4">
            <DataTable columns={getColumns} data={prioridades!} isLoading={isLoading} />


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja excluir esta prioridade? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={() => {
                            setOpen(false);
                            setSelectedId(null);
                        }}>
                            Cancelar
                        </Button>
                        <Button type="button" onClick={confirmDelete}>
                            {isLoading ?
                                <>
                                    <Loader texto="Excluindo..." />
                                </> : "Excluir"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}