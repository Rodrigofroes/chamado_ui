"use client";

import { Loader2, Plus } from "lucide-react";
import Cabecalho from "../cabecalho";
import Container from "../container";
import useSetorHook from "@/hooks/useSetoreHook";
import { useEffect, useState } from "react";
import { DataTable } from "../data-table";
import { columns } from "./columns";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import Loader from "../loader";

export default function SetorComponente() {
    const { state: { madeInitialFetch, setores, isLoading }, listar, deletar } = useSetorHook();
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchSetores = async () => {
            await listar();
        }

        if (!madeInitialFetch) {
            fetchSetores();
        }
    }, [madeInitialFetch]);

    const handleDelete = async () => {
        if (selectedId) {
            await deletar(selectedId);
            setOpen(false);
            setSelectedId(null);
        }
    };

    const handleEditar = (id: string) => {
        router.push(`/admin/setores/editar/${id}`);
    }

    const getColumns = columns({
        onEdit: (id) => handleEditar(id), onDelete: (id) => {
            setSelectedId(id);
            setOpen(true);
        }
    });

    return (
        <Container>
            <Cabecalho
                titulo="Setores"
                descricao="Gerencie os setores da sua empresa."
                onAdicionar={() => router.push("/admin/setores/criar")}
                textoBotao="Adicionar Setor"
                icon={Plus}
            />

            <DataTable columns={getColumns} data={setores!} />


            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja excluir este setor? Esta ação não pode ser desfeita.
                        </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="gap-2">
                        <Button type="button" variant="outline" onClick={() => {
                            setOpen(false);
                            setSelectedId(null);
                        }}>
                            Cancelar
                        </Button>
                        <Button type="button" onClick={handleDelete}>
                            {isLoading ?
                                <>
                                    <Loader texto="Excluindo..." />
                                </> : "Excluir"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Container>
    );
}