import { ChamadoEntidade } from "./chamadoEntidade";

export interface ChamadoPaginacao {
    paginaAtual: number;
    itensPorPagina: number;
    items: ChamadoEntidade[];
    totalItens: number;
    totalPaginas: number;
}