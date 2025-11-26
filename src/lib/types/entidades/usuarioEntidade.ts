import { TIPO_USUARIO } from "../types";
import { SetorEntidade } from "./setorEntidade";

export interface UsuarioEntidade {
    id: string;
    nome: string;
    email: string;
    tipo: TIPO_USUARIO;
    setor: SetorEntidade | null;
}