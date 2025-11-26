import { z } from "zod";
import { TIPO_USUARIO } from "../types/types";

export const usuarioSchema = z.object({
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    email: z.string().email("E-mail inválido."),
    tipo: z.enum(Object.keys(TIPO_USUARIO) as [string, ...string[]], {
        error: "Tipo de usuário inválido.",
    }),
    setorId: z.string().min(1, "O setor é obrigatório."),
});

export type UsuarioFormData = z.infer<typeof usuarioSchema>;