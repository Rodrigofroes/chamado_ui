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
import { PrioridadeEntidade } from "@/lib/types/entidades/prioridadeEntidade"
import { Button } from "@/components/ui/button";
import { FormatarSegundosParaHoras } from "@/lib/utils/formatarHoras";

interface PrioridadesColumnProps {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const columns = ({ onEdit, onDelete }: PrioridadesColumnProps): ColumnDef<PrioridadeEntidade>[] => [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "tempo",
    header: "Tempo (em horas)",
    cell: ({ row }) => {
      const tempo = row.original.tempo
      return <div>{FormatarSegundosParaHoras(tempo)}</div>
    }
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => {
      const descricao = row.original.descricao
      return <div className="flex" dangerouslySetInnerHTML={{ __html: descricao.substring(0, 40) + "..." }} />
    }
  },
  {
    accessorKey: "colorHex",
    header: "Cor",
    cell: ({ row }) => {
      const colorHex = row.original.colorHex
      return <div className="w-4 h-4 p-4 rounded-2xl" style={{ backgroundColor: colorHex }} />
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