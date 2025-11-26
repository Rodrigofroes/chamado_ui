"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button";
import { TemplateEmailEntidade } from "@/lib/types/entidades/templateEmailEntidade";
import { EMAIL } from "@/lib/types/types";

interface PrioridadesColumnProps {
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
}

export const columns = ({ onEdit, onDelete }: PrioridadesColumnProps): ColumnDef<TemplateEmailEntidade>[] => [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "assunto",
        header: "Assunto"
    },
    {
        accessorKey: "tipo",
        header: "tipo",
        cell: ({ row }) => {
            const tipo = row.original.tipo as keyof typeof EMAIL;
            return EMAIL[tipo]
        }
    },
    {
        accessorKey: "corpo",
        header: "Corpo",
        cell: ({ row }) => {
            const corpo = row.original.corpo
            return <div className="flex" dangerouslySetInnerHTML={{ __html: corpo.substring(0, 40) + "..." }} />
        },
    },
    {
        header: "Ações",
        cell: ({ row }) => {
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={() => onEdit(row.original.id)}>Editar</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDelete(row.original.id)}>Deletar</DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>)
        }
    }
]