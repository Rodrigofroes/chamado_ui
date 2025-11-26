"use client";

import { Loader2, Plus } from "lucide-react";
import Cabecalho from "../cabecalho";
import Container from "../container";
import { DataTable } from "../data-table";
import useUsuarioHook from "@/hooks/useUsuarioHook";
import { useEffect, useState } from "react";
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

export default function UsuarioComponente() {
    const { listar, deletar, state: { madeInitialFetch, isLoading, usuarios } } = useUsuarioHook();

    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            await listar();
        }

        if (!madeInitialFetch) {
            fetchData();
        }
    }, [madeInitialFetch]);

    const handleEdit = (id: string) => {
        router.push(`/admin/usuarios/editar/${id}`);
    }

    const handleDelete = async () => {
        if (selectedId) {
            await deletar(selectedId);
            setOpen(false);
            setSelectedId(null);
        }
    };
    const getColumns = columns({
        onEdit: handleEdit, onDelete: (id) => {
            setSelectedId(id);
            setOpen(true);
        }
    });


    return (
        <Container>
            <Cabecalho
                titulo="Usuários"
                descricao="Gerencie os usuários do sistema aqui."
                onAdicionar={() => router.push("/sistema/usuarios/criar")}
                textoBotao="Adicionar Usuário"
                icon={Plus}
            />

            <DataTable columns={getColumns} data={usuarios!} isLoading={isLoading} />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Confirmar Exclusão</DialogTitle>
                        <DialogDescription>
                            Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
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