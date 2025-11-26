import { z } from "zod";
import { TIPO_CHAMADO, TIPO_CHAMADO_STATUS } from "../types/types";

const MAX_FILE_SIZE = 10000000;

const fileOrUrl = z.union([
    z
        .instanceof(File)
        .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "O tamanho máximo permitido é 10MB.",
        })
]);


export const chamadoSchema = z.object({
    chamadoId: z.string().min(1, "ID do chamado é obrigatório"),
    usuarioId: z.string().min(1, "Usuário responsável é obrigatório"),
    prioridadeId: z.string().min(1, "Prioridade é obrigatória"),
    status: z.enum(Object.keys(TIPO_CHAMADO_STATUS) as [keyof typeof TIPO_CHAMADO_STATUS], {
        error: () => ({ message: "Status é obrigatório" })
    }),
    observacao: z.string().optional(),
});

export const abrirChamadoSchema = z.object({
    titulo: z.string().min(1, "Título é obrigatório"),
    descricao: z.string().min(1, "Descrição é obrigatória")
        .refine((val) => {
            if (val == null || val.trim() === "") return false;
            const plainText = val.replace(/<[^>]+>/g, '').trim();
            return plainText.length > 0;
        }, { message: "A descrição é obrigatória" }),
    tipo: z.enum(Object.keys(TIPO_CHAMADO) as [keyof typeof TIPO_CHAMADO], {
        error: () => ({ message: "Tipo é obrigatório" })
    }),
    documentos: z.array(fileOrUrl).optional(),
});

export type ChamadoFormData = z.infer<typeof chamadoSchema>;
export type AbrirChamadoFormData = z.infer<typeof abrirChamadoSchema>;