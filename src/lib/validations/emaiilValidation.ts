import { z } from "zod";

export const emailSchema = z.object({
    nome: z.string().min(2, "O nome deve ter no mínimo 2 caracteres"),
    assunto: z.string().min(5, "O assunto deve ter no mínimo 5 caracteres"),
    corpo: z.string().min(10, "O corpo do e-mail deve ter no mínimo 10 caracteres"),
    tipo: z.enum(["ABERTURA_CHAMADO", "ATUALIZACAO_CHAMADO", "FECHAMENTO_CHAMADO"], {
        message: "Tipo de e-mail inválido"
    })
})

export type EmailFormData = z.infer<typeof emailSchema>;