import { z } from "zod";

export const setorSchema = z.object({
    nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres").max(50, "O nome deve ter no máximo 50 caracteres"),
    email: z.string().email("E-mail inválido").max(100, "O e-mail deve ter no máximo 100 caracteres"),
    responsavelId: z.string().min(1, "O responsável é obrigatório"),
});

export type SetorDataForm = z.infer<typeof setorSchema>;