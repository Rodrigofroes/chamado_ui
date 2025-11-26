import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
    code: z
        .string()
        .min(1, 'Código de verificação é obrigatório')
        .max(6, 'Código de verificação incompleto'),
});

export type loginDataForm = z.infer<typeof loginSchema>