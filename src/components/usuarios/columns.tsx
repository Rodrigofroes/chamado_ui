"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UsuarioEntidade } from "@/lib/types/entidades/usuarioEntidade";
import { TIPO_USUARIO } from "@/lib/types/types";

interface ChamadosColumnProps {
    onEdit: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const columns = ({ onEdit, onDelete }: ChamadosColumnProps): ColumnDef<UsuarioEntidade>[] => [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "email",
        header: "E-mail",
    },
    {
        accessorKey: "tipo",
        header: "Tipo de Usuário",
        cell: ({ row }) => {
            const tipoUsuario = row.original.tipo;
            return TIPO_USUARIO[tipoUsuario.toUpperCase() as keyof typeof TIPO_USUARIO];
        }
    },
    {
        accessorKey: "setor.nome",
        header: "Setor",
        cell: ({ row }) => {
            const setorNome = row.original.setor?.nome;
            return setorNome ? setorNome : "N/A";
        }
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
                        <DropdownMenuItem onClick={() => onDelete?.(row.original.id)}>Excluir</DropdownMenuItem>

                    </DropdownMenuContent>
                </DropdownMenu>)
        }
    }
]