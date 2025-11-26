import { z } from "zod";
import { FormatarHorasParaSegundos } from "../utils/formatarHoras";

export const prioridadeSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório").max(100, "O nome deve ter no máximo 100 caracteres"),
    descricao: z.string().min(1, "A descrição é obrigatória")
        .refine((val) => {
            if (val == null || val.trim() === "") return false;
            const plainText = val.replace(/<[^>]+>/g, '').trim();
            return plainText.length > 0;
        }, { message: "A descrição é obrigatória" }),
    tempo: z.number().min(1, "O tempo deve ser no mínimo 1 hora")
        .transform((val) => FormatarHorasParaSegundos(val)),
    colorHex: z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "O valor deve ser um código hexadecimal de cor válido"),
});

export type PrioridadeFormData = z.infer<typeof prioridadeSchema>;