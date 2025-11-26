import { TIPO_CHAMADO_STATUS } from "../types";
import { ChamadoUsuarioEntidade } from "./chamadoUsuarioEntidade";
import { UsuarioEntidade } from "./usuarioEntidade";

export interface ChamadoEntidade {
    id: string;
    titulo: string;
    descricao: string;
    tipo: string;
    typeCalled: string;
    status: keyof typeof TIPO_CHAMADO_STATUS;
    user: UsuarioEntidade
    anexos?: Anexo[];
    usuario: UsuarioEntidade;
    responsavel?: ChamadoUsuarioEntidade;
    criadoEm: Date;
}



export interface Anexo {
    id: string;
    url: string;
}