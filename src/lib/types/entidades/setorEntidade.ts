import { UsuarioEntidade } from "./usuarioEntidade";

export interface SetorEntidade {
    id: string;
    nome: string;
    email: string;
    responsavel: UsuarioEntidade | null;
    deletadoEm: Date | null;
}