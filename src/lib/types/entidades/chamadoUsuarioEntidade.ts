import { PrioridadeEntidade } from "./prioridadeEntidade";
import { UsuarioEntidade } from "./usuarioEntidade";

export interface ChamadoUsuarioEntidade {
    id: string;
    status: string;
    observacao?: string;
    prioridade?: PrioridadeEntidade
    responsavel?: UsuarioEntidade;
}